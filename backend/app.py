# ===== imports =====
from functools import wraps
from flask import Flask, g, request
from services.authentication import *
from services.database import *
from services.yelp import *
import jwt
import json
import secrets

# ===== flask config =====
app = Flask(__name__)
app.config["SECRET_KEY"] = secrets.token_urlsafe(32)

# ===== test files =====
with open('tests/test-search.json', 'r') as file:
    test_search = json.load(file)
with open('tests/test-detailed-search.json', 'r') as file:
    test_detailed_search = json.load(file)

# ===== jwt =====
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

# ===== routing: user & profile =====
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
        # PASSWORD_TOO_SHORT, EMAIL_EXISTS, EMAIL_INVALID
        return {"error": str(e)}

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
        # USERNAME_EXISTS
        return {"error": str(e)}

@app.route("/editUserInfo", methods=["POST"])
@token_required
# params: user_id
# returns: success or failure message
# function: to edit user information
def editUserInfoRoute():
    try:
        data = request.get_json()
        result = editProfileInfo(g.user_id, data)
        return {"result": result}
    
    except Exception as e:
        return {"error": str(e)}
    
@app.route("/getDetailedUserInfo", methods=["POST"])
@token_required
# params: user_id
# returns: user_info
# function: to get detailed user information
def getDetailedUserInfoRoute():
    try:
        user_info = getDetailedUserInfo(g.user_id)
        return {"user_info": user_info}

    except Exception as e:
        return {"error": str(e)}

@app.route("/saveRestaurant", methods=["POST"])
@token_required
# params: user_id, restaurant_id
# returns: success/failure
# function: to save a restaurant
def saveRestaurantRoute():
    try:
        data = request.get_json()
        restaurant_id = data.get("restaurant_id")
        result = saveRestaurant(g.user_id, restaurant_id)
        return {"success": result}

    except Exception as e:
        return {"error": str(e)}


# ===== routing: authentication =====
@app.route("/login", methods=["POST"])
# params: username, password
# returns: token
# function: verifies user credentials and creates jwt token
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

@app.route("/verifyToken", methods=["POST"])
@token_required
# params: token (header)
# returns: json message
# function: verifies jwt token
def verifyTokenRoute():
    return {"valid_token": True}


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
        restaurants = test_search
        return {"restaurants": restaurants}

    except Exception as e:
        # API_KEY_MISSING
        return {"error": str(e)}

@app.route("/getRestaurantDetails", methods=["POST"])
@token_required
# params: restaurant_id, date
# returns: restaurant details (json)
# function: retrieves restaurant details
def getRestaurantDetailsRoute():
    try:
        data = request.get_json()
        restaurant_id = data.get("restaurant_id")
        current_day = data.get("current_day")
        restaurant = test_detailed_search
        return {"restaurant_details": restaurant}

    except Exception as e:
        # API_KEY_MISSING
        return {"error": str(e)}


# ===== routing: reviews =====
@app.route("/createReview", methods=["POST"])
@token_required
# params: review_id, restaurant_id, review, rating
# returns: review_id
# function: creates a review
def createReviewRoute():
    try:
        data = request.get_json()
        review_id = data.get("review_id")
        restaurant_id = data.get("restaurant_id")
        review = data.get("review")
        rating = data.get("rating")
        date = data.get("date")
        review_id = createReview(review_id, restaurant_id, g.user_id, rating, review, date)
        return {"review_id": review_id}

    except Exception as e:
        return {"error": str(e)}

@app.route("/getReviews", methods=["POST"])
@token_required
# params: restaurant_id
# returns: [list of reviews]
# function: retrieves all reviews for a given restaurant
def getReviewsRoute():
    try:
        data = request.get_json()
        restaurant_id = data.get("restaurant_id")
        reviews = getReviews(restaurant_id)
        return {"reviews": reviews}

    except Exception as e:
        return {"error": str(e)}