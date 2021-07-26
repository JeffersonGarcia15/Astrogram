from .db import db

class Media(db.Model):
    __tablename__ = 'medias'
    
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id', nullable=False))
    media_url = db.Column(db.String, nullable=False)
    views = db.Column(db.Integer, nullable=True, default=0)
    
    post = db.relationship('Post', back_populates='medias')
    
    
    def to_dict(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "mediaUrl": self.media_url,
            "views": self.views,
        }