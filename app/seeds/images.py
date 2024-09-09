from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    demo_image_1 = Image(
        user_id=3, course_id=5,
        caption="caption 1",
        private=False,file="https://placedog.net/250/250")

    demo_image_2 = Image(
        user_id=3, course_id=5,
        caption="caption 2",
        private=False,file="https://placedog.net/250/250")

    demo_image_3 = Image(
        user_id=3, course_id=5,
        caption="caption 3 this one is private",
        private=True,file="https://placedog.net/250/250")

    demo_image_4 = Image(
        user_id=3, course_id=5,
        caption="caption 4 this one is private",
        private=True,file="https://placedog.net/250/250")


    db.session.add(demo_image_1)
    db.session.add(demo_image_2)
    db.session.add(demo_image_3)
    db.session.add(demo_image_4)


    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
