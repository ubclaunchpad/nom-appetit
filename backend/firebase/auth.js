// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOaRSYHEqMT-RSlcJAVi2_VfQht3RGauo",
  authDomain: "nom-appetit.firebaseapp.com",
  projectId: "nom-appetit",
  storageBucket: "nom-appetit.appspot.com",
  messagingSenderId: "324265854401",
  appId: "1:324265854401:web:95c2e824f6c1dcaa479b40",
  measurementId: "G-25M7KZREHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };