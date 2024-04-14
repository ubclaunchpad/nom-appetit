# ===== imports =====
from flask import Flask
from flask import request
from services.search import searchRestaurants

# ===== flask configuration =====
app = Flask(__name__)

# ===== routing  =====
@app.route("/search", methods=['GET', 'POST'])
# example: /search?user_location=40.74229,-73.97771&keyword=pizza
def search():
    try:
        user_location = request.args.get('user_location')
        keyword = request.args.get('keyword')
        return searchRestaurants(user_location, keyword)
       
    except Exception as e:
        raise Exception(f'An error occurred: {str(e)}')    
    
    
        

if __name__ == "__main__":
    app.run(debug=True)