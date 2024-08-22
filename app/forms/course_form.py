from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, RadioField
from wtforms.validators import DataRequired, Optional, Length

class CourseForm(FlaskForm):
    owner_id = IntegerField('Owner ID', validators=[DataRequired()])
    highlight_img = StringField('Highlight Image URL', validators=[Length(max=250), Optional()])
    img_1 = StringField('Image 1', validators=[Length(max=250), Optional()])
    img_2 = StringField('Image 2', validators=[Length(max=250), Optional()])
    img_3 = StringField('Image 3', validators=[Length(max=250), Optional()])
    img_4 = StringField('Image 4', validators=[Length(max=250), Optional()])
    name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    surface = StringField('Surface', validators=[DataRequired(), Length(max=50)])

    gas = RadioField('Fuel availability', validators=[DataRequired()], choices=[('gas', 1), ('gas', 2), ('gas', 3), ('gas', 4), ('gas', 5)])
    # resource_access = RadioField('Access to resources', validators=[Optional()], choices=[])
    # difficulty = RadioField('Difficulty', validators=[Optional()], choices=[])
    # curved_roads = RadioField('Road Curves', validators=[Optional()], choices=[])
    resource_access = IntegerField('Access to resources', validators=[Optional()])
    difficulty = IntegerField('Difficulty', validators=[Optional()])
    curved_roads = IntegerField('Road Curves', validators=[Optional()])

    origin_city = StringField('Origin City', validators=[DataRequired()])
    state = StringField('Origin State', validators=[DataRequired()])
    country = StringField('Origin Country', validators=[DataRequired()])
    log_entry = StringField('Log Entry', validators=[Optional()])
