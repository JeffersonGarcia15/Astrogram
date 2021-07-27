from .db import db

class Location(db.Model):
    __tablename__ = 'locations'
     
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip = db.Column(db.String, nullable=False)
    latitude = db.Column(db.String, nullable=False)
    longitude = db.Column(db.String, nullable=False)
    
    
    posts = db.relationship('Post', back_populates='location', lazy='subquery')
    
    def to_dict(self):
        return {
            'id': self.id,
            'city': self.city,
            'state': self.state,
            'zip': self.zip,
            'latitude': self.latitude,
            'longitude': self.longitude,
        }

