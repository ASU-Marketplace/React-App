import React from 'react';
import { Grid } from '@material-ui/core';
import Product from '../../components/products/index';
import useStyles from './styles'

const products = [
    {id: 1, name: 'Running Shoes', description: 'Nike', price: '$50', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ed291e67-4618-49ec-8dda-2c2221a5df41/revolution-6-next-nature-mens-road-running-shoes-FgfhgR.png'},
    {id: 2, name: 'Laptop', description: 'Apple Computer', price: '$900', image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202206?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664497359481'},
    {id: 3, name: 'Backpack', description: 'Jansport', price: '$10', image: 'https://m.media-amazon.com/images/I/81dkWDxetjL._AC_UY1000_.jpg'},
    {id: 4, name: 'Skateboard', description: 'RipnDip Board', price: '$10', image: 'https://cdn.shopify.com/s/files/1/0177/2424/products/Fall21-Boards_0015_027A2760_1024x1024.jpg?v=1628640375'}


]
//const Products = ({products, onAddToCart})
const Products = ({onAddToCart}) => {
    const classes = useStyles();

    return (
    <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Grid container justoify='center' spacing={4}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} onAddToCart={onAddToCart}/>
                </Grid>
            ))
            }
        </Grid>
    </main>
    )
}

export default Products;