import numpy as np

class RestaurantRecommender:
    def __init__(self, num_users, num_restaurants):
        self.num_users = num_users
        self.num_restaurants = num_restaurants
        self.ratings_matrix = None
        self.average_ratings = None
        self.restaurant_popularity = None

    def create_ratings_matrix(self, ratings_data):
        if ratings_data.shape == (self.num_users, self.num_restaurants):
            self.ratings_matrix = ratings_data
        else:
            print("Invalid ratings data shape.")

    def calculate_average_ratings(self):
        if self.ratings_matrix is not None:
            self.average_ratings = np.mean(self.ratings_matrix, axis=0)
        else:
            print("Ratings matrix not available.")

    def calculate_restaurant_popularity(self):
        if self.ratings_matrix is not None:
            self.restaurant_popularity = np.sum(self.ratings_matrix > 0, axis=0)
        else:
            print("Ratings matrix not available.")

    def recommend_restaurant_group(self, diversity_factor=0.1, weight_rating=0.6, weight_popularity=0.4):
        if self.ratings_matrix is not None:
            scores = (weight_rating * self.average_ratings) + (weight_popularity * self.restaurant_popularity)
            diversity_scores = np.random.uniform(0, diversity_factor, len(scores))
            final_scores = scores + diversity_scores
            best_restaurant_index = np.argmax(final_scores)
            return best_restaurant_index
        else:
            print("Ratings matrix not available.")
            return None