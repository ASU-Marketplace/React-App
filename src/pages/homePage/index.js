import React,  {useState, useEffect, useContext} from 'react';
import { Grid } from '@material-ui/core';
import Product from '../../components/products/index';
import useStyles from './styles'
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Products = ({onAddToCart}) => {
  let navigate = useNavigate(); 
  const collectionName = "listings";
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);  
  const [clickedProduct, setClicked] = useState("");

  const classes = useStyles();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })


  useEffect(
    () => {
        async function test() {
          const querySnapshot = await getDocs(collection(db, collectionName));
          let myProducts = [];
          let allProducts = [];
          querySnapshot.forEach((doc) => {
              console.log(doc.id, "=>", doc.data())
              allProducts.push(doc.data());
              myProducts.push(doc.data().product);
                
            });
            setProducts(allProducts);
        }
        test();
    }, [user]
  );

  const handleClick= (id) => {
    console.log("id " + id);
    setClicked(id);
    console.log("clicked" + clickedProduct);
    navigate("/exampleListings/" + id);
  }

  return (
    <>
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify-content ='center' spacing={4}>
        {products.map((product) => (
          <Grid item key={product.product.id}  xs={12} sm={6} md={4} lg={3}  className={classes.gridBox}>
            <a onClick={() => handleClick(product.product.id)} className={classes.link}>
              <Product product={product.product} onAddToCart={onAddToCart}  />
            </a>
          </Grid>
        ))}
      </Grid>
    </main>
    </>
  );
};

export default Products;