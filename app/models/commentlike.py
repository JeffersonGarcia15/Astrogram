from .db import db

class CommentLike(db.Model):
    __tablename__ = 'commentlikes'
    
    id = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id', ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    comment = db.relationship('Comment', back_populates='commentlikes')
    
    def to_dict(self):
        return {
            'id': self.id,
            'comment_id': self.comment_id,
            'user_id': self.user_id
        }

