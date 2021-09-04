from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from flask_login import UserMixin

follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id")),
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    website = db.Column(db.Text, nullable=True, default="https://www.instagram.com/")
    bio = db.Column(db.Text, nullable=True)
    phone = db.Column(db.String, nullable=True)
    gender = db.Column(db.String(100), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(256), default="https://astrogram.s3.us-east-2.amazonaws.com/avatar.png")
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    posts = db.relationship('Post', back_populates='user', lazy='subquery')
    albums = db.relationship('Album', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    likes = db.relationship('Like', back_populates='user')
    # followers = db.relationship('User', secondary=follows, primaryjoin=(follows.c.follower_id == id), secondaryjoin=(follows.c.followed_id == id), backref=db.backref('follows', lazy="dynamic"), lazy="dynamic" )
    # following = db.relationship('User', secondary=follows, primaryjoin=(follows.c.followed_id == id), secondaryjoin=(follows.c.follower_id == id), backref=db.backref('follows', lazy="dynamic"), lazy="dynamic" )
    followers = db.relationship("User", secondary=follows, primaryjoin=id==follows.c.followed_id, secondaryjoin=id==follows.c.follower_id, back_populates="following")
    following = db.relationship("User", secondary=follows, primaryjoin=id==follows.c.follower_id, secondaryjoin=id==follows.c.followed_id, back_populates="followers")
    sent_messages = db.relationship('Message',
                                    foreign_keys="Message.sender_id",
                                    back_populates="sender")
    received_messages = db.relationship('Message',
                                        foreign_keys="Message.recipient_id",
                                        back_populates="recipient")
    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def follower_names(self):
        return self.username

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'full_name': self.full_name,
            'email': self.email,
            'website': self.website,
            'bio': self.bio,
            'phone': self.phone,
            'gender': self.gender,
            'profile_image': self.profile_image,
            "sent_messages": {
                message.id: message.to_simple_dict()
                for message in self.sent_messages
            },
            "received_messages": {
                message.id: message.to_simple_dict()
                for message in self.received_messages
            },
            'followers': [follower.follower_names() for follower in self.followers],
            'following': [following.follower_names() for following in self.following],
            
            # 'posts': {post.id: post.to_dict() for post in self.posts}
        }
        
        
    def to_dict_user_info(self):
        return {
            'id': self.id,
            'username': self.username,
            'full_name': self.full_name,
            'email': self.email,
            'website': self.website,
            'bio': self.bio,
            'phone': self.phone,
            'gender': self.gender,
            'profile_image': self.profile_image,    
            'posts': {post.id: post.to_dict() for post in self.posts},
            'followers': [follower.follower_names() for follower in self.followers],
            'following': [following.follower_names() for following in self.following],
        
        }
