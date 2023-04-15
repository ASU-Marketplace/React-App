import React, { useState } from "react";
import "./styles.css"
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from 'firebase/auth';
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    getDocs,
} from "firebase/firestore";

export function ProductListing(){
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [user, setUser] = useState([]);

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log("set " + user.email + " to " + currentUser.email);
    })

    const addToListingsDB = async (e) => {
        e.preventDefault();  
       
        try {
            const docRef = await addDoc(collection(db, "listings"), {
              product : {
                "description": description,
                "image": imageURL,
                "name": name,
                "price": price,
                "poster": user.email
              },
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
      }

    return (
        <div className="create-listing-container">
            <div className="form-group">
                <label htmlFor="itemName">Item Name:</label>
                <input
                    className="textInput"
                    id="itemName"
                    type="text"
                    value={name}
                    onChange={(edit) => setName(edit.target.value)}
                    disabled={user == null}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Item Description: </label>
                <input
                    className="textInput"
                    id="description"
                    type="text"
                    value={description}
                    onChange={(edit) => setDesc(edit.target.value)}
                    disabled={user == null}
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Item Price: </label>
                <input
                    className="textInput"
                    id="price"
                    type="text"
                    value={price}
                    onChange={(edit) => setPrice(edit.target.value)}
                    disabled={user == null}
                />
            </div>

            <div className="form-group">
                <label htmlFor="imageURL">Image Link: </label>
                <input
                    className="textInput"
                    id="imageURL"
                    type="text"
                    value={imageURL}
                    onChange={(edit) => setImageURL(edit.target.value)}
                    disabled={user == null}
                />
            </div>

            <div className="form-group">
                {
                    <button className="btn-save" onClick={addToListingsDB} disabled={description == "" || imageURL == "" || name == "" || price == ""}>
                        Save
                    </button>}
            </div>    
        </div>
        
    );
}