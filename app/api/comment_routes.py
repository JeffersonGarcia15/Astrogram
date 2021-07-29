from flask import Blueprint, request
from app.models import db, Comment

comment_routes = Blueprint('comment', __name__)

@comment_routes.route('/')
def allComments():
    comments = Comment.query.all()
    return {
        "comments": [comment.to_dict() for comment in comments]
    }