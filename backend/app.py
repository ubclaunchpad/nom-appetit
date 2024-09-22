import json
import secrets
import jwt
from functools import wraps
from flask import Flask, g, request
from services.authentication import *
from services.database import *
from services.yelp import *

app = Flask(__name__)
app.config["SECRET_KEY"] = (
    "SECRET_KEY"  # TODO: replace this with secrets.token_hex(16) when deploying
)

with open("tests/test-search.json", "r") as file:
    test_search = json.load(file)
with open("tests/test-detailed-search.json", "r") as file:
    test_detailed_search = json.load(file)


def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.headers["Authorization"].split()[1]
        if not token:
            return {"invalid_token": True}
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms="HS256")
            g.user_id = data["user_id"]
        except:
            return {"invalid_token": True}
        return func(*args, **kwargs)

    return decorated


@app.route("/register", methods=["POST"])
def registerRoute():
    try:
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        username = data.get("username")
        password = data.get("password")
        user_id = createUser(name, email, password)
        createProfile(user_id, username)
        return {"user_id": user_id}

    except Exception as e:
        # PASSWORD_TOO_SHORT, EMAIL_EXISTS, EMAIL_INVALID, USERNAME_EXISTS
        return {"error": str(e)}


@app.route("/login", methods=["POST"])
def loginRoute():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        token = createToken(username, password, app.config["SECRET_KEY"])
        return {"token": token}

    except Exception as e:
        # USER_NOT_FOUND, INVALID_PASSWORD
        return {"error": str(e)}


@app.route("/editUserInfo", methods=["POST"])
@token_required
def editUserInfoRoute():
    try:
        data = request.get_json()
        result = editProfileInfo(g.user_id, data)
        return {"result": result}

    except Exception as e:
        return {"error": str(e)}


@app.route("/getDetailedUserInfo", methods=["GET"])
@token_required
def getDetailedUserInfoRoute():
    try:
        data = request.args
        user_id = data.get("user_id")
        user_info = getDetailedUserInfo(user_id)
        return {"user_info": user_info}

    except Exception as e:
        return {"error": str(e)}


@app.route("/getCurrentUserInfo", methods=["GET"])
@token_required
def getCurrentUserInfoRoute():
    try:
        user_id = g.user_id
        current_user_info = getDetailedUserInfo(user_id)
        current_user_info["id"] = user_id
        reviewed_restaurant_ids = current_user_info["reviews"]
        review_details = []
        for review_id in reviewed_restaurant_ids:
            review_detail = getUserReviews(review_id, user_id)
            review_details.append(review_detail)
        return {
            "current_user_info": current_user_info,
            "current_user_reviews": review_details,
        }

    except Exception as e:
        if str(e) == "USER_NOT_FOUND":
            return {"user_not_found": True}
        if str(e) == "PROFILE_NOT_FOUND":
            return {"profile_not_found": True}


@app.route("/saveRestaurant", methods=["POST"])
@token_required
def saveRestaurantRoute():
    try:
        data = request.get_json()
        restaurant_id = data.get("restaurant_id")
        result = saveRestaurant(g.user_id, restaurant_id)
        return {"result": result}

    except Exception as e:
        return {"error": str(e)}


@app.route("/unsaveRestaurant", methods=["POST"])
@token_required
def unsaveRestaurantRoute():
    try:
        data = request.get_json()
        restaurant_id = data.get("restaurant_id")
        result = unsaveRestaurant(g.user_id, restaurant_id)
        return {"success": result}

    except Exception as e:
        return {"error": str(e)}


@app.route("/getSavedRestaurants", methods=["GET"])
@token_required
def getSavedRestaurantsRoute():
    date = request.args.get("current_day")
    try:
        restaurant_list = []
        saved_restaurants = getSavedRestaurants(g.user_id)
        for restaurant in saved_restaurants:
            restaurant_details = getRestaurantDetails(restaurant, date)
            restaurant_list.append(restaurant_details)

        return {"saved_restaurants": restaurant_list}

    except Exception as e:
        return {"error": str(e)}


@app.route("/searchRestaurants", methods=["GET"])
@token_required
def searchRestaurantsRoute():
    try:
        data = request.args
        longitude = data.get("longitude")
        latitude = data.get("latitude")
        keywords = data.get("keywords")
        location = data.get("location")
        restaurants = searchRestaurants(longitude, latitude, keywords, location)
        return {"restaurants": restaurants}

    except Exception as e:
        # API_KEY_MISSING
        return {"error": str(e)}


@app.route("/getRestaurantDetails", methods=["GET"])
@token_required
def getRestaurantDetailsRoute():
    try:
        data = request.args
        restaurant_id = data.get("restaurant_id")
        current_day = data.get("current_day")
        restaurant = getRestaurantDetails(restaurant_id, current_day)
        return {"restaurant_details": restaurant}

    except Exception as e:
        # API_KEY_MISSING
        return {"error": str(e)}


@app.route("/createReview", methods=["POST"])
@token_required
def createReviewRoute():
    try:
        data = request.get_json()
        review_id = data.get("review_id")
        restaurant_id = data.get("restaurant_id")
        review = data.get("review")
        rating = data.get("rating")
        review_id = createReview(review_id, restaurant_id, g.user_id, rating, review)
        print(review)
        return {"review_id": review_id}

    except Exception as e:
        return {"error": str(e)}


@app.route("/getReviews", methods=["GET"])
@token_required
def getReviewsRoute():
    try:
        data = request.args
        restaurant_id = data.get("restaurant_id")
        reviews = getReviews(restaurant_id)
        return {"reviews": reviews}

    except Exception as e:
        return {"error": str(e)}
