# ===== imports  =====
from firebase_admin import auth, credentials, firestore
import firebase_admin as fb

# ===== firebase authentication =====
cred = credentials.Certificate('./services/config/serviceAccountKey.json')
app = fb.initialize_app(cred)

# ===== functions =====
def createUser(display_name, email, password):
    user = auth.create_user(
        display_name = display_name,
        email = email,
        password = password,
        disabled = False)
        
    user_id = user.uid 
    createProfile(user_id)
    return user_id

def createProfile(user_id):
    db = firestore.client()
    data  = {
        "bio": '',
        "profile_pic": 'IMG_0000.png',
        "friends": [],
        "saved_restaurants": [],
    }
    db.collection("profiles").document(user_id).set(data)

def addRestaurant(user_id, place_id):
    db = firestore.client() 
    user_ref = db.collection("profiles").document(user_id)
    user_ref.update({ "saved_restaurants" : firestore.ArrayUnion([place_id])})
    return "Restaurant added sucessfully to list"





    

