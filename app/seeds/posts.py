from app.models import db, Post

def seed_posts():
    demo = Post(
        user_id=1, location_id=1, description='A beautiful picture', album_id=1
    )
    demo2 = Post(
        user_id=1, location_id=2, description='A nice picture', album_id=1
    )
    demo3 = Post(
        user_id=1, location_id=3, description='Something goes here', album_id=1
    )
    demo4 = Post(
        user_id=1, location_id=4, description='Astrophysics'
    )
    demo5 = Post(
        user_id=2, location_id=5, description='A nice picture here', album_id=2
    )
    demo6 = Post(
        user_id=2, location_id=1, description='Nice picture'
    )
    # demo7 = Post(
    #     user_id=2, location_id=2, description='Physics?'
    # )
    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    # db.session.add(demo7)
    db.session.commit()
    
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE')
    db.session.commit()  