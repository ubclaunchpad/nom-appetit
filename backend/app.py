# ===== imports =====
import os
import secrets
from urllib.parse import urlencode
from dotenv import load_dotenv

from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user,\
    current_user
import requests
from flask import Flask, redirect, url_for, render_template, flash, session, \
    current_app, request, abort, g, jsonify
from functools import wraps

import jwt
from flask import Flask, g, jsonify, request
from services.authentication import *
from services.database import *
from services.yelp import *
import jwt

load_dotenv()

# ===== flask config =====
app = Flask(__name__)
app.config['SECRET_KEY'] = '1234'
app.config['OAUTH2_PROVIDERS'] = {
    # Google OAuth 2.0 documentation:
    # https://developers.google.com/identity/protocols/oauth2/web-server#httprest
    'google': {
        'client_id': os.environ.get('GOOGLE_CLIENT_ID'),
        'client_secret': os.environ.get('GOOGLE_CLIENT_SECRET'),
        'authorize_url': 'https://accounts.google.com/o/oauth2/auth',
        'token_url': 'https://accounts.google.com/o/oauth2/token',
        'userinfo': {
            'url': 'https://www.googleapis.com/oauth2/v3/userinfo',
            'email': lambda json: json['email'],
            'displayName': lambda json: json['name'],
            'userID': lambda json: json['sub']
        },
        'scopes': ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    }
}
login_manager = LoginManager(app)
login_manager.login_view = '/'
login_manager.init_app(app)

# ===== Initialize User Class =====
class User(UserMixin):
    def __init__(self, id, username, email):
        self.id = id
        self.username = username
        self.email = email

    def __repr__(self):
        return f'<User {self.username}>'

@login.user_loader
def load_user(user_id):
    return getUserInfo(user_id)

# params: provider
# returns: a redirect to the provider's authorization endpoint
# function: reroutes the user to the third-party (Google) login page
@app.route('/authorize/<provider>')
def oauth2_authorize(provider):
    if not current_user.is_anonymous:
        return redirect('http://127.0.0.1:5000/home')

    provider_data = current_app.config['OAUTH2_PROVIDERS'].get(provider)
    if provider_data is None:
        abort(404)

    # generate a random string for the state parameter
    session['oauth2_state'] = secrets.token_urlsafe(16)

    # create a query string with all the OAuth2 parameters
    qs = urlencode({
        'client_id': provider_data['client_id'],
        'redirect_uri': url_for('oauth2_callback', provider=provider,
                                _external=True),
        'response_type': 'code',
        'scope': ' '.join(provider_data['scopes']),
        'state': session['oauth2_state'],
    })

    # redirect the user to the OAuth2 provider authorization URL
    return redirect(provider_data['authorize_url'] + '?' + qs)

@app.route('/callback/<provider>')
# params: provider 
# returns: a redirect back to the application
# function: accepts the authorization token from the provider, exchanges it for an access token,
#           then exchanges the access token for user information
def oauth2_callback(provider):
    if not current_user.is_anonymous:
        return redirect('http://127.0.0.1:5000/home')

    provider_data = current_app.config['OAUTH2_PROVIDERS'].get(provider)
    if provider_data is None:
        abort(404)

    # if there was an authentication error, flash the error messages and exit
    if 'error' in request.args:
        for k, v in request.args.items():
            if k.startswith('error'):
                flash(f'{k}: {v}')

        return redirect('http://127.0.0.1:5000/home')

    # make sure that the state parameter matches the one we created in the
    # authorization request
    if request.args['state'] != session.get('oauth2_state'):
        abort(401)

    # make sure that the authorization code is present
    if 'code' not in request.args:
        abort(401)

    # exchange the authorization code for an access token
    response = requests.post(provider_data['token_url'], data={
        'client_id': provider_data['client_id'],
        'client_secret': provider_data['client_secret'],
        'code': request.args['code'],
        'grant_type': 'authorization_code',
        'redirect_uri': url_for('oauth2_callback', provider=provider,
                                _external=True),
    }, headers={'Accept': 'application/json'})
    if response.status_code != 200:
        abort(401)
    oauth2_token = response.json().get('access_token')
    if not oauth2_token:
        abort(401)

    # use the access token to get the user's information
    response = requests.get(provider_data['userinfo']['url'], headers={
        'Authorization': 'Bearer ' + oauth2_token,
        'Accept': 'application/json',
    })
    if response.status_code != 200:
        abort(401)
    
    # for testing
    print(response.json())

    email = provider_data['userinfo']['email'](response.json())
    name = provider_data['userinfo']['displayName'](response.json())
    userID = provider_data['userinfo']['userID'](response.json())

    # find the user in the database
    try:
        user = getUserInfo(userID)
    except: 
        user = None
        
    if user is None:
        # handle the case where the user is new
        password = None
        createUser(name, email, password, userID)

    # log the user in
    # somehow user is still "None" even after the if statement above has passed. That means that 
    # createUser is not assigning user to anything right now. 
    # I probably need to properly implement flask-Mixin into our user system.
    login_user(user)

    return redirect('http://127.0.0.1:5000/home')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.')
    return redirect(url_for('index'))











def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.headers["Authorization"].split()[1]
        if not token:
            return {"missing_token": True}
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms="HS256")
            g.user_id = data["user_id"]
        except:
            return {"invalid_token": True}
        return func(*args, **kwargs)

    return decorated


