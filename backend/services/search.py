# ===== imports =====
from dotenv import load_dotenv
import requests
import os

# ===== api configuration =====
load_dotenv('./services/secrets/.env')

GOOGLE_KEY = os.getenv('GOOGLE_KEY')
GOOGLE_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"
TYPE = 'restaurant'
RADIUS = 2000

if not GOOGLE_KEY:
    raise Exception("API Key is either missing or invalid")

# ===== functions =====
def searchRestaurants(user_location, keyword):
    params = {
        'key': GOOGLE_KEY,
        'type': TYPE,
        'radius': RADIUS,
        'location': user_location,
        'query': keyword
    }

    try: 
        response = requests.get(GOOGLE_URL, params=params)
        return response.json()['results']
    except Exception as e:
        raise Exception(f'An error occurred: {str(e)}') 