import re
import secrets
import bcrypt
import firebase_admin as fb
from dotenv import load_dotenv
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1.base_query import FieldFilter
from datetime import datetime 

load_dotenv("./services/secrets/.env")

cred = credentials.Certificate("./services/secrets/serviceAccountKey.json")
fb.initialize_app(cred)
db = firestore.client()

def createUser(username, email, password):
    user_id = secrets.token_hex(8)
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    data = {
        "username": username,
        "email": email,
        "hashed_password": hashed_password.decode("utf-8"),
    }
    db.collection("users").document(user_id).set(data)
    return user_id

def createProfile(user_id, name):
    data = {
        "name": name,
        "bio": "",
        "saved": [],
        "reviews": [],
        "recommendations": []
    }
    db.collection("profiles").document(user_id).set(data)

def validateUser(username, password):
    profiles_stream = db.collection("users").stream()
    for profile in profiles_stream:
        user_data = profile.to_dict()  # Convert snapshot to dict
        if user_data['username'] == username:
            user_id = profile.id
            hashed_password = user_data['hashed_password']
            # Check password
            if not bcrypt.checkpw(password.encode("UTF-8"), hashed_password.encode("UTF-8")):
                raise Exception("INVALID_PASSWORD")
            else:
                print("USER_ID: " + str(user_id))
                print("USER_DATA: " + str(user_data))
                return user_id
    else:
        raise Exception("USER_NOT_FOUND")
    
def saveRestaurant(user_id, restaurant_info):
    db.collection("profiles").document(user_id).update(
        {
            "saved": firestore.ArrayUnion([restaurant_info]),
        }
    )
    return True

def unsaveRestaurant(user_id, restaurant_id):
    doc_ref = db.collection("profiles").document(user_id)
    doc = doc_ref.get()
    saved_array = doc.to_dict().get("saved", [])
    for saved in saved_array:
        if saved["restaurant_id"] == restaurant_id:
            saved_array.remove(saved)
            break
    db.collection("profiles").document(user_id).update(
        {
            "saved": saved_array
        }
    )
    return True

def createReview(restaurant_id, name, image_url, user_id, rating, review, picture_id):
    restaurant_ref = db.collection('reviews').document(restaurant_id)
    reviews_ref = restaurant_ref.collection('user_reviews').document(user_id)
    db.collection('profiles').document(user_id).update(
        {
            'reviews': firestore.ArrayUnion([restaurant_id])
        }
    )
    if not restaurant_ref.get().exists:
        restaurant_ref.set({
            "restaurant_id": restaurant_id,
            "restaurant_name": name,
            "restaurant_image_url": image_url
        })
    reviews_ref.set({
        "rating": float(rating),
        "review": review,
        "picture_id": picture_id,
    })
    return True

def getAllReviews(restaurant_id):
    reviews_ref = db.collection('reviews').document(restaurant_id).collection('user_reviews')
    reviews = reviews_ref.get()
    return [{**review.to_dict(), 'user_id': review.id} for review in reviews]

def getUserInfo(user_id):
    user_ref = db.collection('profiles').document(user_id)
    user = user_ref.get()
    return user.to_dict()

def getSavedRestaurants(user_id):
    doc_ref = db.collection("profiles").document(user_id)
    doc = doc_ref.get()
    saved_array = doc.to_dict().get("saved", [])
    return saved_array

def getUserReviews(user_id):
    doc_ref = db.collection("profiles").document(user_id)
    doc = doc_ref.get()
    reviewed_restaurants = doc.to_dict().get("reviews", [])
    total_reviews = []
    for restaurant_id in reviewed_restaurants:
        reviews_ref = db.collection('reviews').document(restaurant_id).collection('user_reviews').document(user_id)
        review = reviews_ref.get().to_dict()  # Convert review document to a dictionary
        restaurant_ref = db.collection('reviews').document(restaurant_id)
        restaurant = restaurant_ref.get().to_dict()  # Convert restaurant document to a dictionary
        combined_data = {
            "restaurant": restaurant,
            "review": review
        }
        total_reviews.append(combined_data)
    return total_reviews

def editProfileInfo(user_id, data):
    db.collection("profiles").document(user_id).update(
        {
            "name": data["name"],
            "bio": data["bio"],
        }
    )
    return True

def getAllUsernames():
    users = db.collection("users").stream()
    usernames = []
    for doc in users:
        data = doc.to_dict()
        usernames.append(data['username'])
    return usernames

def getUserCreds(user_id):
    return db.collection("users").document(user_id).get().to_dict()

def getUserRecommendationStatus(user_id):
    user = db.collection("profiles").document(user_id).get().to_dict()
    if user['recommendations']:
        return True
    else:
        return False
    
def getSavedStatus(user_id, restaurant_id):
    doc_ref = db.collection("profiles").document(user_id)
    doc = doc_ref.get()
    saved_array = doc.to_dict().get("saved", [])
    for saved_restaurant in saved_array:
        if saved_restaurant['restaurant_id'] == restaurant_id:
            return True
    return False

def setRecommendations(user_id, json):
    db.collection("profiles").document(user_id).update(
        {
            "recommendations": json
        }
    )
    return True














# def setRecommendedStatus(user_id, status):
#     db.collection("profiles").document(user_id).update(
#         {
#             "rec_status": status
#         }
#     )
#     return True

# def getRecommendations(user_id):
#     profile = db.collection("profiles").document(user_id).get().to_dict()
#     return profile.get("recommendations")

# def getRecommendationStatus(user_id):
#     profile = db.collection("profiles").document(user_id).get().to_dict()
#     return profile.get("rec_status")

# def setRecommendations(user_id, json):
#     db.collection("profiles").document(user_id).update(
#         {
#             "recommendations": json
#         }
#     )
#     return True




























































    

