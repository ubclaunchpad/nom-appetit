import re
import secrets

import bcrypt
import firebase_admin as fb
from dotenv import load_dotenv
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1.base_query import FieldFilter

load_dotenv("./services/secrets/.env")

cred = credentials.Certificate("./services/secrets/serviceAccountKey.json")
fb.initialize_app(cred)
db = firestore.client()


def createUser(name, email, password):
    emailValidation(email)
    passwordValidation(password)
    user_id = secrets.token_hex(8)
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    data = {
        "name": name,
        "email": email,
        "hashed_password": hashed_password.decode("utf-8"),
    }
    db.collection("users").document(user_id).set(data)
    return user_id


def emailValidation(email):
    # checking if email is valid
    regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b"
    if not re.fullmatch(regex, email):
        raise Exception("EMAIL_INVALID")
    # checking if email already exists
    total_users = db.collection("users").stream()
    total_emails = [user.get("email") for user in total_users]
    if email in total_emails:
        raise Exception("EMAIL_EXISTS")


def passwordValidation(password):
    if len(password) < 8:
        raise Exception("PASSWORD_TOO_SHORT")


def createProfile(user_id, username):
    usernameValidation(username)
    data = {
        "username": username,
        "bio": "",
        "saved": [],
        "reviews": [],
    }
    db.collection("profiles").document(user_id).set(data)


def usernameValidation(username):
    total_profiles = db.collection("profiles").stream()
    total_usernames = [profile.get("username") for profile in total_profiles]
    if username in total_usernames:
        raise Exception("USERNAME_EXISTS")


def validateUser(username, password):
    profiles = list(
        db.collection("profiles")
        .where(filter=FieldFilter("username", "==", username))
        .stream()
    )
    # check if user exists
    if not profiles:
        raise Exception("USER_NOT_FOUND")
    user_id = profiles[0].id
    user_profile = profiles[0].to_dict()
    user_users = db.collection("users").document(user_id).get().to_dict()
    hashed_password = user_users.get("hashed_password")
    # check if password is correct
    if not bcrypt.checkpw(password.encode("UTF-8"), hashed_password.encode("UTF-8")):
        raise Exception("INVALID_PASSWORD")
    # print statements
    print("USER_ID: " + str(user_id))
    print("USER_PROFILE: " + str(user_profile))
    print("HASHED_PASSWORD: " + hashed_password)
    print(
        "CORRECT_PASSWORD: "
        + str(bcrypt.checkpw(password.encode("UTF-8"), hashed_password.encode("UTF-8")))
    )
    return user_id


def getUserInfo(user_id):
    user = db.collection("users").document(user_id).get().to_dict()
    if not user:
        raise Exception("USER_NOT_FOUND")
    return user


def getProfileInfo(user_id):
    profile = db.collection("profiles").document(user_id).get().to_dict()
    if not profile:
        raise Exception("PROFILE_NOT_FOUND")
    return profile


def getDetailedUserInfo(user_id):
    user_info = getUserInfo(user_id)
    profile_info = getProfileInfo(user_id)
    detailed_info = {
        "name": user_info["name"],
        "email": user_info["email"],
        "username": profile_info["username"],
        "bio": profile_info["bio"],
        "reviews": profile_info["reviews"],
        "review_total": len(profile_info["reviews"]),
        "saved": profile_info["saved"],
        "saved_total": len(profile_info["saved"]),
    }
    return detailed_info


def getReviews(restaurant_id):
    total_reviews_array = []
    total_reviews = db.collection("reviews").stream()
    for review in total_reviews:
        review_data = review.to_dict()
        review_data["review_id"] = review.id
        if review_data.get("restaurant_id") == restaurant_id:
            total_reviews_array.append(review_data)
    return total_reviews_array


def getUserReviews(restaurant_id, user_id):
    reviews_list = getReviews(restaurant_id)
    for review in reviews_list:
        if review.get("user_id") == user_id:
            return review
    return None


def editProfileInfo(user_id, data):
    db.collection("users").document(user_id).update({"name": data["name"]})
    db.collection("profiles").document(user_id).update(
        {
            "bio": data["bio"],
            "username": data["username"],
        }
    )
    return True


def createReview(review_id, restaurant_id, user_id, rating, review):
    if rating < 0 or rating > 5:
        raise Exception("INVALID_RATING")
    user_profile = db.collection("profiles").document(user_id).get().to_dict()
    saved_reviews_array = user_profile.get("reviews")
    for saved_review in saved_reviews_array:
        if saved_review == restaurant_id:
            raise Exception("REVIEW_EXISTS")
    else:
        data = {
            "rating": float(rating),
            "review": review,
            "restaurant_id": restaurant_id,
            "user_id": user_id,
        }
        print(data)
        db.collection("reviews").document(review_id).set(data)
        db.collection("profiles").document(user_id).update(
            {
                "reviews": firestore.ArrayUnion([restaurant_id]),
            }
        )
        return review_id


def saveRestaurant(user_id, restaurant_id):
    db.collection("profiles").document(user_id).update(
        {
            "saved": firestore.ArrayUnion([restaurant_id]),
        }
    )
    return True


def unsaveRestaurant(user_id, restaurant_id):
    db.collection("profiles").document(user_id).update(
        {
            "saved": firestore.ArrayRemove([restaurant_id]),
        }
    )
    return True


def getSavedRestaurants(user_id):
    profile = db.collection("profiles").document(user_id).get().to_dict()
    return profile.get("saved")
