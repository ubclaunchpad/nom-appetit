import json
import secrets
import jwt
from functools import wraps
from flask import Flask, g, request
from services.authentication import *
from services.database import *
from services.yelp import *
from services.recommendation import *

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
        email = data.get("email")
        username = data.get("username")
        name = data.get("name")
        password = data.get("password")
        user_id = createUser(username, email, password)
        createProfile(user_id, name)
        return {"user_id": user_id}

    except Exception as e:
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

@app.route("/saveRestaurant", methods=["POST"])
@token_required
def saveRestaurantRoute():
    try:
        data = request.get_json()
        result = saveRestaurant(g.user_id, data)
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
    
@app.route("/searchRestaurants", methods=["GET"])
@token_required
def searchRestaurantsRoute():
    try:
        data = request.args
        longitude = data.get("longitude")
        latitude = data.get("latitude")
        location = data.get("location")
        keywords = data.get("keywords")
        user_id = g.user_id
        restaurants = searchRestaurants(longitude, latitude, keywords, location, user_id)
        return {"restaurants": restaurants}

    except Exception as e:
        # API_KEY_MISSING
        return {"error": str(e)}
    
@app.route("/createReview", methods=["POST"])
@token_required
def createReviewRoute():
    try:
        data = request.get_json()
        restaurant_id = data.get("restaurant_id")
        name = data.get("name")
        image_url = data.get("image_url")
        picture_id = data.get("picture_id")
        user_id = g.user_id
        rating = data.get("rating")
        review = data.get("review")
        result = createReview(restaurant_id, name, image_url, user_id, rating, review, picture_id)
        return {"success": result}

    except Exception as e:
        return {"error": str(e)}
    
@app.route("/getAllReviews", methods=["GET"])
@token_required
def getAllReviewsRoute():
    try:
        data = request.args
        restaurant_id = data.get("restaurant_id")
        reviews = getAllReviews(restaurant_id)
        return {"reviews": reviews}

    except Exception as e:
        return {"error": str(e)}
    
@app.route("/getUserInfo", methods=["GET"])
@token_required
def getUserInfoRoute():
    try:
        user_id = g.user_id
        user_info = getUserInfo(user_id)
        user_creds = getUserCreds(user_id)
        user_info['user_id'] = user_id
        user_info['username'] = user_creds['username']
        user_info['email'] = user_creds['email']
        return {"user_info": user_info}

    except Exception as e:
        return {"error": str(e)}
    
@app.route("/getRestaurantDetails", methods=["GET"])
@token_required
def getRestaurantDetailsRoute():
    try:
        data = request.args
        restaurant_id = data.get("restaurant_id")
        user_id = g.user_id
        restaurant_details = getRestaurantDetails(restaurant_id, user_id)
        return {"restaurant_details": restaurant_details}
        
    except Exception as e:
        return {"error": str(e)}
    
@app.route("/getSavedRestaurants", methods=["GET"])
@token_required
def getSavedRestaurantsRoute():
    try:
        user_id = g.user_id
        saved_restaurants = getSavedRestaurants(user_id)
        return {"saved_restaurants": saved_restaurants}
        
    except Exception as e:
        return {"error": str(e)}

@app.route("/getUserReviews", methods=["GET"])
@token_required
def getUserReviewsRoute():
    try:
        user_id = g.user_id
        reviews = getUserReviews(user_id)
        return {"reviews": reviews}
        
    except Exception as e:
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

@app.route("/getAllUsernames", methods=["GET"])
def getAllUsernamesRoute():
    try:
        result = getAllUsernames()
        return {"result": result}

    except Exception as e:
        return {"error": str(e)}
    
@app.route("/getUserRecommendations", methods=["POST"])
@token_required
def getUserRecommendationsRoute():
    try:
        data = request.get_json()
        user_id = g.user_id
        refresh_request = data.get("refresh_request")
        recommendations = recommendUser(user_id, refresh_request)
        return {"restaurants": recommendations}
    
    except Exception as e:
        return {"error": str(e)}

@app.route("/removeReview", methods=["POST"])
@token_required
def removeReviewRoute():
    try:
        data = request.get_json()
        user_id = g.user_id
        restaurant_id = data.get("restaurant_id")
        result = removeReview(user_id, restaurant_id)
        return {"success": result}
    
    except Exception as e:
        return {"error": str(e)}
    
@app.route("/getImageID", methods=["GET"])
@token_required
def getImageIDRoute():
    try:
        data = request.args
        user_id = g.user_id
        restaurant_id = data.get("restaurant_id")
        picture_id = getImageID(user_id, restaurant_id)
        return {"picture_id": picture_id}
    
    except Exception as e:
        return {"error": str(e)}

@app.route("/getSavedStatus", methods=["POST"])
@token_required
def getSavedStatusRoute():
    try:
        data = request.get_json()
        user_id = g.user_id
        restaurant_id = data.get("restaurant_id")
        status = getSavedStatus(user_id, restaurant_id)
        return {"saved": status}
    
    except Exception as e:
        return {"error": str(e)}
    
@app.route("/getOtherUserInfo", methods=["GET"])
@token_required
def getOtherUserInfoRoute():
    try:
        data = request.args
        user_id = data.get("user_id")
        user_info = getUserInfo(user_id)
        user_creds = getUserCreds(user_id)
        user_info['user_id'] = user_id
        user_info['username'] = user_creds['username']
        user_info['email'] = user_creds['email']
        return {"user_info": user_info}

    except Exception as e:
        return {"error": str(e)}
