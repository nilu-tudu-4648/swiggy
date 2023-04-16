// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD78WxEGCC2_Iq6TaKZ8BspgbUa20m7ELA",
  authDomain: "swiggy-e41ec.firebaseapp.com",
  projectId: "swiggy-e41ec",
  storageBucket: "swiggy-e41ec.appspot.com",
  messagingSenderId: "120101911428",
  appId: "1:120101911428:web:d8a34bc738b43cd2f53bd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });;