import os
from flask import Blueprint, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
from app.forms import AccountSettingsForm
from flask_login import login_required, current_user

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
        if form.validate_on_submit():
        # Check if username or email already exists (except for the current user)
        existing_user = User.query.filter(User.username == form.username.data, User.id != current_user.id).first()
        existing_email = User.query.filter(User.email == form.email.data, User.id != current_user.id).first()

        if existing_user:
            flash('That username is already taken. Please choose another.', 'danger')
            return redirect(url_for('settings.account_settings'))

        if existing_email:
            flash('That email is already in use. Please login or use a different email.', 'danger')
            return redirect(url_for('settings.account_settings'))

        # Update user details
        current_user.username = form.username.data
        current_user.email = form.email.data
        current_user.bio = form.bio.data
        current_user.music_preferences = form.music_preferences.data

        # Handle password update
        if form.password.data:
            current_user.password_hash = generate_password_hash(form.password.data)
            flash('Password updated successfully.', 'success')

        # Save changes to the database
        db.session.commit()
        flash('Account settings updated successfully!', 'success')

        return redirect(url_for('settings.account_settings'))

    # Pre-fill form with current user data
    form.username.data = current_user.username
    form.email.data = current_user.email
    form.bio.data = current_user.bio
    form.music_preferences.data = current_user.music_preferences

    return render_template('account_settings.html', form=form)
