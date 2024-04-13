// ===== imports  =====
import admin from "firebase-admin";
import { FieldValue } from 'firebase-admin/firestore';
import serviceAccount from "./config/serviceAccountKey.json" assert { type: 'json' };

// ===== api authentication =====
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// ===== functions =====
export async function createUser(name, email, password) {
  try {
    const userRecord = await admin.auth().createUser({
      displayName: name,
      email: email,
      password: password
    });
    createProfile(userRecord.uid)
    return userRecord.uid;

  } catch (error) {
    throw new Error(error.message);
  }
}

async function createProfile(user_id) {
  try {
    const db = admin.firestore();
    const data = {
      bio: '',
      profile_pic: 'IMG_0000.png',
      friends: [],
      saved_restaurants: [],
    };
    await db.collection('profiles').doc(user_id).set(data);

  } catch (error) {
    throw new Error(error.message);
  }
}

export async function saveRestaurant(place_id, user_id) {
    try {
      const db = admin.firestore();
      const userRef = db.collection('profiles').doc(user_id);
      await userRef.update({
        saved_restaurants: FieldValue.arrayUnion(place_id)
      });
  
    } catch (error) {
      throw new Error(error.message);
    }
}

export async function addReview(place_id, user_id, review, rating) {
    try {
      const db = admin.firestore();
      const data = {
        place_id: place_id,
        user_id: user_id,
        review: review,
        rating: rating
      };
      await db.collection('reviews').doc().set(data);
  
    } catch (error) {
      throw new Error(error.message);
    }
}


  




