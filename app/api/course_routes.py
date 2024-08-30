from flask import Blueprint, request
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required
from app.models import Course, User, Review, db
from app.forms import CourseForm, UpdateCourseForm, ReviewPostForm

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
@course_routes.route('/<int:course_id>/', methods=['GET'])
def course_by_id(course_id):
    course_details = db.session.query(Course).options(
        joinedload(Course.reviews).joinedload(Review.reviewer)
    ).filter(Course.id == course_id).first()
    if not course_details:
        return {'errors': {'message': 'Course not found'}}, 404
    return course_details.to_dict(), 200

#* Get all courses by User
@course_routes.route('/current', methods=['GET'])
def courses_by_user():
    user_id = current_user.id
    courses = Course.query.filter_by(owner_id=user_id).all()
    if not courses:
        return {'errors': {'message': 'No courses found for this user'}}, 404
    return {"courses":[course.to_dict() for course in courses]}, 200


#* Create a new course
@course_routes.route('/', methods=['GET', 'POST'])
@login_required
def create_course():
    form = CourseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_course = Course(
            owner_id=current_user.id,
            highlight_img=form.highlight_img.data,
            img_1=form.img_1.data,
            img_2=form.img_2.data,
            img_3=form.img_3.data,
            img_4=form.img_4.data,
            name=form.name.data,
            surface=form.surface.data,
            gas=form.gas.data,
            resource_access=form.resource_access.data,
            difficulty=form.difficulty.data,
            curved_roads=form.curved_roads.data,
            origin_city=form.origin_city.data,
            state=form.state.data,
            country=form.country.data,
            log_entry=form.log_entry.data,
        )

        db.session.add(new_course)
        db.session.commit()

        return new_course.to_dict(), 201

    return {'errors': form.errors}, 400

#* Update course by id
@course_routes.route('/<int:course_id>/', methods=['PUT'])
@login_required
def update_course(course_id):
    course_update = Course.query.filter(Course.id == course_id).first()

    if not course_update:
        return {'errors': {'message': 'Course not found'}}, 404
    if course_update.owner_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    form = UpdateCourseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
            course_update.highlight_img=form.highlight_img.data
            course_update.img_1=form.img_1.data
            course_update.img_2=form.img_2.data
            course_update.img_3=form.img_3.data
            course_update.img_4=form.img_4.data
            course_update.name=form.name.data
            course_update.surface=form.surface.data
            course_update.gas=form.gas.data
            course_update.resource_access=form.resource_access.data
            course_update.difficulty=form.difficulty.data
            course_update.curved_roads=form.curved_roads.data
            course_update.origin_city=form.origin_city.data
            course_update.state=form.state.data
            course_update.country=form.country.data
            course_update.log_entry=form.log_entry.data
            db.session.commit()
            return course_update.to_dict()
    return form.errors, 401

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


#*-------Review route--------
#* Get all reviews by course id
@course_routes.route('/<int:course_id>/reviews')
def course_reviews(course_id):
    """
    Get all reviews for an course
    """
    reviews = Review.query.filter_by(course_id=course_id).all()
    if not reviews:
        return {'errors': {'message': 'No existing reviews'}}, 404
    return {'reviews': [review.to_dict() for review in reviews]}

#*------ Review route---------
#* Create a review by course id
@course_routes.route('/<int:course_id>/reviews', methods=['POST'])
# @login_required
def new_review(course_id):
    """
    Creates a review for a course
    """
    course = Course.query.get(course_id)
    if not course:
        return {'errors': {'message': 'Course not found'}}, 400
    existing_review = Review.query.filter_by(user_id=current_user.id, course_id=course_id).first()
    if existing_review:
        return {'errors': {'message': 'This user has an existing review for the course'}}, 400

    form = ReviewPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        theReview = Review(
            user_id=current_user.id,
            course_id=course_id,
            review=form.data['review']
        )
        db.session.add(theReview)
        db.session.commit()
        return theReview.to_dict(), 201
    return form.errors, 401
