from flask import Blueprint, request
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required
from app.models import Course, User, db
# from app.forms import AlbumForm, UpdateAlbumForm, ReviewPostForm, TrackPostForm, ProductForm

course_routes = Blueprint('courses', __name__)

#* Get all courses
@course_routes.route('/', methods=['GET'])
def all_courses():
    courses = Course.query.all()
    print("SKEEEE",courses)
    if not courses:
        return {'errors': {'message': 'No existing courses'}}, 404

    courses_dict = [ course.to_dict() for course in courses ]
    print("YEET",courses_dict)
    return {"courses":courses_dict}, 200

#* Get course by id
@course_routes.route('/<int:course_id>', methods=['GET'])
def course_by_id(course_id):
    course_details = db.session.query(Course).filter(Course.id == course_id).first()
    if not course_details:
        return {'errors': {'message': 'Course not found'}}, 404
    return {course_details.to_dict()}, 200

#* Get all courses by User
@course_routes.route('/current', methods=['GET'])
def courses_by_user():
    user_id = current_user.id
    courses = Course.query.filter_by(owner_id=user_id).all()
    if not courses:
        return {'errors': {'message': 'No courses found for this user'}}, 404
    return {"courses":[course.to_dict() for course in courses]}, 200


# @album_routes.route('/', methods=['GET', 'POST'])
# @login_required
# def create_album():
#     form = AlbumForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         new_album = Album(
#             user_id=current_user.id,
#             band=form.band.data,
#             title=form.title.data,
#             cover_image_url=form.cover_image_url.data,
#             description=form.description.data,
#             producer=form.producer.data,
#             genre=form.genre.data,
#             tags=form.tags.data,
#         )

#         db.session.add(new_album)
#         db.session.commit()

#         return new_album.to_dict(), 201

#     return {'errors': form.errors}, 400
