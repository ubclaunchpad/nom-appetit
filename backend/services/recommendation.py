from services.RestaurantRecommender import RestaurantRecommender
from services.database import *
from services.yelp import *
import pandas as pd
import random

recommender = RestaurantRecommender()

recommender.load_processed_training_dataset('services/data/PROCESSED_TRAINING_DATASET.csv')
recommender.load_model('services/models/VANCOUVER_KNN_MODEL')

def recommendUser(user_id, refresh_request):
    # get user reviews
    review_details = getUserReviews(user_id)
    # if there exists less than 3 reviews => bad
    if len(review_details) < 3:
        raise Exception("NOT_ENOUGH_REVIEWS")
    user_info = getUserInfo(user_id)
    # recomemndations exist => throw that
    if user_info['recommendations']:
        return user_info['recommendations']
    # if there exists recommendations and refresh request is not true => bad
    if user_info['recommendations'] and not refresh_request:
        return user_info['recommendations'] 
    # refresh request
    if user_info['recommendations'] and refresh_request:
        # Sort review details by rating in descending order
        sorted_review_details = sorted(review_details, key=lambda x: x['review']['rating'], reverse=True)
        # Extract top reviews safely
        top_1 = sorted_review_details[0]
        top_2 = sorted_review_details[1]
        top_3 = sorted_review_details[2]
        # Get restaurant IDs
        top_1_id = top_1['restaurant']['restaurant_id']
        top_2_id = top_2['restaurant']['restaurant_id']
        top_3_id = top_3['restaurant']['restaurant_id']
        # Get restaurant details without parsing
        top_1_rec = getRestaurantDetailsWithoutParse(top_1_id)
        top_2_rec = getRestaurantDetailsWithoutParse(top_2_id)
        top_3_rec = getRestaurantDetailsWithoutParse(top_3_id)
        # Preprocess restaurant details
        top_1_processed = recommender.preprocess_target(top_1_rec)
        top_2_processed = recommender.preprocess_target(top_2_rec)
        top_3_processed = recommender.preprocess_target(top_3_rec)
        # Get recommendations
        top_1_recommendation = recommender.recommend(top_1_processed)
        top_2_recommendation = recommender.recommend(top_2_processed)
        top_3_recommendation = recommender.recommend(top_3_processed)
        mixed = pd.concat([top_1_recommendation, top_2_recommendation, top_3_recommendation], ignore_index=True)
        # Shuffle mixed recommendations
        mixed = mixed.sample(frac=1).reset_index(drop=True)  # Shuffle DataFrame
        print("Mixed Recommendations After Shuffle:")
        print(mixed)
        mixed_ids = mixed['id'].tolist() 
        total_array = []
        for id in mixed_ids:
            restaurant_json = getRestaurantDetails(id, user_id)
            total_array.append(restaurant_json)
        setRecommendations(user_id, total_array)
        return total_array
