from .db import db
from .media import Media

class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'), nullable=True)
    description = db.Column(db.String, nullable=True)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=True)
    picture_url = db.Column(db.String, nullable=False)
    
    user = db.relationship('User', back_populates='posts')
    location = db.relationship('Location', back_populates='posts')
    album = db.relationship('Album', back_populates='posts')
    # medias = db.relationship('Media', back_populates='post')
    
    # def get_views(self):
    #     views = 0
    #     for image in self.medias:
    #         views += image.views
    #     return views
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'location_id': self.location_id,
            'description': self.description,
            'album_id': self.album_id,
            'picture_url': self.picture_url,
            'location': self.location.to_dict(),
            'user': self.user.to_dict()
        }
            # 'medias': [media.to_dict() for media in self.medias],
            # 'views': self.get_views()