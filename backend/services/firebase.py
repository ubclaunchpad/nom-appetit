# ===== imports  =====
from firebase_admin import auth, credentials, firestore
import firebase_admin as fb

# ===== firebase config =====
cred = credentials.Certificate('./services/secrets/serviceAccountKey.json')
app = fb.initialize_app(cred)
db = firestore.client()

# ===== account & profile initialization  =====
def createUser(display_name, username, email, password):
    unqiueUsername(username)
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

def unqiueUsername(username):
    total_profiles = db.collection('profiles').stream()
    total_usernames = [profile.to_dict().get('username') for profile in total_profiles]
    if username in total_usernames:
        raise Exception("Username already exists")

def createProfile(user_id, username):
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
    user_ref = db.collection("profiles").document(user_id)
    user_ref.update({ "bio": bio })
    return user_id

def updateUsername(user_id, username):
    unqiueUsername(username)
    user_ref = db.collection("profiles").document(user_id)
    user_ref.update({ "username": username })
    return user_id

def saveToWishlist(user_id, place_id):
    user_ref = db.collection("profiles").document(user_id)
    user_ref.update({ "wishlist" : firestore.ArrayUnion([place_id])})
    return user_id 

def saveToVisited(user_id, place_id):
    user_ref = db.collection("profiles").document(user_id)
    user_ref.update({ "visited" : firestore.ArrayUnion([place_id])})
    return user_id 

# ===== retrieve profile information =====
def getWishlist(user_id):
    data = db.collection("profiles").document(user_id).get().get("wishlist")
    return data 

def getVisited(user_id):
    data = db.collection("profiles").document(user_id).get().get("visited")
    return data 

# ===== reviews =====
def addReview(user_id, place_id, review, rating):
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
    docs = db.collection("reviews").get()
    doc_df = {}
    for doc in docs:
        doc_df[doc.id] = doc.to_dict()
    return doc_df