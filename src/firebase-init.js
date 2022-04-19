// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjAWGty1YBVsrqQppZMqt8QT6Tc2gU6-g",
  authDomain: "ema-jhon-firebase-889d7.firebaseapp.com",
  projectId: "ema-jhon-firebase-889d7",
  storageBucket: "ema-jhon-firebase-889d7.appspot.com",
  messagingSenderId: "82542834",
  appId: "1:82542834:web:9a9565f014f62f870fd06b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
