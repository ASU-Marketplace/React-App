import React, {useState, useEffect} from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import MyProduct from '../../components/myProducts/index';
import { db, auth } from "../../firebase";
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    getDocs,
    deleteDoc,
    QuerySnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';

export function UserListing(){
    //this page is a compilation of user's listings. All the posts made. 
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState([]);
    const classes = useStyles();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log("set " + user.email + " to " + currentUser.email);
    })
    
    useEffect(
        () => {
            async function test() {
                await getDocs(collection(db, "listings")).then(querySnapshot => {
                    let allProducts = querySnapshot.docs.map(doc => doc.data().product);
                    let myProducts = [];
                    for (let element in allProducts) {
                        if (allProducts[element].poster == user.email) {
                            myProducts.push(allProducts[element]);
                        }
                    }
                    setProducts(myProducts);
                });
                products.forEach(element => {
                    console.log(element);
                });
            }
            test();
        }, [user]
    )

    const FilledCart = () => (
        <>
        <Grid container spacing={4}>
            {}
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <MyProduct product={product}/>
                </Grid>
            ))
            }
        </Grid>
        </>
    );

    return (<>
    <Container>
                <Typography className={classes.title} variant='h2'>
                    My Listings
                </Typography>

                {/* <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary'
                    onClick={deleteCart}>
                    Edit Items
                </Button> */}
                    {/* <Button className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>
                        Checkout
                    </Button> */}
                
                
                {<FilledCart/>}
    </Container>
    </>)
}