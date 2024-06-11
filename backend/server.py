# ===== imports =====
from flask import Flask, Response
from flask import request, jsonify
from services.firebase import *
from services.search import *
from services.filter import *

# ===== flask configuration =====
app = Flask(__name__)

# ===== routing -> search =====
@app.route("/", methods=['GET','POST'])
def index():
    return Response(status = 204)

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
# returns: [parses wishlist/visited that meets poll criteria], [new restaurant search that meet poll criteria]
# function: returns back restaurants (place_id) that meet poll criteria
@app.route("/userAlgorithm", methods=['GET', 'POST'])
def userAlgorithmRoute():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        user_location = data.get("user_location")
        # determines if it checks wishlist or visited
        q1 = data.get("q1")
        # determines price_level
        q2a = data.get("q2a")
        q2b = data.get("q2b")
        # simple google details parameters
        q3 = data.get("q3")
        q4 = data.get("q4")
        q5 = data.get("q5")
        q6 = data.get("q6")
        q7 = data.get("q7")
        q8 = data.get("q8")
        q9 = data.get("q9")
        q10 = data.get("q10")
        valid_array, search_valid_array = pollFilter(user_id, user_location, q1, q2a, q2b, q3, q4, q5, q6, q7, q8, q9, q10)
        return jsonify({
            "valid_array": valid_array,
            "search_valid_array": search_valid_array
        })

    except Exception as e:
        raise Exception(f'An error occurred: {str(e)}')

# ===== routing -> user & social =====
@app.route("/user", methods=['POST'])
# params: display_name, username, email, password
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
    
@app.route("/profile", methods=['PUT'])
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

# ===== reviews =====
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

if __name__ == "__main__":
    app.run(debug=True)