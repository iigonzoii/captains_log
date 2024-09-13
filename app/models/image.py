from .db import db, SCHEMA, environment, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    course_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('courses.id')), nullable=False)
    file = db.Column(db.String(250), nullable=False)
    caption = db.Column(db.String(250), nullable=False)
    private = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    #* relationship to user
    img_owner = db.relationship('User', back_populates='images')
    #* relationship to course
    course = db.relationship('Course', back_populates='images')


    def to_dict(self):
            return {
                'id': self.id,
                'user_id': self.user_id,
                'course_id': self.course_id,
                'file': self.file,
                'caption': self.caption,
                'private': self.private,
                'created_at': self.created_at,
                'updated_at': self.updated_at
            }
