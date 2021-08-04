from flask import Blueprint, request
from app.models import (
    db, Post, Media, Location
)
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)
auth_routes = Blueprint('auth', __name__)

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
    
@post_routes.route('/<int:id>')
def post(id):
    post = Post.query.get(id)
    if post is None:
        return "Bad Data"
    return post.to_dict()

@post_routes.route('/new', methods=['POST'])
def create_post():
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
    
    user_id = request.form['user_id']
    description = request.form['description']

    
    post = Post(
        user_id = user_id,
        description = description,
        picture_url = url,
    )
    db.session.add(post)
    db.session.commit()
    
    return post.to_dict()
    
    
    
@post_routes.route('/<int:id>', methods=['PUT'])
def updatePost(id):
    post = Post.query.get(id)
    description = request.json['description']
    post.description = description
    db.session.add(post)
    db.session.commit()
    return post.to_dict()
    
@post_routes.route('/<int:id>', methods=['DELETE'])
def deletePost(id):
    # post = Post.query.get(id)
    post = Post.query.filter_by(id = id).delete()
    print('#####################################', post)
    # db.session.delete(post)
    db.session.commit() 
    return {"Message": "Success" } 