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
    if not courses:
        return {'errors': {'message': 'No existing courses'}}, 404

    courses_dict = [ course.to_dict() for course in courses ]
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


#* Create a new course
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

#* Update course by id
# @album_routes.route('/<int:album_id>/', methods=['PUT'])
# @login_required
# def update_album(album_id):
#     album_update = Album.query.filter(Album.id == album_id).first()

#     if not album_update:
#         return {'errors': {'message': 'Album not found'}}, 404
#     if album_update.user_id != current_user.id:
#         return {'errors': {'message': 'Unauthorized'}}, 401

#     form = UpdateAlbumForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         album_update.band = form.band.data
#         album_update.title = form.title.data
#         album_update.cover_image_url = form.cover_image_url.data
#         album_update.description = form.description.data
#         album_update.producer = form.producer.data
#         album_update.genre = form.genre.data
#         album_update.tags = form.tags.data

#         db.session.commit()
#         return album_update.to_dict()
#     return form.errors, 401



#* Delete course by id
@course_routes.route('/<int:course_id>', methods=['DELETE'])
@login_required
def delete_course(course_id):
    course = Course.query.get(course_id)
    if not course or course.owner_id != current_user.id:
        return {'errors': 'Course not found or unauthorized'}, 404

    db.session.delete(course)
    db.session.commit()

    return {'message': 'Course deleted successfully'}, 200
