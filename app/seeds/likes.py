from app.models import db, Like


def seed_likes():
    num1 = Like(user_id=1, post_id=1)
    num2 = Like(user_id=2, post_id=2)
    num3 = Like(user_id=2, post_id=3)
    num4 = Like(user_id=3, post_id=4)
    num5 = Like(user_id=2, post_id=5)
    
    db.session.add(num1)
    db.session.add(num2)
    db.session.add(num3)
    db.session.add(num4)
    db.session.add(num5)
    db.session.commit()
    
def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()