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
    updateDoc,
    doc,
    DocumentReference
} from "firebase/firestore";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export function ProductListing() {
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [condition, setCondition] = useState("");
    const [category, setCategory] = useState("");
    const [campus, setCampus] = useState("");
    const [user, setUser] = useState([]);
    const categoryOptions = ["","Clothing", "Education", "Decor", 
                            "Furniture","Other","Technology"];
    const conditonOptions = ["","Poor", "Fair", "Used but Good", "Good", "Great", "Unused"];
    const campusOptions = ["","Tempe", "Polytechnic", "West", "Downtown"];
    const [isErrorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [prodId, setProdId] = useState("");

    var productId = null;

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

      const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    const addToListingsDB = async (e) => {
        e.preventDefault();  
        try {
            await addProducts();
            await updateProducts();
            setOpen(true);
            setErrorVisible(true);
            setErrorMessage("Product listed successfully!");
            refreshPage();
        } catch (err) {
            setOpen(true);
            setErrorVisible(true);
            setErrorMessage("Error: " + err.message);
            console.log(err.message);              
        }          
    }
                     

    const addProducts = async() => { 
        if (condition != "" || category != "" || campus != ""){
            try {
                   const docRef =  await addDoc(collection(db, "listings"), {
                        product : {
                            "id": "",
                            "description": description,
                            "image": imageURL,
                            "name": name,
                            "price": price,
                            "poster": user.email,
                            "condition": condition,
                            "category": category,
                            "campus": campus
                        },
                    });
                    //console.log("written to db with id : " + docRef.id);  
                    productId = docRef.id;
                    //console.log('product id is now ' + productId);                              
                } catch (err) {
                        setOpen(true);
                        setErrorVisible(true);
                        setErrorMessage("Error: " + err.message);
                        console.log(err.message);
                }                
        }   else {
            setOpen(true);
            setErrorVisible(true);
            setErrorMessage("Please fill all form inputs!");           
        }
      }

      const updateProducts = async () => {
        //console.log("id : " + productId);
        try {
            await updateDoc(doc(db, "listings", productId), {
                "product.id": productId
            });
        } catch (err) {            
            setOpen(true);
            setErrorVisible(true);
            setErrorMessage("Error: " + err.message);
            console.log(err.message);
        }
        
      }

      const refreshPage = () => {
        setName("");
        setDesc("");
        setPrice("");
        setImageURL("");
        setCondition("");
        setCampus("");
        setCategory("");
      }
      

    return (
        <>
        <div className="create-listing-container">
            <h2>List a Product:</h2>
            <div className="form-group">
                <label htmlFor="itemName">Item Name:</label>
                <input
                    required
                    className="textInput"
                    id="itemName"
                    placeholder="ASU Sweatshirt"
                    type="text"
                    value={name}
                    onChange={(edit) => setName(edit.target.value)}
                    disabled={user == null}
                />
            </div>

            <div className="form-group">
                <label htmlFor="itemCateory">Item Category:</label>
                <select
                    required
                    className="categorySelect"
                    id="category"
                    value={category}
                    onChange={(edit) => setCategory(edit.target.value)}
                >
                    {categoryOptions.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="itemCondition">Item Condition:</label>
               <select
                    required
                    className="conditionSelect"
                    id="condition"
                    value={condition}
                    onChange={(edit) => setCondition(edit.target.value)}
                >
                    {conditonOptions.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="description">Item Description: </label>
                <input
                    required
                    className="textInput"
                    id="description"
                    placeholder="Enter a description of your item"
                    type="text"
                    value={description}
                    onChange={(edit) => setDesc(edit.target.value)}
                    disabled={user == null}
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Item Price: </label>
                <input
                    required
                    className="textInput"
                    id="price"
                    type="text"
                    placeholder="$25.00"
                    value={price}
                    onChange={(edit) => setPrice(edit.target.value)}
                    disabled={user == null}
                />
            </div>

            <div className="form-group">
                <label htmlFor="campus">ASU Campus Location: </label>
                <select
                className="campusSelect"
                id="campus"
                value={campus}  
                onChange={(edit) => setCampus(edit.target.value)}>

                {campusOptions.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    ))}

                </select>
            </div>

            <div className="form-group">
                <label htmlFor="imageURL">Image Link: </label>
                <input
                    required
                    className="textInput"
                    id="imageURL"
                    type="text"
                    placeholder="Enter a link to your image"
                    value={imageURL}
                    onChange={(edit) => setImageURL(edit.target.value)}
                    disabled={user == null}
                />
            </div>

            <div className="form-group">
                {
                    <button className="btn-save" onClick={addToListingsDB}>
                        Post!
                    </button>}
            </div>    
        </div>
              {isErrorVisible && <Snackbar open={open} message={errorMessage} onClose={handleClose} autoHideDuration={6000} action={action}/>}
        </>          
    );
    
}