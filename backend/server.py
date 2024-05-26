# ===== imports =====
from flask import Flask
from flask import request
from services.search import searchRestaurants
from services.firebase import createUser, addRestaurant, addReview

# ===== flask configuration =====
app = Flask(__name__)

# ===== routing  =====
@app.route("/search", methods=['GET'])
# example: /search?user_location=_____&keyword=_____
def searchRoute():
    try:
        user_location = request.args.get('user_location')
        keyword = request.args.get('keyword')
        # returns a list of restaurants 
        return searchRestaurants(user_location, keyword)
       
    except Exception as e:
        raise Exception(f'An error occurred: {str(e)}')    
    
# ===== routing for user / social features =====
# CREATE USER : display_name, username, email, password in the body
@app.route("/user", methods=['POST'])
# example: /createUser?display_name=_____&username=_____&email=_____&password=_____
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
    
@app.route("/")
    
@app.route("/addReview", methods=['POST'])
# example: /addReview?user_id=_____&place_id=_____&review=_____&rating=_____
def addReviewRoute():
    try:
        user_id = request.args.get("user_id")
        place_id = request.args.get("place_id")
        review = request.args.get("review")
        rating = request.args.get("rating")
        # return review_id
        return addReview(user_id, place_id, review, rating)

    except Exception as e:
        raise Exception(str(e))  

@app.route("/addRestaurant", methods=['POST'])
# example: /addRestaurant?user_id=_____&place_id=_____
def addRestaurantRoute():
    try:
        user_id = request.args.get("user_id")
        place_id = request.args.get("place_id")
        # returns user_id 
        return addRestaurant(user_id, place_id)

    except Exception as e:
        raise Exception(str(e))
    

    

    
if __name__ == "__main__":
    app.run(debug=True)

