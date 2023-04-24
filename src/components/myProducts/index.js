import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import { FavoriteBorderOutlined, OutlinedFlag} from '@material-ui/icons'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';

import useStyles from './styles';
//import { addToCartDB, addValue, getValue } from '../../server/dbconnection';
import { db, auth } from "../../firebase";
import {
    addDoc,
    collection,
    getDocs,
    doc, 
    deleteDoc
} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';


const MyProduct = ({ product }) => {
    const classes = useStyles();
    const [cart, setCart] = useState([]);

    const [user, setUser] = useState([]);

    const [open, setOpen] = useState(false);

    const [isErrorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorOpen, setErrorOpen] = useState(false);
  

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    //console.log("set " + user.email + " to " + currentUser.email);
  })
    const handleClickOpen = () => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1750);
    };  

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
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

    useEffect(()=>{
        if (user != null) {
            fetchCart();
            console.log("refreshing cart");
        }
    }, [])

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const addToCartDB_TEST = async () => {
   
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

    const deleteListing = async () => {
        try {
            await deleteDoc(doc(db, "listings", product.id));
            setErrorVisible(true);
            setOpen(true);
            setErrorMessage("Listing successfully deleted!");
            console.log("doc deleted");
        } catch (err) {
            console.log(err.message);
            setErrorVisible(true);
            setOpen(true);
            setErrorMessage(err.message);
        }
        
        
    }

    return (
        <>
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
                    aria-label="Report Listing"
                    onClick={(event) => {
                        event.stopPropagation();
                        handleClickOpen();
                    }}
                >
                    <OutlinedFlag/>
                </IconButton>

                <IconButton
                    aria-label="Save Listing"
                    onClick={(event) => {
                        event.stopPropagation();
                        addToCartDB_TEST();
                    }}
                >
                    <FavoriteBorderOutlined />
                </IconButton>

                <IconButton
                    aria-label="Delete Listing"
                    onClick={(event) => {
                        event.stopPropagation();
                        deleteListing();
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Typography>Thanks! This listing has been Reported</Typography>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </Card>
        {isErrorVisible && <Snackbar open={open} message={errorMessage} onClose={handleClose} autoHideDuration={3000} action={action}/>}
        </>
    );
};

export default MyProduct;
