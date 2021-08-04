from flask import Blueprint, request, jsonify

from app.models import CommentLike, db 

commentlikes_routes = Blueprint('commentlikes', __name__)

@commentlikes_routes.route('/<int:id>')
def commentlike(id):
    commentLikes = CommentLike.query.filter_by(user_id = id).all()
    return {
        "commentLikes": [commenLike.to_dict() for commenLike in commentLikes]
    }
    
@commentlikes_routes.route('/')
def get_comment_likes():
    comment_likes = CommentLike.query.all()
    return {"commentLikes": [comment_like.to_dict() for comment_like in comment_likes]}
    
@commentlikes_routes.route('/new', methods=['POST'])
def postCommentLike():
    request_json = request.get_json()
    commentLike = CommentLike(
        user_id=request_json['user_id'],
        comment_id=request_json['comment_id']
    )
    db.session.add(commentLike)
    db.session.commit()
    return commentLike.to_dict()

@commentlikes_routes.route('/<int:id>', methods=['DELETE'])
def deleteCommentLike(id):
    # delete_commentLike = CommentLike.query.get(id)
    delete_commentLike = CommentLike.query.filter_by(id = id).delete()
    # db.session.delete(delete_commentLike)
    db.session.commit()
    return {
        "Message": "Success"
    }