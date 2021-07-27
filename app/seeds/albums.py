from app.models import db, Album

def seed_albums():
    demo = Album(
        user_id=1, title='My first album'
    )
    demo1 = Album(
        user_id=2, title='Testing'
    )
    db.session.add(demo)
    db.session.add(demo1)
    db.session.commit()
    
def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE')
    db.session.commit()    