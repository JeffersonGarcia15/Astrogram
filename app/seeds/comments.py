from app.models import db, Comment

def seed_comments():
    demo = Comment(
        user_id=2, post_id=1, body='I love this photo ❤️'
    )
    db.session.add(demo)
    db.session.commit()
    
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE')
    db.session.commit()  