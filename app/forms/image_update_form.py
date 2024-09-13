from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length

class ImageUpdateForm(FlaskForm):
    caption = StringField('Caption', validators=[DataRequired(), Length(max=150)])
    file = StringField('File', validators=[DataRequired(), Length(max=250)])
    private = BooleanField('Private', validators=[DataRequired()])
