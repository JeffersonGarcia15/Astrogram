from flask import Blueprint, request
from app.models import (
    db, Post, Media
)

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def allPosts():
    posts = Post.query.all()
    return {
        "posts": [post.to_dict() for post in posts]
    }


@post_routes.route('/user/<int:id>')
def userPosts(id):
    user_id = id
    posts = Post.query.filter(Post.user_id == user_id).all()
    
    return {
        "posts": [post.to_dict() for post in posts]
    }
    
