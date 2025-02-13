import sys
sys.dont_write_bytecode = True
#Need to do the following installs:
# pip install flask-wtf
# pip install email_validator
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, FileField, SubmitField
from wtforms.validators import DataRequired, Email, Optional, Length, EqualTo

class AccountSettingsForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=3, max=20)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('New Password', validators=[
        Optional(),
        Length(min=6),
        EqualTo('confirm_password', message='Passwords must match')
    ])
    confirm_password = PasswordField('Confirm Password')
    bio = TextAreaField('Bio', validators=[Optional(), Length(max=500)])
    music_preferences = StringField('Favorite Genres', validators=[Optional(), Length(max=100)])
    #profile_picture = FileField('Profile Picture', validators=[FileAllowed(['jpg', 'jpeg', 'png'], 'Images only!')])
    submit = SubmitField('Save Changes')
