import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import { AddShoppingCart, Flag } from '@material-ui/icons'

import useStyles from './styles';
//import { addToCartDB, addValue, getValue } from '../../server/dbconnection';
import { db, auth } from "../../firebase";
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';


const Product = ({ product }) => {
    const classes = useStyles();
    const [cart, setCart] = useState([]);

  const [user, setUser] = useState([]);


  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    console.log("set " + user.email + " to " + currentUser.email);
  })

  useEffect(()=>{
      if (user != null) {
        fetchCart();
        console.log("refreshing cart");
      }
  }, [])

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const addToCartDB_TEST = async (e) => {
    e.preventDefault();  
   
    try {
        const docRef = await addDoc(collection(db, user.email + " cart"), {
          product,    
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }

  const fetchCart = async () => {
    await getDocs(collection(db, user.email + " cart"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
            .map(doc => doc.data());
            setCart(newData);                
            //console.log(cart, newData);
            newData.forEach((values,keys)=>{
              console.log(values.product);
            });
        })
}

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.image} title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">
            {product.price}
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label="Add to Cart"
          onClick={addToCartDB_TEST}
        >
          <AddShoppingCart />
        </IconButton>

        <IconButton 
        aria-label="Report an Account" 
        >
          <Flag />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product; 