from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Image
from app.forms import ImageUpdateForm


image_routes = Blueprint('images', __name__)

#! dont think i need this
#* Get all reviews by current user
@image_routes.route('/current')
@login_required
def user_images():
    """
    Get all current user's images
    """
    images = Image.query.filter_by(user_id=current_user.id).all()
    if not images:
        return {'errors': {'message': 'No existing images'}}, 404
    return {'images': [image.to_dict() for image in images]}, 200


#* Update image
@image_routes.route('/<int:image_id>', methods=['PUT'])
@login_required
def update_image(image_id):
    """
    Updates a user's image for a course
    """
    theImage = Image.query.get(image_id)
    if not theImage:
        return {'errors': {'message': 'Image not found'}}, 404
    if theImage.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401


    form = ImageUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        theImage.caption=form.caption.data
        theImage.file=form.file.data
        theImage.private=form.private.data
        db.session.add(theImage)
        db.session.commit()
        return theImage.to_dict()
    return form.errors, 401


#* Delete Image
@image_routes.route('/<int:image_id>', methods=['DELETE'])
@login_required
def delete_image(image_id):
    """
    Deletes a image by id
    """
    theImage = Image.query.filter_by(id=image_id, user_id=current_user.id).first()
    if not theImage:
        return {'errors': {'message': 'Image not found or not authorized'}}, 404

    db.session.delete(theImage)
    db.session.commit()
    return {'message': "Image successfully deleted"}, 200
