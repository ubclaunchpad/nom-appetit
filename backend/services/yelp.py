# ===== imports =====
from dotenv import load_dotenv
import requests
import os

# ===== api configuration =====
load_dotenv('./services/secrets/.env')

YELP_KEY = os.getenv('YELP_KEY')
SEARCH_URL = "https://api.yelp.com/v3/businesses/search"
DETAILS_URL = "https://api.yelp.com/v3/businesses/"

headers = {
    "accept": "application/json",
    "Authorization": 'Bearer %s' % YELP_KEY
}

if not YELP_KEY:
    raise Exception("API_KEY_MISSING")

# ===== functions =====
def searchRestaurants(longitude, latitude, keywords):
    params = {
        'longitude': longitude,
        'latitude': latitude,
        'radius': 15000,
        'term': keywords + ' ' + 'restaurants',
        'sort_by': 'rating',
        'limit': 50
    }
    response = requests.get(SEARCH_URL, params=params, headers=headers)
    response_array = response.json()["businesses"]
    parsed_array = []
    for restaurant in response_array:
        parsed_restaurant = parseRestaurant(restaurant)
        parsed_array.append(parsed_restaurant)
    return parsed_array

def filterSearchRestaurants(longitude, latitude, location, distance, cuisine, rating, price):
    params = {
        'term': 'restaurants',
        'sort_by': 'best_match',
        'limit': 50
    }
    if location: 
        params['location'] = location
    else: 
        params['longitude'] = longitude
        params['latitude'] = latitude
        params['radius'] = 15000
    if cuisine: 
        params['categories'] = cuisine
    response = requests.get(SEARCH_URL, params=params, headers=headers)
    response_array = response.json()["businesses"]
    parsed_array = []
    for restaurant in response_array:
        parsed_restaurant = parseRestaurant(restaurant)
        if distance and parsed_restaurant["distance"] > int(distance):
            continue
        if rating and parsed_restaurant["rating"] < int(rating):
            continue 
        if price and parsed_restaurant["price"] != price:
            continue
        parsed_array.append(parsed_restaurant)
    return parsed_array

def parseRestaurant(restaurant):
    parsed_restaurant = {
        "id": restaurant["id"],
        "image_url": restaurant["image_url"],
        "name": restaurant["name"],
        "rating": restaurant["rating"],
        "category": restaurant["categories"][0]["title"],
        "distance": round(restaurant["distance"] / 1000, 2)
    }
    if "price" in restaurant:
        parsed_restaurant["price"] = restaurant["price"]
    else: 
        parsed_restaurant["price"] = "N/A"
    return parsed_restaurant
    
def getRestaurantDetails(restaurant_id):
    response = requests.get(DETAILS_URL + restaurant_id)
    return response.json()