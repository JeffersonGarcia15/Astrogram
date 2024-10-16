from flask import Blueprint, jsonify, session, request, Flask, redirect, url_for
import os
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
# from flask_dance.contrib.google import make_google_blueprint, google
from flask_login import current_user, login_user, logout_user, login_required
from app.awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)


auth_routes = Blueprint('auth', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# @auth_routes.route('/login/google')
# def loginGoogle():
#     if not google.authorized:
#         return redirect(url_for('google.login'))
#     response = google.get('/plus/v1/people/me')
#     assert response.ok, response.text
#     return "You are {email} on Google".format(email=response.json()["emails"][0]["value"])
    
@auth_routes.route('/client-id')
def get_client_id():
    client_id = os.environ.get('REACT_APP_GOOGLE_OAUTH_CLIENT_ID')
    return jsonify({'clientId': client_id})

@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    user_email = User.query.filter(User.email == form.data['email']).first()
    user_username = User.query.filter(User.username == form.data['username']).first()
    if user_email:
        return {'errors': ['Email already exists']}, 400
    if user_username:
        return {'errors': ['Username already taken']}, 400

    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            full_name =form.data['full_name'],
            email=form.data['email'],
            password=form.data['password'],
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
