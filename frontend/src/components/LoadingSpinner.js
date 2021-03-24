import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '../style/LoadingSpinnerStyle'

const LoadingSpinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.spinner}/>
      <CircularProgress color="secondary" /> 
    </div>
  );
}

export default LoadingSpinner