import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import Product from '../../components/products/index';

export function Cart() {
    const isEmpty = 0;
    const classes = useStyles();

    const products = [
        {id: 1, name: 'shoes', description: 'running shoes', price: '$50', image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ed291e67-4618-49ec-8dda-2c2221a5df41/revolution-6-next-nature-mens-road-running-shoes-FgfhgR.png'},
        {id: 2, name: 'laptop', description: 'computer apple', price: '$900', image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202206?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664497359481'}
]

    const EmptyCart = () => (
        <Typography variant='subtitle1'>
            You have no items in your shopping cart
        </Typography>
    );

    const FilledCart = () => (
        <>
        <Grid container spacing={4}>
            {/*cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                    <div>{item.name}</div>
                </Grid>
            ))*/}
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product}/>
                </Grid>
            ))
            }
        </Grid>
        <div className={classes.cardDetails}>
                <Typography variant='h4'>
                    Subtotal: $950{/*{cart.subtotal.formatted_with_symbol} */}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary'>
                        Empty Cart
                    </Button>
                    <Button className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>
                        Checkout
                    </Button>
                </div>
        </div>
        </>
    );

    //if(!cart.line_items) return 'Loading....';

    return (
            <Container>
                <Typography className={classes.title} variant='h3'>
                    Your Shopping Cart
                </Typography>
                { /*!cart.line_items.length*/isEmpty ? <EmptyCart/> : <FilledCart/>}
            </Container>
    )
}