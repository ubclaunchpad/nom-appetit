# ===== imports =====
from flask import Flask, Response
from flask import request
import services.search as gs
import services.firebase as fb

# ===== flask configuration =====
app = Flask(__name__)

# ===== routing -> search =====
@app.route("/", methods=['GET','POST','PUT'])
def index():
    return Response(status = 204)

@app.route("/search", methods=['GET'])
def searchRoute():
    try:
        data = request.get_json()
        user_location = data.get('user_location')
        keyword = data.get('keyword')
        # returns a list of restaurants 
        return gs.searchRestaurants(user_location, keyword)
       
    except Exception as e:
        raise Exception(f'An error occurred: {str(e)}')   
    
# ===== routing -> user & social =====
@app.route("/user", methods=['POST'])
# params: display_name, username, email, password
def createUserRoute():
    try:
        data = request.get_json()
        display_name = data.get("display_name")
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        # returns user_id
        return fb.createUser(display_name, username, email, password)

    except Exception as e:
        raise Exception(str(e))
    
@app.route("/profile", methods=['PUT'])
# params: user_id, user_name | bio
def updateProfileRoute():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        
        if "username" in data:
            username = data.get("username")
            # returns user_id
            return fb.updateUsername(user_id, username)
        
        if "bio" in data:
            bio = data.get("bio")
            # returns user_id
            return fb.updateBio(user_id, bio)
        
    except Exception as e:
        raise Exception(str(e))

@app.route("/addReview", methods=['POST'])
# params: user_id, place_id, review, rating
def addReviewRoute():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        place_id = data.get("place_id")
        review = data.get("review")
        rating = data.get("rating")
        # returns review_id
        return fb.addReview(user_id, place_id, review, rating)

    except Exception as e:
        raise Exception(str(e))  

@app.route("/saveRestaurant", methods=['POST'])
# params: user_id, place_id 
def saveRestaurantRoute():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        place_id = data.get("place_id")
        # returns user_id 
        return fb.saveRestaurant(user_id, place_id)

    except Exception as e:
        raise Exception(str(e))

if __name__ == "__main__":
    app.run(debug=True)