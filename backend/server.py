# ===== imports =====
from flask import Flask
from flask import request
from services.search import searchRestaurants
from services.database import createUser, addRestaurant

# ===== flask configuration =====
app = Flask(__name__)

# ===== routing  =====
@app.route("/search", methods=['GET'])
# example: /search?user_location=_____&keyword=_____
def searchRoute():
    try:
        user_location = request.args.get('user_location')
        keyword = request.args.get('keyword')
        return searchRestaurants(user_location, keyword)
       
    except Exception as e:
        raise Exception(f'An error occurred: {str(e)}')    
    
@app.route("/createUser", methods=['GET'])
# example: /createUser?display_name=_____&email=_____&password=_____
def createUserRoute():
    try:
        display_name = request.args.get("display_name")
        email = request.args.get("email")
        password = request.args.get("password")
        return createUser(display_name, email, password)

    except Exception as e:
        raise Exception(f'An error occurred: {str(e)}')

@app.route("/addRestaurant", methods=['GET', 'POST'])
# example: /addRestaurant?place_id=_____&user_id=_____
def addRestaurantRoute():
    try:
        user_id = request.args.get("user_id")
        place_id = request.args.get("place_id")
        return addRestaurant(user_id, place_id)

    except Exception as e:
        raise Exception(f'An error occurred: {str(e)}')       

if __name__ == "__main__":
    app.run(debug=True)

