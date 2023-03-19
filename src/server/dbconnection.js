import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import useStyles from "../components/products/styles";
import React from "react";
import { doc, getDoc, setDoc, deleteField } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyAyEP-kjqYm84_oixqlwXJXChTyNa0U4m4",

  authDomain: "asu-marketplace-app.firebaseapp.com",

  projectId: "asu-marketplace-app",

  storageBucket: "asu-marketplace-app.appspot.com",

  messagingSenderId: "29170011023",

  appId: "1:29170011023:web:2385558d6b4112fc1bd9fa"

};


// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

export const addToCartDB = async (collection, value) => {
    db.collection(collection).add({
        "Current Cart": value
      })
      .catch(function (error) {
        alert("Error writing Value: " + error);
      }); 
};

export const getValue = async (collection, key) => {
  const docRef = doc(db, collection, key);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    alert("Document Data:", docSnap.data);
  } else {
    alert("No Such Document!");
  }
}