from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db, Message
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    user1 = User.query.get(1)
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<string:username>')
def user_info(username):
    user = User.query.filter_by(username=username).first()
    return user.to_dict_user_info()

@user_routes.route('/<int:id>', methods=['PUT'])
def update(id):
    user = User.query.get(id)
    if "image" not in request.files:
        url = request.form['image']
    else:
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

    db.session.commit()
    return user.to_dict()

    
@user_routes.route('/<int:user_id>/messages')
def get_users_messages(user_id):
    messages = Message.query.filter(or_(Message.sender_id == user_id,
            Message.recipient_id == user_id)).all()
    return {message.id: message.to_dict() for message in messages}


@user_routes.route('/<int:user_id>/messages/<int:other_user_id>')
def get_conversation(user_id, other_user_id):
    messages_from_user = Message.query.filter(
        Message.sender_id == user_id,
        Message.recipient_id == other_user_id).all()
    messages_to_user = Message.query.filter(
        Message.sender_id == other_user_id,
        Message.recipient_id == user_id).all()
    messages = messages_to_user + messages_from_user
    return {message.id: message.to_dict() for message in messages}