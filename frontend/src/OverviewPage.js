import Banner from "./components/Banner";
import Header from './components/Header';
import Charts from "./components/Charts";
import DataFetching from './components/DataFetching';
import './OverviewPage.css';
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: theme.palette.success.light,
  }
}));

function OverviewPage(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className = {classes.grid}>
      <Grid item xs={12} >
        <Header
              pageTitle="Overview Test"
        />
      </Grid>
      <Grid container >
        <Banner />
      </Grid>

      <Grid container >
        <Charts />
      </Grid>
      <DataFetching />
    </Grid>
  );
}

export default OverviewPage;