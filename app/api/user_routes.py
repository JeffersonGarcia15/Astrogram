from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    user1 = User.query.get(1)
    print('##############################################',user1.username)
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<string:username>')
def user_info(username):
    user = User.query.filter_by(username=username).first()
    print("&&&&&&&&&&&&&&&&&&&&&&", user)
    return user.to_dict_user_info()

@user_routes.route('/<int:id>', methods=['PUT'])
def update(id):
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
    print('################## BEFORE THE CHANGE', user.username, user.full_name, user.website, user.bio, user.phone, user.gender, user.profile_image)
    user.username = request.form['username']
    user.full_name = request.form['full_name']
    user.website = request.form['website']
    user.bio = request.form['bio']
    user.phone = request.form['phone']
    user.gender = request.form['gender']
    user.profile_image = url
    print('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> AFTER THE CHANGE', user.username, user.full_name, user.website, user.bio, user.phone, user.gender, user.profile_image)
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
    # return {"Success": 'success'}
    return user.to_dict()

    
