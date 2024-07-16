# ===== imports =====
from flask import Flask
from flask import request, g
from functools import wraps
from services.database import *
from services.authentication import *
import jwt

# ===== flask config =====
app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(8)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args['token']
        if not token:
            return { "token_missing": True }
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            g.decoded_token = data
        except:
            return { "token_invalid": True }
        
        return f(*args, **kwargs)
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
# returns: None
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
        token = createToken(username, password, app.config['SECRET_KEY'])
        return { "token": token }
    
    except Exception as e:
        if str(e) == "USER_NOT_FOUND":
            return { "user_not_found": True }
        if str(e) == "INVALID_PASSWORD":
            return { "invalid_password": True }

# ===== routing: home page =====
@app.route("/home", methods=['POST', 'GET'])
@token_required
# params: [TODO]
# returns: [TODO]
# function: [TODO]
def homeRoute():
    return ('', 400)
    
