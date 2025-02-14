import os
from flask import Blueprint, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
from app.forms import AccountSettingsForm

account_settings_bp = Blueprint('account_settings', __name__)

# Mock user data (replace with database integration)
user = {
    "username": "musiclover",
    "email": "user@example.com",
    "bio": "I love sharing my playlists!",
    "music_preferences": "Pop, Rock, Classical"
}

UPLOAD_FOLDER = 'app/static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

@account_settings_bp.route('/account_settings', methods=['GET', 'POST'])
def account_settings():
    form = AccountSettingsForm()

    if form.validate_on_submit():
        # Update user info
        user['username'] = form.username.data
        user['email'] = form.email.data
        user['bio'] = form.bio.data
        user['music_preferences'] = form.music_preferences.data

        # Handle profile picture
        if form.profile_picture.data:
            file = form.profile_picture.data
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            flash('Profile picture updated!', 'success')

        # Handle password change
        if form.password.data:
            flash('Password updated!', 'success')

        flash('Account settings updated successfully.', 'success')
        return redirect(url_for('settings.account_settings'))

    # Pre-fill form with user data
    form.username.data = user['username']
    form.email.data = user['email']
    form.bio.data = user['bio']
    form.music_preferences.data = user['music_preferences']

    return render_template('account_settings.html', form=form)
