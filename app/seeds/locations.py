from app.models import db, Location

def seed_locations():
    demo = Location(
        city='Boston', state='Massachusetts', zip='02108', latitude='42.361145', longitude='71.057083'
    )
    demo1 = Location(
        city='Los Angeles', state='California', zip='90012', latitude='34.052200', longitude='118.243700'
    )
    demo2 = Location(
        city='Houston', state='Texas', zip='77002', latitude='29.760400', longitude='95.369800'
    )
    demo3 = Location(
        city='New York City', state='New York', zip='10007', latitude='40.7128', longitude='74.0060'
    )
    demo4 = Location(
        city='East Boston', state='Massachusetts', zip='02128', latitude='42.370200', longitude='71.038900'
    )
    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()
    
def undo_locations():
    db.session.execute('TRUNCATE locations RESTART IDENTITY CASCADE')
    db.session.commit()    