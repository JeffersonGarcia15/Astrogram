from .db import db
from .media import Media

class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'), nullable=True)
    description = db.Column(db.String, nullable=True)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=True)
    
    user = db.relationship('User', back_populates='posts')
    location = db.relationship('Location', back_populates='posts')
    album = db.relationship('Album', back_populates='posts')
    media = db.relationship('Media', back_populates='post')
    
    # def get_views(self):
    #     views = 0
    #     for image in self.images
    