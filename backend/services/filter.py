# ===== imports =====
from services.firebase import *
from services.search import *

# ===== functions =====
def pollFilter(user_id, user_location, q1, q2a, q2b, q3, q4, q5, q6, q7, q8, q9, q10):
    # ===== step 1 =====
    wishlist = getWishlist(user_id)
    visited = getVisited(user_id)
    detailed_array = []
    # option 1 => exploring new restaurants == true => search wishlist
    if q1 == True and wishlist:
        detailed_array = detailedPlaces(wishlist)
    # option 2 => exploring new restaurants == false => search visited
    elif q1 == False and visited:
        detailed_array = detailedPlaces(visited)

    # ===== step 2 =====
    # search restaurants that match poll filter near user
    search_array = searchRestaurants(user_location, "restaurant", 2000)
    # array with place_id's ONLY
    search_place_id_array = []
    for place_info in search_array:
        place_id = place_info["place_id"]
        search_place_id_array.append(place_id)
    # array with places details
    search_details_array = detailedPlaces(search_place_id_array)

    # ===== step 3 =====
    # simplify data to only have poll features
    valid_array = []
    search_valid_array = []
    # assigning q2 to correct price_level
    if q2a:
        q2 = [0,1,2]
    elif q2b:
        q2 = [3,4]
    if detailed_array:
        simplified_array = simplifyDetails(detailed_array)
        # cross check between poll & restaurant
        valid_array = userPollValidation(simplified_array, q2, q3, q4, q5, q6 , q7, q8, q9, q10)
    if search_details_array:
        search_simplified_array = simplifyDetails(search_details_array)
        search_valid_array = userPollValidation(search_simplified_array, q2, q3, q4, q5, q6, q7, q8, q9, q10)
    return valid_array, search_valid_array, detailed_array, search_details_array

# ===== helpers =====
def simplifyDetails(places_details):
    simplified_array = [] 
    for place in places_details:
        simplified_dict = {}
        result = place['result']
        simplified_dict['place_id'] = result['place_id']
        simplified_dict['q2'] = result.get('price_level')
        simplified_dict['q3'] = result.get('serves_wine')
        simplified_dict['q4'] = result.get('serves_beer')
        simplified_dict['q5'] = result.get('takeout')
        simplified_dict['q6'] = result.get('serves_vegetarian_food')
        simplified_dict['q7'] = result.get('serves_breakfast')
        simplified_dict['q8'] = result.get('serves_lunch')
        simplified_dict['q9'] = result.get('serves_dinner')
        simplified_dict['q10'] = result.get('reservable')
        simplified_array.append(simplified_dict)
    return simplified_array
    
def detailedPlaces(places_array):
    details_array = []
    for place_id in places_array:
        details = getRestaurantDetails(place_id)
        details_array.append(details)
    return details_array

def userPollValidation(simplified_array, q2, q3, q4, q5, q6, q7, q8, q9, q10):
    validRestaurants = []
    for place_info in simplified_array:
        valid = True
        place_id = place_info['place_id']
        if place_info.get('q2') not in q2:
            valid = False
        if place_info.get('q3') != q3:
            valid = False
        if place_info.get('q4') != q4:
            valid = False
        if place_info.get('q5') != q5:
            valid = False
        if place_info.get('q6') != q6:
            valid = False
        if place_info.get('q7') != q7:
            valid = False
        if place_info.get('q8') != q8:
            valid = False
        if place_info.get('q9') != q9:
            valid = False
        if place_info.get('q10') != q10:
            valid = False
        if valid:
            validRestaurants.append(place_id)
    return validRestaurants