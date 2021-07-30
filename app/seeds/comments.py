from app.models import db, Comment

def seed_comments():
    demo = Comment(
        user_id=2, post_id=1, body='I love this photo ❤️'
    )
    demo1 = Comment(
        user_id=3, post_id=1, body='Nice photo'
    )
    demo2 = Comment(
        user_id=4, post_id=2, body='Cool picture'
    )
    demo3 = Comment(
        user_id=2, post_id=2, body='10/10'
    )
    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    
    db.session.commit()
    
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE')
    db.session.commit()  