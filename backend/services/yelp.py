# ===== imports =====
from dotenv import load_dotenv
from datetime import datetime
import requests
import os
import json

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
    
def getRestaurantDetails(restaurant_id, current_day):
    response = requests.get(DETAILS_URL + restaurant_id, headers=headers)
    response_json = response.json()
    restaurant_info = {
        "id": response_json["id"],
        "name": response_json["name"],
        "rating": response_json["rating"],
        "latitude": response_json["coordinates"]["latitude"],
        "longitude": response_json["coordinates"]["longitude"],
        "address": response_json["location"]["address1"],
        "city": response_json["location"]["city"],
        "state": response_json["location"]["state"],
        "imageURL": response_json["image_url"],
        "hours_na": True,
        "hours_24": False
    }
    if 'hours' in response_json and 'open' in response_json["hours"][0]:
        print("HOURS EXIST")
        restaurant_info["hours_na"] = False
        restaurant_info["open"] = response_json["hours"][0]["is_open_now"]
        hours_open_array = response_json["hours"][0]["open"]
        for day in hours_open_array:
            print("SEARCHING FOR MATCHING DAY")
            if day["day"] == current_day:
                print("MATCHING DAY FOUND")
                start_time = day["start"]
                end_time = day["end"]
                start_datetime = datetime.strptime(start_time, "%H%M")
                end_datetime = datetime.strptime(end_time, "%H%M")
                restaurant_info["startTime"] = start_datetime.strftime("%I:%M %p")
                restaurant_info["endTime"] = end_datetime.strftime("%I:%M %p")
                if restaurant_info["startTime"] == "12:00 AM" and restaurant_info["endTime"] == "12:00 AM":
                    restaurant_info["hours_24"] = True
    print(restaurant_info)
    return restaurant_info

