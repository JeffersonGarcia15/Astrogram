from app.models import db, CommentLike

def seed_commentlikes():
    demo = CommentLike(
        comment_id='1', user_id='1'
    )
    demo1 = CommentLike(
        comment_id='2', user_id='3'
    )
    demo2 = CommentLike(
        comment_id='3', user_id='1'
    )
    demo3 = CommentLike(
        comment_id='4', user_id='4'
    )
    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    
    db.session.commit()
    
def undo_commentlikes():
    db.session.execute('TRUNCATE commentlikes RESTART IDENTITY CASCADE')
    db.session.commit() 