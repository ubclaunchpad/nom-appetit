import unittest
from recommender_module import RestaurantRecommender
import numpy as np

class TestRestaurantRecommender(unittest.TestCase):
    def setUp(self):
        self.num_users = 4
        self.num_restaurants = 5

        self.ratings_data = np.array([
            [4, 0, 0, 3, 0],
            [0, 0, 5, 0, 2],
            [3, 0, 0, 4, 0],
            [0, 2, 0, 0, 5],
        ])

        self.recommender = RestaurantRecommender(self.num_users, self.num_restaurants)

    def test_create_ratings_matrix(self):
        self.recommender.create_ratings_matrix(self.ratings_data)
        self.assertIsNotNone(self.recommender.ratings_matrix)
        self.assertEqual(self.recommender.ratings_matrix.shape, (self.num_users, self.num_restaurants))

    def test_calculate_average_ratings(self):
        self.recommender.create_ratings_matrix(self.ratings_data)
        self.recommender.calculate_average_ratings()
        self.assertIsNotNone(self.recommender.average_ratings)
        self.assertEqual(len(self.recommender.average_ratings), self.num_restaurants)

    def test_calculate_restaurant_popularity(self):
        self.recommender.create_ratings_matrix(self.ratings_data)
        self.recommender.calculate_restaurant_popularity()
        self.assertIsNotNone(self.recommender.restaurant_popularity)
        self.assertEqual(len(self.recommender.restaurant_popularity), self.num_restaurants)

    def test_recommendation(self):
        self.recommender.create_ratings_matrix(self.ratings_data)
        self.recommender.calculate_average_ratings()
        self.recommender.calculate_restaurant_popularity()

        recommended_restaurant = self.recommender.recommend_restaurant_group(diversity_factor=0.1)
        self.assertIsNotNone(recommended_restaurant)
        self.assertGreaterEqual(recommended_restaurant, 0)
        self.assertLess(recommended_restaurant, self.num_restaurants)

if __name__ == '__main__':
    unittest.main()