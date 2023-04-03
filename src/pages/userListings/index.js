import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';


export function UserListing(){
    const classes = useStyles();
    return (
        <Container>
                <Typography className={classes.title} variant='h3'>
                    My Listings
                </Typography>

                <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary'>
                    Edit Listings
                </Button>    
        </Container>
    )
}