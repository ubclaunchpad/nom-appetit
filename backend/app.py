# ===== imports =====
from functools import wraps

import jwt
from flask import Flask, g, jsonify, request
from services.authentication import *
from services.database import *
from services.yelp import *

# ===== flask config =====
app = Flask(__name__)

app.config["SECRET_KEY"] = "1234"


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
        user_id = createUser(name, email, password)
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
# function: retrives user's name
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
            "username": profile_info["username"],
            "bio": profile_info["bio"],
            "friends": profile_info["friends"],
            "profile_pic": profile_info["profile_pic"],
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
