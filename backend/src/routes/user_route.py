from flask import Blueprint, request
from services.user_service import * 
import jwt

user = Blueprint("user", __name__)

@user.post("/user")
def post_user_route():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        if not username:
            raise Exception("username is missing") 
        if not password:
            raise Exception("password is missing")
        response = post_user(username, password)
        if not response:
            return { "success" : "true" }
        elif "error" in response:
            raise Exception(response.get("error"))
    
    except Exception as e:
        return { "error" : str(e) }, 400

@user.get("/user")
def get_user_route():
    try:
        header = request.headers.get('Authorization')
        if header:
            token = header.split(" ")[1]
            payload = jwt.decode(token, options={"verify_signature": False})
            username = payload.get("username")
        else: 
            raise Exception("token is missing") 
        response = get_user(username)
        if "error" in response:
            raise Exception(response.get("error")) 
        else:
            return { "data" : response }, 200
    
    except Exception as e:
        return { "error" : str(e) }, 400