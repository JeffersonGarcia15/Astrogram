from flask import Blueprint, request
from app.models import db, Like

like_routes = Blueprint('likes', __name__)


@like_routes.route('/<int:id>')
def likes(id):
    likes = Like.query.filter_by(user_id = id).all()
    return {
        "likes": [like.to_dict() for like in likes]
    }


@like_routes.route('/new', methods=['POST'])
def postLike():
    request_json = request.get_json()
    like = Like(
        user_id=request_json['user_id'],
        post_id=request_json['post_id']
    )
    db.session.add(like)
    db.session.commit()
    return request.get_json()

@like_routes.route('/<int:id>', methods=['DELETE'])
def deleteLike(id):
    delete_like = Like.query.get(id)
    db.session.delete(delete_like)
    db.session.commit()
    return {
        "delete_like": delete_like.to_dict()
    }