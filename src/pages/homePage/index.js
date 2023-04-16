import React,  {useState, useEffect} from 'react';
import { Grid } from '@material-ui/core';
import Product from '../../components/products/index';
import useStyles from './styles'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';


const Products = ({onAddToCart}) => {
  let navigate = useNavigate(); 
  const collectionName = "listings";
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);  
  const [clickedProduct, setClicked] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
 

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
              //console.log(doc.id, "=>", doc.data())
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let searchedProducts = [];
    console.log(searchTerm);
    // Perform search using the value in searchTerm
    if (searchTerm.length > 0) {
      try{
        // const querySnapshot = await getDocs(query(collection(db, "listings"),where("product.name", "==", searchTerm)));
        const querySnapshot = await getDocs(query(collection(db, "listings"),where("product.name", ">=", searchTerm),where("product.name", "<=", searchTerm + "~")));
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data());
          searchedProducts.push(doc.data());
        });
        setProducts(searchedProducts);
      } catch (err){
        console.log(err.message);
      }
    } else {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        let myProducts = [];
        let allProducts = [];
        querySnapshot.forEach((doc) => {
            //console.log(doc.id, "=>", doc.data())
            allProducts.push(doc.data());
            myProducts.push(doc.data().product);
              
          });
          setProducts(allProducts);
      } catch (err){
        console.log(err.message);
      }   
    }   
};

const handleSearch = async (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    console.log(searchTerm);
}

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.searchForm}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => handleSearch(event)}
          className={classes.searchInput}
        />
        <button className={classes.searchButton}>
          <FontAwesomeIcon className={classes.searchIcon} icon={faSearch} />
        </button>
      </form>


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