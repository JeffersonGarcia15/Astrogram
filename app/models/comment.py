from .db import db
from datetime import datetime
from .user import User

class Comment(db.Model):
    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id', ondelete='CASCADE'), nullable=False)
    body = db.Column(db.UnicodeText, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now)
    
    post = db.relationship('Post', back_populates='comments')
    user = db.relationship('User', back_populates='comments')
    commentlikes = db.relationship('CommentLike', backref="comments", cascade='all, delete', passive_deletes=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'body': self.body,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'username': User.query.get(self.user_id).username
        }