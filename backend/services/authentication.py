# ===== imports  =====
from services.database import *
import jwt
from datetime import datetime, timedelta, timezone

# ===== token authentication =====
def createToken(username, password, secret_key):
    user_id = validateUser(username, password)
    expiration_time = datetime.now(timezone.utc) + timedelta(minutes=15)
    payload_data = {
        'user_id' : user_id,
        'exp' : expiration_time 
    }
    encoded_jwt = jwt.encode(payload_data, secret_key, algorithm='HS256')
    # print statements
    print("ENCODED_JWT: " + str(encoded_jwt))
    return encoded_jwt