from services.RestaurantRecommender import RestaurantRecommender
from services.database import *
from services.yelp import *
from haversine import haversine, Unit
import random

recommender = RestaurantRecommender()

recommender.load_processed_training_dataset('services/data/PROCESSED_TRAINING_DATASET.csv')
recommender.load_model('services/models/VANCOUVER_KNN_MODEL')

def recommendUser(user_id, latitude, longitude, current_day):
    current_user_info = getDetailedUserInfo(user_id)
    current_user_info["id"] = user_id
    reviewed_restaurant_ids = current_user_info["reviews"]
    review_details = []
    for review_id in reviewed_restaurant_ids:
        review_detail = getUserReviews(review_id, user_id)
        review_details.append(review_detail)
    print(review_details)
    hash_map = {}
    for review in review_details:
        hash_map[review['restaurant_id']] = review['created_at']
    # sort by date then subset that list
    sorted_by_date = sorted(hash_map.items(), key=lambda item: item[1])
    sorted_by_date.reverse()
    print(sorted_by_date)
    # subset the list into 50% of the most recent 
    num_elements = int(len(sorted_by_date) * 0.5)
    if num_elements == 0:
        num_elements = 1
    print(num_elements)
    most_recent_reviews = sorted_by_date[:num_elements]
    print(most_recent_reviews)
    hash_map_array = []
    for review in most_recent_reviews:
        restaurant_id = review[0]
        for review in review_details:
            if review['restaurant_id'] == restaurant_id:
                hash_map_node = {
                    "restaurant_id": review['restaurant_id'],
                    "rating": review['rating'],
                    "created_at": review['created_at']
                }
                hash_map_array.append(hash_map_node)
    sorted_array = sorted(hash_map_array, key=lambda x: x['rating'])
    sorted_array.reverse()
    if len(sorted_array) > 0:
        top_1 = sorted_array[0]
    if len(sorted_array) > 1:
        top_2 = sorted_array[1]
    top_1_id = top_1['restaurant_id']
    top_2_id = top_2['restaurant_id']
    print(top_1_id, top_2_id)
    top_1_json = getRestaurantDetailsFull(top_1_id)
    top_2_json = getRestaurantDetailsFull(top_2_id)
    top_1_processed = recommender.preprocess_target(top_1_json)
    top_2_processed = recommender.preprocess_target(top_2_json)
    top_1_rec = recommender.recommend(top_1_processed)
    top_2_rec = recommender.recommend(top_2_processed)
    top_1_rec_id_only = list(top_1_rec['id'])
    top_2_rec_id_only = list(top_2_rec['id'])
    mixed = top_1_rec_id_only + top_2_rec_id_only
    random.shuffle(mixed)
    print(len(mixed))
    total_json = {"restaurants": []} 
    user_location = {latitude, longitude}
    for restaurant_id in mixed:
        restaurant_json = getRestaurantDetails(restaurant_id, current_day)
        restaurant_location = (restaurant_json["latitude"], restaurant_json["longitude"])
        parsed_restaurant = {
            "category": restaurant_json["category"],
            "city": restaurant_json["city"],
            "distance": round(haversine(restaurant_location, user_location), 2),
            "id": restaurant_json["id"],
            "image_url": restaurant_json["image_url"],
            "name": restaurant_json["name"],
            "rating": restaurant_json["rating"],
        }
        if "price" in restaurant_json:
            parsed_restaurant["price"] = restaurant_json["price"]
        total_json["restaurants"].append(parsed_restaurant)
    return total_json
