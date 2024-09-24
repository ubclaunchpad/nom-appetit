from dotenv import load_dotenv
from datetime import datetime
from services.database import *
import requests
import os

load_dotenv('./services/secrets/.env')

YELP_KEY = os.getenv('YELP_KEY')
SEARCH_URL = "https://api.yelp.com/v3/businesses/search"
DETAILS_URL = "https://api.yelp.com/v3/businesses"

headers = {
    "accept": "application/json",
    "Authorization": 'Bearer %s' % YELP_KEY
}

if not YELP_KEY:
    raise Exception("API_KEY_MISSING")

def searchRestaurants(longitude, latitude, keywords, location, user_id):
    params = {
        'radius': 20000,
        'term': keywords + ' ' + 'restaurant',
        'sort_by': 'rating',
        'limit': 15
    }
    if location:
        params['location'] = location
    else:
        params['longitude'] = longitude
        params['latitude'] = latitude
    response = requests.get(SEARCH_URL, params=params, headers=headers)
    response_array = response.json()["businesses"]
    parsed_array = []
    for restaurant in response_array:
        parsed_restaurant = parseRestaurant(restaurant, user_id, True)
        parsed_array.append(parsed_restaurant)
    return parsed_array

def getRestaurantDetails(restaurant_id, user_id):
    response = requests.get(DETAILS_URL + f'/{restaurant_id}', headers=headers)
    restaurant_details = response.json()
    parsed_restaurant = parseRestaurant(restaurant_details, user_id, False)
    return parsed_restaurant

def getRestaurantDetailsWithoutParse(restaurant_id):
    response = requests.get(DETAILS_URL + f'/{restaurant_id}', headers=headers)
    restaurant_details = response.json()
    return restaurant_details

def parseRestaurant(restaurant, user_id, regular_search):
    parsed_restaurant = {
        "id": restaurant["id"],
        "name": restaurant["name"],
        "coordinates": restaurant["coordinates"],
        "location": restaurant["location"],
    }
    # ===== contingent => distance =====
    if "distance" in restaurant:
        parsed_restaurant["distance"] = round(restaurant["distance"] / 1000, 2)
    # ===== contingent => image =====
    if "image_url" in restaurant:
        parsed_restaurant["image_url"] = restaurant["image_url"]
    else: 
        parsed_restaurant["image_url"] = ""
    # ===== contingent => price =====
    if "price" in restaurant:
        parsed_restaurant["price"] = restaurant["price"]
    else: 
        parsed_restaurant["price"] = "N/A"
    # ===== contingent => hours =====
    if "business_hours" in restaurant and restaurant["business_hours"] and "open" in restaurant["business_hours"][0]:
        parsed_restaurant["business_hours"] = restaurant["business_hours"][0]["open"]
    else:
        parsed_restaurant["business_hours"] = []
    # ===== contingent => categories =====
    if "categories" in restaurant:
        parsed_restaurant["categories"] = restaurant["categories"]
    else:
        parsed_restaurant["categories"] = []
    # ===== contingent => rating =====
    if "rating" in restaurant:
        parsed_restaurant["rating"] = restaurant["rating"]
    else:
        parsed_restaurant["rating"] = 0
    return parsed_restaurant
    