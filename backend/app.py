# ===== imports =====
from flask import Flask
from flask import request, jsonify
from services.firebase import *
from services.search import *
from services.filter import *

# ===== flask configuration =====
app = Flask(__name__)

# ===== routing -> search =====
@app.route("/search", methods=['GET'])
# params: user_location, keyword
# returns: [list of restaurants] 
# function: searches for restaurants given coordinates
def searchRoute():
    try:
        data = request.get_json()
        user_location = data.get('user_location')
        keyword = data.get('keyword')
        radius = data.get('radius')
        return searchRestaurants(user_location, keyword, radius)
       
    except Exception as e:
        raise Exception(f'An error occurred: {str(e)}')

# ===== routing -> algorithm =====
# params: user_id, user_location, poll questions 1-9
# returns: method, [detailed_array], [valid_array]
# function: returns back restaurants (place_id) that meet poll criteria
@app.route("/userAlgorithm", methods=['GET', 'POST'])
def userAlgorithmRoute():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        user_location = data.get("user_location")
        q1 = bool(data.get("q1"))
        q2 = bool(data.get("q2"))
        q3 = bool(data.get("q3"))
        q4 = bool(data.get("q4"))
        q5 = bool(data.get("q5"))
        q6 = bool(data.get("q6"))
        q7 = bool(data.get("q7"))
        q8 = bool(data.get("q8"))
        q9 = bool(data.get("q9"))
        q10 = bool(data.get("q10"))
        method, detailed_array, valid_array = pollFilter(user_id, user_location, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)
        return {
            "method": method,
            "detailed_array": detailed_array,
            "valid_array": valid_array
        }

    except Exception as e:
        raise Exception(f'An error occurred: {str(e)}')

# ===== routing -> user & social =====
@app.route("/createUser", methods=['POST'])
# params: display_name, (unique) username, (unique) email, password
# returns: user_id 
# function: creates user authentication and instantiates user profile in fb database
def createUserRoute():
    try:
        data = request.get_json()
        display_name = data.get("display_name")
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        return createUser(display_name, username, email, password)

    except Exception as e:
        raise Exception(str(e))
    
@app.route("/updateProfile", methods=['PUT'])
# params: user_id, user_name | bio
# returns: user_id 
# function: updates the username or bio given user_id
def updateProfileRoute():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        
        if "username" in data:
            username = data.get("username")
            return updateUsername(user_id, username)
        
        if "bio" in data:
            bio = data.get("bio")
            return updateBio(user_id, bio)
        
    except Exception as e:
        raise Exception(str(e))

@app.route("/saveToWishlist", methods=['POST'])
# params: user_id, place_id 
# returns: user_id 
# function: saves place_id into user's wishlist
def saveToWishlistRoute():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        place_id = data.get("place_id")
        return saveToWishlist(user_id, place_id)

    except Exception as e:
        raise Exception(str(e))
    
@app.route("/saveToVisited", methods=['POST'])
# params: user_id, place_id 
# returns: user_id 
# function: saves place_id into user's visited
def saveToVistedRoute():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        place_id = data.get("place_id")
        return saveToVisited(user_id, place_id)

    except Exception as e:
        raise Exception(str(e))

# ===== routing -> reviews =====
@app.route("/addReview", methods=['POST'])
# params: user_id, place_id, review, rating
# returns: review_id 
# function: saves review document into `reviews` collection (database)
# TODO: need to check if a review has already been made for given restaurant for user
def addReviewRoute():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        place_id = data.get("place_id")
        review = data.get("review")
        rating = data.get("rating")
        return addReview(user_id, place_id, review, rating)

    except Exception as e:
        raise Exception(str(e))