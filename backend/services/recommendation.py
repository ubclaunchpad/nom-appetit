from services.RestaurantRecommender import RestaurantRecommender
from services.yelp import *

recommender = RestaurantRecommender()

def initializeRecommender():
    recommender.load_processed_training_dataset('services/data/PROCESSED_TRAINING_DATASET.csv')
    recommender.load_model('services/models/VANCOUVER_KNN_MODEL')
    return True

def recommend(user_id):
    









    restaurant_detailed = getRestaurantDetailsRaw(restaurant_id)
    preprocess_target = recommender.preprocess_target(restaurant_detailed)
    recommendation = recommender.recommend(preprocess_target)
    return recommendation


