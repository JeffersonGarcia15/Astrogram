from flask import Blueprint, request
from app.models import db, Comment

comment_routes = Blueprint('comment', __name__)

@comment_routes.route('/')
def allComments():
    comments = Comment.query.all()
    return {
        "comments": [comment.to_dict() for comment in comments]
    }
    
    
@comment_routes.route('/post/<int:id>', methods=['POST'])
def new_comment(id):
    request_json = request.get_json()
    comment = Comment(
        user_id=request_json['user_id'],
        post_id=request_json['post_id'],
        body=request_json['body']
    )
    db.session.add(comment)
    db.session.commit()
    return {
        'comment': comment.to_dict()
    }