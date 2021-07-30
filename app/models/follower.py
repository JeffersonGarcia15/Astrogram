from .db import db

# class Follower(db.Model):
#     __tablename__ = 'followers'
    
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # user = db.relationship('User', back_populates='user')
    # follower = db.relationship('User', back_populates='follower')
# follower_table = db.Table(
#     "followers",
#     db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
#     db.Column("follower_id", db.Integer, db.ForeignKey("users.id"), primary_key=True)
# )