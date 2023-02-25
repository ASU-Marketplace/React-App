import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import useStyles from "../components/products/styles";
import React from "react";



// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

export const addValue = () => {
  //alert("GETTING HERE");
  db.collection("values")
      .doc("value")
      .set({
        value: "testing",
      })
      .then(function () {
        alert("Value successfully written!");
      })
      .catch(function (error) {
        alert("Error writing Value: " + error);
      });
};