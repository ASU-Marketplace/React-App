import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAyEP-kjqYm84_oixqlwXJXChTyNa0U4m4",
  authDomain: "asu-marketplace-app.firebaseapp.com",
  projectId: "asu-marketplace-app",
  storageBucket: "asu-marketplace-app.appspot.com",
  messagingSenderId: "29170011023",
  appId: "1:29170011023:web:2385558d6b4112fc1bd9fa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };