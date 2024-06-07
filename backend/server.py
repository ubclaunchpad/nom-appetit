# ===== imports =====
from flask import Flask, Response
from flask import request
from services.firebase import *
from services.search import *
from services.algorithm import *

# ===== flask configuration =====
app = Flask(__name__)

# ===== routing -> search =====
@app.route("/", methods=['GET','POST','PUT'])
def index():
    return Response(status = 204)

@app.route("/search", methods=['GET'])
# params: user_location, keyword
# returns: [list of restaurants] 
# function: searches for restaurants given coordinates
# TODO: ability to change range km's
def searchRoute():
    try:
        data = request.get_json()
        user_location = data.get('user_location')
        keyword = data.get('keyword')
        return searchRestaurants(user_location, keyword)
       
    except Exception as e:
        raise Exception(f'An error occurred: {str(e)}')

# ===== routing -> algorithm =====
# params:
# returns:  
# function: 
# TODO: finish function
@app.route("/algorithm", methods=['GET', 'POST'])
def algorithmRoute():
    try:
        data = reccomender('U3')
        return data
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

@app.route("/saveRestaurant", methods=['POST'])
# params: user_id, place_id 
# returns: user_id 
# function: saves place_id into user's saved_restaurants 
def saveRestaurantRoute():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        place_id = data.get("place_id")
        return saveRestaurant(user_id, place_id)

    except Exception as e:
        raise Exception(str(e))

if __name__ == "__main__":
    app.run(debug=True)