from app.models import db, User
from werkzeug.security import generate_password_hash


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Jeff', full_name='Adilson', email='jeff@aa.io', hashed_password=generate_password_hash('password'))
    demo1 = User(
        username='Amber', full_name='Amber Bancroft', email='amber@aa.io', hashed_password=generate_password_hash('password'))
    demo2 = User(
        username='Jonas', full_name='Jonas Garcia', email='jonas@aa.io', hashed_password=generate_password_hash('password'))
    demo3 = User(
        username='Jefferson', full_name='Jefferson Lopez', email='jefferson@aa.io', hashed_password=generate_password_hash('password'))
    demo4 = User(
        username='Kevo', full_name='Kevin Garcya', email='q3b0m@aa.io', hashed_password=generate_password_hash('password'))
    demo5 = User(
        username='Wiron', full_name='Wiron Reyes', email='eiron@aa.io', hashed_password=generate_password_hash('password'))
    demo6 = User(
        username='Wilberth', full_name='Wilberth La anda verde', email='alex@aa.io', hashed_password=generate_password_hash('password'))
    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)   
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
