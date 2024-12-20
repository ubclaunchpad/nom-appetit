from utils.query_db import query_db
import bcrypt

def validate_user(username, password):
    try: 
        query = f"""
            SELECT password
            FROM users
            WHERE username = '{username}'
        """
        params = ["password"]
        response = query_db(query, params, "row")
        if "error" in response:
            raise Exception(response)
        if not bcrypt.checkpw(password.encode("UTF-8"), response.get("password").encode("UTF-8")):
            raise Exception("invalid password")
        return username
        
    except Exception as e:
        return { "error" : str(e) }