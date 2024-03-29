import React, {useState, useEffect} from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import Product from '../../components/products/index';
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

export function Cart() {
    const isEmpty = 0;
    const classes = useStyles();
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState([]);
    const [total, setTotal] = useState([]);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    console.log("set " + user.email + " to " + currentUser.email);
  })

  useEffect(
      () => {
        async function test() {
            await getDocs(collection(db, user.email + " cart")).then(querySnapshot => {
                setCart(querySnapshot.docs.map(doc => doc.data().product));
            });
            let tempTotal = 0;
            await getDocs(collection(db, user.email + " cart")).then(querySnapshot => {
                querySnapshot.docs.map(doc => doc.data().product.price).forEach(price => {
                    tempTotal += Number(price.replace(/[^0-9.-]+/g,""));
                });
            });
            setTotal(tempTotal);
        }
        console.log("getting here");
        test();
      }, [user])

    const deleteCart = async () => {
        console.log("deleting all");
        const test = await getDocs(collection(db, user.email + " cart"));
        test.forEach((doc) => {
            deleteDoc(doc.ref);
        });
        setCart([]);
        setTotal(0);
    }

    //const products = [
        //{id: 1, name: 'shoes', description: 'running shoes', price: '$50', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ed291e67-4618-49ec-8dda-2c2221a5df41/revolution-6-next-nature-mens-road-running-shoes-FgfhgR.png'},
        //{id: 2, name: 'laptop', description: 'computer apple', price: '$900', image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202206?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664497359481'}
    //]

    const fetchCart = async () => {
        let test = await getDocs(collection(db, user.email + " cart")); 
            setCart([]);
            test.forEach((doc) => {
                console.log(doc.data());
                setCart([...cart, doc.data()])
            })
    }

    const EmptyCart = () => (
        <Typography variant='subtitle1'>
            You have no items in your shopping cart
        </Typography>
    );

    const FilledCart = () => (
        <>
        <Grid container spacing={4}>
            {}
            {cart.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product}/>
                </Grid>
            ))
            }
        </Grid>
        <div className={classes.cardDetails}>
                <Typography variant='h4'>
                    Subtotal: ${
                    total
                }
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary'
                    onClick={deleteCart}>
                        Empty List
                    </Button>
                    {/* <Button className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>
                        Checkout
                    </Button> */}
                </div>
        </div>
        </>
    );

    //if(!cart.line_items) return 'Loading....';

    return (
            <Container>
                <Typography className={classes.title} variant='h2'>
                    Saved Items
                </Typography>

                {/* <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary'
                    onClick={deleteCart}>
                    Edit Items
                </Button> */}
                    {/* <Button className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>
                        Checkout
                    </Button> */}
                
                
                { /*!cart.line_items.length*/isEmpty ? <EmptyCart/> : <FilledCart/>}
            </Container>
    )
}