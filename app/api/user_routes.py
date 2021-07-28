from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=['PUT'])
def update():
    user = User.query.get(id)
    if "image" not in request.files:
        return {'errors': ['image required']}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": ["file type not permitted"]}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return {'errors': [upload]}, 400

    url = upload["url"]
    
    user.username = request.form['username']
    user.full_name = request.form['full_name']
    user.website = request.form['website']
    user.bio = request.form['bio']
    user.phone = request.form['phone']
    user.gender = request.form['gender']
    user.profile_image = url
    # user = User(
    #     user_id = id,
    #     username=username,
    #     full_name=full_name,
    #     website=website,
    #     bio=bio,
    #     phone=phone,
    #     gender=gender,
    #     profile_image=url
    # )
    # db.session.add(user)
    db.session.commit()
    return "Success"
    
