from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class ReviewPostForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired(), Length(max=100)])