# ===== routing: user & profile initialization =====
@app.route("/createUser", methods=["POST"])
# params: name, (unique) username, (unique) email, password
# returns: user_id
# function: creates user auth in firebase
def createUserRoute():
    try:
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        user_id = None
        user_id = createUser(name, email, password, user_id)
        return {"user_id": user_id}

    except Exception as e:
        if str(e) == "PASSWORD_TOO_SHORT":
            return {"password_too_short": True}
        if str(e) == "EMAIL_EXISTS":
            return {"email_exists": True}
        if str(e) == "EMAIL_INVALID":
            return {"email_invalid": True}


@app.route("/createProfile", methods=["POST"])
# params: user_id, (unique) username
# returns: none
# function: creates user profile in firebase
def createProfileRoute():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        username = data.get("username")
        password = data.get("password")
        createProfile(user_id, username)
        token = createToken(username, password, app.config["SECRET_KEY"])
        return {"token": token}

    except Exception as e:
        if str(e) == "USERNAME_EXISTS":
            return {"username_exists": True}


# ===== routing: user authentication =====
@app.route("/login", methods=["POST"])
# params: username, password
# returns: token
# function: verifies user credentials and creates jwt token
def loginRoute():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        token = createToken(username, password, "1234")
        return {"token": token}

    except Exception as e:
        if str(e) == "USER_NOT_FOUND":
            return {"user_not_found": True}
        if str(e) == "INVALID_PASSWORD":
            return {"invalid_password": True}


@app.route("/verifyToken", methods=["POST"])
# params: token (header)
# returns: json message
# function: verifies jwt token
@token_required
def authenticate_token():
    return {"valid_token": True}


# ===== routing: home page =====
@app.route("/home", methods=["POST"])
@token_required
# params: none
# returns: name
# function: retrieves user's name
def homeRoute():
    try:
        user_info = getUserInfo(g.user_id)
        return {"name": user_info["name"]}

    except Exception as e:
        if str(e) == "USER_NOT_FOUND":
            return {"user_not_found": True}
        if str(e) == "PROFILE_NOT_FOUND":
            return {"profile_not_found": True}


# ===== routing: yelp =====
@app.route("/searchRestaurants", methods=["POST"])
@token_required
# params: longitude, latitude, keywords
# returns: [list of restaurants]
# function: searches for restaurants given coordinates and keywords
def searchRestaurantsRoute():
    try:
        data = request.get_json()
        longitude = data.get("longitude")
        latitude = data.get("latitude")
        keywords = data.get("keywords")
        restaurants = searchRestaurants(longitude, latitude, keywords)
        return {"restaurants": restaurants}

    except Exception as e:
        if str(e) == "API_KEY_MISSING":
            return {"api_key_missing": True}


@app.route("/filterSearchRestaurants", methods=["POST"])
@token_required
# params: longitude (required), latitude (required), location, distance, cuisine, rating, price
# returns: [list of restaurants]
# function: searches restaurants based on filters
def filterSearchRestaurantsRoute():
    try:
        data = request.get_json()
        longitude = data.get("longitude")
        latitude = data.get("latitude")
        location = data.get("location")
        distance = data.get("distance")
        cuisine = data.get("cuisine")
        rating = data.get("rating")
        price = data.get("price")
        restaurants = filterSearchRestaurants(
            longitude, latitude, location, distance, cuisine, rating, price
        )
        return {"restaurants": restaurants}

    except Exception as e:
        if str(e) == "API_KEY_MISSING":
            return {"api_key_missing": True}


@app.route("/getRestaurantDetails", methods=["POST"])
# params: restaurant_id, date
# returns: restaurant details (json)
# function: retrieves restaurant details
def getRestaurantDetailsRoute():
    try:
        data = request.get_json()
        restaurant_id = data.get("restaurant_id")
        current_day = data.get("current_day")
        print("ID: " + restaurant_id)
        print("CURRENT DAY: " + str(current_day))
        restaurant_info = getRestaurantDetails(restaurant_id, current_day)
        print(restaurant_info)
        return {"restaurant_details": restaurant_info}

    except Exception as e:
        if str(e) == "API_KEY_MISSING":
            return {"api_key_missing": True}


@app.route("/getUserInformation", methods=["GET"])
@token_required
# params: none
# returns: user and profile information
# function: to retrieve profile information from token
def getUserInformationRoute():
    try:
        user_info = getUserInfo(g.user_id)
        profile_info = getProfileInfo(g.user_id)
        return {
            "name": user_info["name"],
            "user_id": g.user_id,
            "username": profile_info["username"],
            "bio": profile_info["bio"],
            "reviews": profile_info["reviews"],
            "saved": profile_info["saved"],
        }

    except Exception as e:
        if str(e) == "USER_NOT_FOUND":
            return {"user_not_found": True}
        if str(e) == "PROFILE_NOT_FOUND":
            return {"profile_not_found": True}


@app.route("/editUserInfo", methods=["POST"])
@token_required
# params: none
# returns: success or failure message
# function: to edit user information
def editUserInfoRoute():
    try:
        data = request.get_json()
        result = editProfileInfo(g.user_id, data)
        return {"result": result}
    except Exception as e:
        return {"error": str(e)}
