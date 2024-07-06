# ===== imports =====
from services.firebase import *
from services.search import *

# ===== functions =====
def pollFilter(user_id, user_location, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10):
    # ===== Q1 =====
    wishlist = getWishlist(user_id)
    visited = getVisited(user_id)
    # option 1: true => search wishlist
    if q1 and wishlist:
        detailed_array = placeDetails(wishlist)
        method = "wishlist"
    # option 2: false => search visited
    elif visited:
        detailed_array = placeDetails(visited)
        method = "visited"
    # option 3: else => search nearby restaurants
    else:
        search_array = searchRestaurants(user_location, "restaurant", 2000)
        search_place_id_array = []
        for place_info in search_array:
            place_id = place_info["place_id"]
            search_place_id_array.append(place_id)
        detailed_array = placeDetails(search_place_id_array)
        method = "search"

    # ===== Q2 =====
    # option 1: true => search cheap
    if q2:
        q2_options = [0,1,2]
    # option 2: false => search cheap
    elif q2:
        q2_options = [3,4]

    # ===== TOTAL =====
    # check between poll & restaurant
    simplified_array = simplifyDetails(detailed_array)
    valid_array = userPollValidation(simplified_array, q2_options, q3, q4, q5, q6, q7, q8, q9, q10)

    return method, detailed_array, valid_array

# ===== helpers =====
def simplifyDetails(places_details):
    simplified_array = []
    for place in places_details:
        result = place.get("result")
        simplified_dict = {
            "place_id": result.get("place_id"),
            "q2": result.get("price_level"),
            "q3": result.get("serves_wine"),
            "q4": result.get("serves_beer"),
            "q5": result.get("takeout"),
            "q6": result.get("serves_vegetarian_food"),
            "q7": result.get("serves_breakfast"),
            "q8": result.get("serves_lunch"),
            "q9": result.get("serves_dinner"),
            "q10": result.get("reservable")
        }
        simplified_array.append(simplified_dict)
    return simplified_array

def placeDetails(places_array):
    details_array = []
    for place_id in places_array:
        details = getRestaurantDetails(place_id)
        details_array.append(details)
    return details_array

def userPollValidation(simplified_array, q2, q3, q4, q5, q6, q7, q8, q9, q10):
    valid_array = []
    for place_info in simplified_array:
        place_id = place_info.get('place_id')
        keys_to_check = ['q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10']
        values_to_check = [q3, q4, q5, q6, q7, q8, q9, q10]
        # checks if conditions are met 
        all_conditions_met = all(place_info.get(key) == value for key, value in zip(keys_to_check, values_to_check))
        # checks the special case for q2
        q2_condition_met = place_info.get('q2') in q2
        if q2_condition_met and all_conditions_met:
            valid_array.append(place_id)
    return valid_array