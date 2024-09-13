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

    demo_image_5 = Image(
        user_id=1, course_id=1,
        caption="Flyyying Nimbuuuss",
        private=False,file="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/nimbus.jpg?alt=media&token=f15b6a24-fa1f-4977-8bf6-3d5f44983b66")

    demo_image_6 = Image(
        user_id=1, course_id=1,
        caption="Top of The World",
        private=False,file="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/mtEvansSkull.jpg?alt=media&token=52e4ca8e-a889-4761-ad50-62ac809dd8b5")

    demo_image_7 = Image(
        user_id=1, course_id=1,
        caption="14000 ft in elevation",
        private=False,file="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/mtEvansThree.jpg?alt=media&token=0487f11f-c855-4e90-95cc-c2be94116e99")

    demo_image_8 = Image(
        user_id=1, course_id=1,
        caption="Juniper pass omw up to the entrance of Mount Evans",
        private=False,file="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/juniperTwo.jpg?alt=media&token=94b460ea-ddf8-4fea-8260-ae5a23c28a72")

    demo_image_9 = Image(
        user_id=2, course_id=2,
        caption="Friends in High Places",
        private=False,file="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/dannyHurricane.jpg?alt=media&token=7a312fee-0839-42e8-a53d-74bc0a206f92")

    demo_image_10 = Image(
        user_id=2, course_id=2,
        caption="Whats going on with this beard?",
        private=False,file="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/jaffarSilverton.jpg?alt=media&token=bd2e32e4-9d92-497b-93b8-994e73c3425e")

    demo_image_11 = Image(
        user_id=2, course_id=2,
        caption="Silverton between Durango and Ouray",
        private=False,file="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/mountainVillage.jpg?alt=media&token=1e3c330e-1edc-4b0e-ac53-6e5416267cda")

    demo_image_12 = Image(
        user_id=2, course_id=2,
        caption="UTV rentals in Silverton are a MUST!",
        private=False,file="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/utv.jpg?alt=media&token=32519360-ae5d-4d86-a65e-1c4e2f7ca307")

    demo_image_13 = Image(
        user_id=1, course_id=3,
        caption="KTM rentals and Sunshine",
        private=False,file="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/moabBillBoard.jpg?alt=media&token=1744c9a3-7057-4438-99c4-6480909d5d11")

    demo_image_14 = Image(
        user_id=1, course_id=3,
        caption="Two Guys Four Bikes.. Perfect ratio",
        private=False,file="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/moabBikes.jpg?alt=media&token=1ef42980-310e-4de8-b1e3-66333acc3d69")

    demo_image_15 = Image(
        user_id=1, course_id=3,
        caption="Departing from outside of Breckenridge",
        private=False,file="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/moabBikesTwo.jpg?alt=media&token=823368ca-ad3d-4665-9e6d-75167d4ef395")

    demo_image_16 = Image(
        user_id=1, course_id=3,
        caption="70 West never dissapoints",
        private=False,file="https://firebasestorage.googleapis.com/v0/b/captains-log-13590.appspot.com/o/70West.jpg?alt=media&token=72fef901-1ee7-483d-8bf5-3da3c577e980")

    demo_image_17 = Image(
        user_id=2, course_id=4,
        caption="70 West never dissapoints",
        private=False,file="https://placehold.co/250x250")

    demo_image_18 = Image(
        user_id=2, course_id=4,
        caption="70 West never dissapoints",
        private=False,file="https://placehold.co/250x250")

    demo_image_19 = Image(
        user_id=2, course_id=4,
        caption="70 West never dissapoints",
        private=False,file="https://placehold.co/250x250")

    demo_image_20 = Image(
        user_id=2, course_id=4,
        caption="70 West never dissapoints",
        private=False,file="https://placehold.co/250x250")

    demo_image_21 = Image(
        user_id=3, course_id=6,
        caption="70 West never dissapoints",
        private=False,file="https://placehold.co/250x250")

    demo_image_22 = Image(
        user_id=3, course_id=6,
        caption="70 West never dissapoints",
        private=False,file="https://placehold.co/250x250")

    demo_image_23 = Image(
        user_id=3, course_id=6,
        caption="70 West never dissapoints",
        private=False,file="https://placehold.co/250x250")

    demo_image_24 = Image(
        user_id=3, course_id=6,
        caption="70 West never dissapoints",
        private=False,file="https://placehold.co/250x250")



    db.session.add(demo_image_1)
    db.session.add(demo_image_2)
    db.session.add(demo_image_3)
    db.session.add(demo_image_4)
    db.session.add(demo_image_5)
    db.session.add(demo_image_6)
    db.session.add(demo_image_7)
    db.session.add(demo_image_8)
    db.session.add(demo_image_9)
    db.session.add(demo_image_10)
    db.session.add(demo_image_11)
    db.session.add(demo_image_12)
    db.session.add(demo_image_13)
    db.session.add(demo_image_14)
    db.session.add(demo_image_15)
    db.session.add(demo_image_16)
    db.session.add(demo_image_17)
    db.session.add(demo_image_18)
    db.session.add(demo_image_19)
    db.session.add(demo_image_20)
    db.session.add(demo_image_21)
    db.session.add(demo_image_22)
    db.session.add(demo_image_23)
    db.session.add(demo_image_24)

    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
