# ===== imports  =====
from firebase_admin import auth, credentials, firestore
import firebase_admin as fb

# ===== firebase authentication =====
cred = credentials.Certificate('./services/secrets/serviceAccountKey.json')
app = fb.initialize_app(cred)

# ===== auth & profile initialization  =====
def createUser(display_name, username, email, password):
    db = firestore.client() 
    profiles = db.collection("profiles").where("username", "==", username).get()
    if len(profiles) > 0:
        raise Exception("Username already exists")
    user = auth.create_user(
        display_name = display_name,
        email = email,
        password = password,
        disabled = False
    )
    user_id = user.uid 
    print(user_id, username)
    createProfile(user_id, username)
    return user_id

def createProfile(user_id, username):
    db = firestore.client()
    data  = {
        "username": username,
        "bio": '',
        "profile_pic": 'IMG_0000.png',
        "friends": [],
        "wishlist": [],
        "visited": []
    }
    db.collection("profiles").document(user_id).set(data)

# ===== modify profile =====
def updateBio(user_id, bio):
    db = firestore.client()
    user_ref = db.collection("profiles").document(user_id)
    user_ref.update({ "bio": bio})
    return user_id

def updateUsername(user_id, username):
    db = firestore.client()
    profiles = db.collection("profiles").where("username", "==", username).get()
    if len(profiles) > 0:
        raise Exception("Username already exists")
    user_ref = db.collection("profiles").document(user_id)
    user_ref.update({ "username": username})
    return user_id

def saveToWishlist(user_id, place_id):
    db = firestore.client() 
    user_ref = db.collection("profiles").document(user_id)
    user_ref.update({ "wishlist" : firestore.ArrayUnion([place_id])})
    return user_id 

def saveToVisited(user_id, place_id):
    db = firestore.client() 
    user_ref = db.collection("profiles").document(user_id)
    user_ref.update({ "visited" : firestore.ArrayUnion([place_id])})
    return user_id 

# ===== retrieve profile information =====
def getWishlist(user_id):
    db = firestore.client() 
    data = db.collection("profiles").document(user_id).get().get("wishlist")
    return data 

def getVisited(user_id):
    db = firestore.client() 
    data = db.collection("profiles").document(user_id).get().get("visited")
    return data 

# ===== reviews =====
def addReview(user_id, place_id, review, rating):
    db = firestore.client()
    data = {
        "user_id": user_id,
        "place_id": place_id,
        "review": review,
        "rating": int(rating)
    }
    review_ref = db.collection("reviews").document()
    review_ref.set(data)
    return review_ref.id

def getAllReviews():
    db = firestore.client()
    docs = db.collection("reviews").get()
    doc_df = {}
    for doc in docs:
        doc_df[doc.id] = doc.to_dict()
    return doc_df