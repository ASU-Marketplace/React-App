import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconIButton, IconButton} from '@material-ui/core';
import { AddShoppingCart, CallMissedSharp } from '@material-ui/icons'
import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();
    return (
        //image={product.media.source
    //product.price.formatted_with_symbol}
    //<Typography dangerouslySetInnerHTML={{__html: product.description}}
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image} title={product.name}/>
            <CardContent>

                <div className={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h5'>
                        {product.price}
                    </Typography>
                </div>
                <Typography variant='body2' color='textSecondary'>
                    {product.description}
                </Typography>

            </CardContent>

            <CardActions disableSpacing className={classes.cardActions}>
                
                <IconButton aria-label='Add to Cart' onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart/>
                </IconButton>

            </CardActions>
        </Card>
    )
}

export default Product; 