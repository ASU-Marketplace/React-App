import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./example.css"
import { doc, getDoc, getDocs, query, where, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {Typography} from '@material-ui/core';

 export function ExampleListings() {
  const collectionName = "listings";
  let  { id } = useParams();
  const [productName, setProductName] = useState([]);
  const [listedBy, setListedBy] = useState([]);
  const [listedDisplayName, setListedDisplayName] = useState([]);
  const [productImg, setProductImg] = useState([]);
  const [productCond, setProductCond] = useState([]);
  const [productCate, setProductCate] = useState([]);
  const [campus, setCampus] = useState([]);
  const [price, setPrice] = useState([]);
  const [productDesc, setProductDesc] = useState([]);
  const [user, setUser] = useState([]);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })
  //console.log("current id " + id);

  const getDisplayName = async () => {
    try {
      
      const q = query(collection(db, "users"), where("email", "==", listedBy) )
      const userListed = await(getDocs(q));
      userListed.forEach((doc) => {
        setListedDisplayName(doc.data().displayName);
        //console.log(listedDisplayName);
      });
    } catch(e) {
      console.log(e.message);
    }
    return listedDisplayName;
  }

  useEffect(
    () => {
        async function test() {
            const currentProdDoc = await getDoc(doc(db, collectionName, id));
            if (currentProdDoc.exists()){
              //console.log("Document Data: ", currentProdDoc.data());
              setProductName(currentProdDoc.data().product.name);
              setListedBy(currentProdDoc.data().product.poster);
              setProductImg(currentProdDoc.data().product.image);
              setProductDesc(currentProdDoc.data().product.description);
              setProductCond(currentProdDoc.data().product.condition);
              setProductCate(currentProdDoc.data().product.category);
              setCampus(currentProdDoc.data().product.campus);
              setPrice(currentProdDoc.data().product.price);
            } else {
              // docSnap.data() will be undefined in this case
              console.log("Product not found!");
            }
        }
        test();
    }, [user]
  )


  //this page is just an example of what a listing would look like
  const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1750);
    };  

    const handleClose = () => {
        setOpen(false);
    };
  return (
    <div className='example-container'>
    <h1>Item name: {productName} </h1>
    <h3>Listed by: {listedBy} </h3>
    <div>
      <img src={productImg} alt="product image"/>
    </div>
    <h2>Item condition: {productCond}</h2>
    <h2>Item category: {productCate}</h2>
    <h2>Campus available: {campus}</h2>
    <h2>Item description: </h2>
    <p>{productDesc}</p>
    <h2>Listing Price: {price}</h2>
    <div className="btn-container">
      <Link to="/chat">
        <button>Chat with seller</button>
      </Link>
      <Link 
      aria-label="Report Listing"
      onClick={(event) => {
        event.preventDefault();
        handleClickOpen();
      }}>
        <button>Report listing</button>
      </Link>
      </div>
      <div className="btn-container">
      <Link to="/">
          <button className = "home-button">Back to home</button>
        </Link>
        </div>

        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Typography>Thanks! This Listing has been Reported</Typography>
            </DialogContent>
            <DialogActions>
            </DialogActions>
          </Dialog>
    </div>
  );
}

export default ExampleListings;