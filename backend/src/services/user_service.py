from utils.query_db import query_db
import bcrypt

def post_user(username, password):
    hash_password = bcrypt.hashpw(password.encode("UTF-8"), bcrypt.gensalt())
    query = f"""
        INSERT INTO users (username, password)
        VALUES ('{username}', '{hash_password.decode("UTF-8")}'); 
    """
    response = query_db(query)
    return response

def get_user(username):
    query = f"""
        SELECT *
        FROM users
        WHERE username = '{username}';
    """
    params = ["username", "password"]
    response = query_db(query, params, "row")
    return response
