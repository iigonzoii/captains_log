from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Optional, Length

class CourseForm(FlaskForm):
    owner_id = IntegerField('Owner ID', validators=[DataRequired()])
    highlight_img = StringField('Highlight Image URL', validators=[Length(max=250), Optional()])
    name = StringField('Name Your Course', validators=[DataRequired(), Length(max=50)])
    surface = StringField('Surface', validators=[ Length(max=50)])
    gas = IntegerField('Fuel availability', validators=[Optional()])
    resource_access = IntegerField('Access to resources', validators=[Optional()])
    difficulty = IntegerField('Difficulty', validators=[Optional()])
    curved_roads = IntegerField('Road Curves', validators=[Optional()])
    origin_city = StringField('Origin City', validators=[DataRequired()])
    state = StringField('Origin State', validators=[DataRequired()])
    country = StringField('Origin Country', validators=[DataRequired()])
    log_entry = StringField('Log Entry', validators=[Optional()])
