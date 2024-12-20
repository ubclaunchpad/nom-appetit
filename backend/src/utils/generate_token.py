from datetime import datetime, timedelta, timezone
import jwt

def generate_token(username, secret_key):
    try:
        time = datetime.now(timezone.utc) + timedelta(days=30)
        payload = {
            'username' : username,
            'exp' : time 
        }
        token = jwt.encode(payload, secret_key, algorithm="HS256")
        return token
    
    except Exception as e:
        return { "error" : str(e) }