from app.models import db, Media

def seed_media():
    demo = Media(
        post_id=1, media_url='https://astrogram.s3.us-east-2.amazonaws.com/atom.jpg', views=5
    )
    demo1 = Media(
        post_id=2, media_url='https://astrogram.s3.us-east-2.amazonaws.com/board.jpg', views=15
    )
    demo2 = Media(
        post_id=3, media_url='https://astrogram.s3.us-east-2.amazonaws.com/equation.jpg', views=4
    )
    demo3 = Media(
        post_id=4, media_url='https://astrogram.s3.us-east-2.amazonaws.com/physics-640x416.jpg', views=10
    )
    demo4 = Media(
        post_id=5, media_url='https://astrogram.s3.us-east-2.amazonaws.com/physics.png', views=3
    )
    demo5 = Media(
        post_id=6, media_url='https://astrogram.s3.us-east-2.amazonaws.com/roles.jpg', views=23
    )
    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5) 
    db.session.commit()
    
def undo_media():
    db.session.execute('TRUNCATE medias RESTART IDENTITY CASCADE')
    db.session.commit()