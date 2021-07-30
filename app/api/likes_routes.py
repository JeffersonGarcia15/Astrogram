from flask import Blueprint, request
from app.models import db, Like

like_routes = Blueprint('likes', __name__)


@like_routes.route('/<int:id>')
def likes(id):
    likes = Like.query.filter_by(user_id = id).all()
    return {
        "likes": [like.to_dict() for like in likes]
    }

