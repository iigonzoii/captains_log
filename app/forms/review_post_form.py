from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class ReviewPostForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired(), Length(max=100)])
