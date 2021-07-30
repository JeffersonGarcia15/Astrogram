from app.models import db, User

def seed_follows():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    user5 = User.query.get(5)
    user6 = User.query.get(6)
    user7 = User.query.get(7)

    user1.followers.append(user2)
    user1.followers.append(user3)
    user1.followers.append(user4)
    user1.followers.append(user5)
    user1.followers.append(user6)
    user2.followers.append(user3)
    user2.followers.append(user4)
    user2.followers.append(user5)
    user3.followers.append(user4)
    user3.followers.append(user7)
    
    db.session.commit()
    
def undo_follows():
        db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE')
        db.session.commit()
