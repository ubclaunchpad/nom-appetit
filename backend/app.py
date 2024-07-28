# ===== imports =====
from flask import Flask
from flask import request, g
from functools import wraps
from services.database import *
from services.authentication import *
import jwt

# ===== flask config =====
app = Flask(__name__)

app.config['SECRET_KEY'] = '1234'

def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.headers['Authorization'].split()[1]
        if not token:
            return {'missing_token': True}
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms="HS256")
            g.user_id = data['user_id']
        except:
            return {'invalid_token': True}
        return func(*args, **kwargs)
    return decorated

# ===== routing: user & profile initialization =====
@app.route("/createUser", methods=['POST'])
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
        return { "user_id": user_id }

    except Exception as e:
        if str(e) == "PASSWORD_TOO_SHORT":
            return { "password_too_short": True }
        if str(e) == "EMAIL_EXISTS":
            return { "email_exists": True }
        if str(e) == "EMAIL_INVALID":
            return { "email_invalid": True }
        
@app.route("/createProfile", methods=['POST'])
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
        token = createToken(username, password, app.config['SECRET_KEY'])
        return { "token": token }
    
    except Exception as e:
        if str(e) == "USERNAME_EXISTS":
            return { "username_exists": True }
        
# ===== routing: user authentication =====
@app.route("/login", methods=['POST'])
# params: username, password
# returns: token
# function: verifies user credentials and creates jwt token
def loginRoute():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        token = createToken(username, password, "1234")
        return { "token": token }
    
    except Exception as e:
        if str(e) == "USER_NOT_FOUND":
            return { "user_not_found": True }
        if str(e) == "INVALID_PASSWORD":
            return { "invalid_password": True }

# ===== routing: home page =====
@app.route("/home", methods=['POST'])
@token_required
# params: none
# returns: name
# function: retrives user's name
def homeRoute():
    try: 
        user_info = getUserInfo(g.user_id)
        return { "name": user_info['name'] } 
    
    except Exception as e:
        if str(e) == "USER_NOT_FOUND":
            return { "user_not_found": True }
        if str(e) == "PROFILE_NOT_FOUND":
            return { "profile_not_found": True }