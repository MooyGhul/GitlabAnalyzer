import {
    Grid,
    Typography,
  } from "@material-ui/core";
import React, { useEffect, useState} from 'react';
import useStyles from '../../style/WeightConfigurationPageStyles'; 

const WeightConfigurationPage = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={5} justify="center" alignItems="center">
            <Grid item xs={10}>
                <Typography className={classes.pageTitle}> </Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography className={classes.pageTitle}>Configurations</Typography>
            </Grid>


        </Grid>
    );
}

export default WeightConfigurationPage; 