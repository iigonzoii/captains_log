from app.models import db, environment, SCHEMA, Course
from sqlalchemy.sql import text


def seed_courses():
    course_one = Course(
        owner_id=1, highlight_img='https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/mtEvansCl.jpg?alt=media&token=74ab010e-36b3-4520-8e33-a698b6017233', name='Denver to Mt. Evans', surface='paved', gas=3, resource_access=3, difficulty=5, curved_roads=5,origin_city="Denver", state="Colorado", country="U.S.A.", poi="Echo lake Lodge for bison burgers and swiss chocolate", log_entry="StartingElevation: 5,280ft... US-6 W got me out of the city and to I-70 W. 70 took me to an old mining town called Idaho Springs off of exit 240; CurrentElevation: 7,526ft... I refulled at the Kum and Go which boasts 'The cleanest bathroom in Clear Creek County' and then crossed the highway using CO-103 S. I've noticed at least a 10 degree drop in temperature since departing denver an hour ago. I start my climb up the mountain and notice small ponds for local fishing, winding roads, and thousands of aspen trees. Its getting cold... My body and my engine performance are both starting to be effected by the elevation. Purple wildflowers are sprouting out of the concrete and mountain side, so I pull over to drink some water and take in the view. These flowers only grow at a certain elevation, I will remember that the mountain views don't steal your breath away until you see purple flowers and start feeling dehydrated. This gravel pull off is about 10 or 15 minutes from idaho springs at 60 to 90mph. It is off the right hand side, covered with gravel, and blocks car entry with a handful of large boulders. I continue up the mountain until I reach Echo Lake, being careful not to take in the views for more than one second at a time unless fully stopped, one wrong move up here and it'll be my last ride. CurrentElevation:10,600 ft... Here starts the 4000 ft climb to the peak of Mount Evans where guard rails are few, potholes are many, mountain goats and rams are everywhere, and the risk is just as apparant as the beauty of my surroundings."
    )
    course_two = Course(
        owner_id=2, highlight_img='https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/hurricanePass.jpg?alt=media&token=e796381e-9532-4fd8-9604-dc296eee5534', name='Denver to Durango', surface='paved', gas=3, resource_access=5, difficulty=4, curved_roads=5, origin_city="Denver", state="Colorado", country="U.S.A.", poi="Silverton for utv rentals where you can visit hurricane pass and the most beautiful lake I've ever seen in my life", log_entry="US-6 W out of the city to I-70 once again. This route takes roughly 6 hours and keeps you on I-70 W almost the whole time. 70 is full of gas stations and ammenities but does range in elevation from roughly 5000 to 11000 ft. The danger on this route comes and goes as you traverse the entire western slope from the front range. You will go over and through several mountain passes. At high speeds and high elevation expect to burn through fuel at an accelerated rate. My reccomendation is assuming your fuel gauge is lying to you and stop for gas frequently. There is no reason to run a dry tank on this route with all the gas stations around, but if you dont stop frequently, you may find yourself on the side of the road wishing you would of filled up at that last gas station you saw."
    )
    course_three= Course(
        owner_id=1, highlight_img='https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/moab.jpg?alt=media&token=56445f00-844d-45c1-bbc7-1a36d66f00e7', name='Denver to MOAB', surface='paved', gas=3, resource_access=3, difficulty=3, curved_roads=3, origin_city="Denver", state="Colorado", country="U.S.A.", poi="slick rock and chicken corners where you can take dirtbikes for tech climbing and a mars like enviroment", log_entry="This route takes roughly 6 hours and is a southern route. The danger on this route comes and goes as you travel SouthWest from the front range. You will go over and through several mountain passes, national forests, and long stretches of farm land. This route is similar to riding 70 west except it has more of a rural feel. There will be a higher chance of nothing to eat, drink, or fuel for the bike. Take advantage of any resource you come across and be prepared for any type of weather between noon and 2p.m. These mountains have a climate of their own."
    )
    course_four = Course(
        owner_id=2, highlight_img='https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/juninperPeak.jpg?alt=media&token=86e5464b-51b1-4df6-b38f-d72ee3036ae3', name='285-S to the river', surface='mixed', gas=4, resource_access=4, difficulty=3, curved_roads=4, origin_city="Denver", state="Colorado", country="", poi="North fork of the South Platte river where you can see boulders the size of cars and string up a hammock", log_entry="Similar to the long haul headed south from denver to MOAB, this route utilizes 285-S out of Denver, SouthWest of Conifer down Shaffers Crossing, SouthEast to Buffalo Creek, South to Deckers, and finally NorthWest through Ferndale up to Denver in a big circle. This is a great local route with a round trip of roughly 3.5 hours. This is a mix of highway, Mountain sides, and very little off road gravel areas if you choose to explore the north fork of the South Platte River. Leave the house with a full tank and fill up once halfway, that should hold you through the entire trip"
    )
    course_five = Course(
        owner_id=3, highlight_img='https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/juninperPeak.jpg?alt=media&token=86e5464b-51b1-4df6-b38f-d72ee3036ae3', name='285-S Demo', surface='mixed', gas=4, resource_access=4, difficulty=3, curved_roads=4, origin_city="Denver", state="Colorado", country="", poi="North fork of the South Platte river where you can see boulders the size of cars and string up a hammock", log_entry="Similar to the long haul headed south from denver to MOAB, this route utilizes 285-S out of Denver, SouthWest of Conifer down Shaffers Crossing, SouthEast to Buffalo Creek, South to Deckers, and finally NorthWest through Ferndale up to Denver in a big circle. This is a great local route with a round trip of roughly 3.5 hours. This is a mix of highway, Mountain sides, and very little off road gravel areas if you choose to explore the north fork of the South Platte River. Leave the house with a full tank and fill up once halfway, that should hold you through the entire trip"
    )
    course_six = Course(
        owner_id=3, highlight_img='https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/moab.jpg?alt=media&token=56445f00-844d-45c1-bbc7-1a36d66f00e7', name='MoabDemo', surface='mixed', gas=4, resource_access=4, difficulty=3, curved_roads=4, origin_city="Denver", state="Colorado", country="", poi="North fork of the South Platte river where you can see boulders the size of cars and string up a hammock", log_entry="Similar to the long haul headed south from denver to MOAB, this route utilizes 285-S out of Denver, SouthWest of Conifer down Shaffers Crossing, SouthEast to Buffalo Creek, South to Deckers, and finally NorthWest through Ferndale up to Denver in a big circle. This is a great local route with a round trip of roughly 3.5 hours. This is a mix of highway, Mountain sides, and very little off road gravel areas if you choose to explore the north fork of the South Platte River. Leave the house with a full tank and fill up once halfway, that should hold you through the entire trip"
    )
    db.session.add(course_one)
    db.session.add(course_two)
    db.session.add(course_three)
    db.session.add(course_four)
    db.session.add(course_five)
    db.session.add(course_six)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_courses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.courses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM courses"))

    db.session.commit()
