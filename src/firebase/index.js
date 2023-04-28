// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj8XVeLDpTZNDOn4qGX2edl_4ATtIYnS0",
  authDomain: "auth-act-4571b.firebaseapp.com",
  projectId: "auth-act-4571b",
  storageBucket: "auth-act-4571b.appspot.com",
  messagingSenderId: "852254304897",
  appId: "1:852254304897:web:8d04cd76e6d8842abb7b80",
  measurementId: "G-T3PSKLEB36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { db };