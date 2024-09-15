from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class ImagePostForm(FlaskForm):
    caption = StringField('Caption', validators=[DataRequired(), Length(max=150)])
    file = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    private = BooleanField('Private')
# , validators=[DataRequired()]
