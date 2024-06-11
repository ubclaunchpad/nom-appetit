# ===== imports =====
from dotenv import load_dotenv
import requests
import os

# ===== api configuration =====
load_dotenv('./services/secrets/.env')

GOOGLE_KEY = os.getenv('GOOGLE_KEY')
PLACES_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"
DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json"
TYPE = 'restaurant'

if not GOOGLE_KEY:
    raise Exception("API Key is either missing or invalid")

# ===== functions =====
def searchRestaurants(user_location, keyword, radius):
    params = {
        'key': GOOGLE_KEY,
        'type': TYPE,
        'radius': radius,
        'location': user_location,
        'query': keyword
    }
    try: 
        response = requests.get(PLACES_URL, params=params)
        return response.json()['results']
    except Exception as e:
        raise Exception(f'An error occurred: {str(e)}')
    
def getRestaurantDetails(place_id):
    params = {
        "key": GOOGLE_KEY,
        "place_id": place_id
    }
    try:
        response = requests.get(DETAILS_URL, params=params)
        return response.json()
    except Exception as e:
        raise Exception(f'An error occurred: {str(e)}')