
from utils.generate_token import generate_token
from utils.validate_user import validate_user

def get_token(username, password, secret_key):
    try:
        response = validate_user(username, password)
        if "error" in response:
            raise Exception(response.get("error"))
        token = generate_token(username, secret_key)
        return token

    except Exception as e:
        return { "error" : str(e) }
