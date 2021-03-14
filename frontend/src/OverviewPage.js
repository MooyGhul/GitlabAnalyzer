import Banner from "./components/Banner";
import Header from "./components/Header";
import Charts from "./components/Charts";
import DataFetching from "./components/DataFetching";
import "./OverviewPage.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Navbar from './components/Navbar/Navbar';
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: theme.palette.success.light,
  },
}));

function OverviewPage() {
  const classes = useStyles();
  const {member_id} = useParams();

  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid container>
        <Header pageTitle="Overview Test" />
        {/* <Navbar /> */}
        <Banner memberName={member_id}/>
      </Grid>
      <Grid container>
        <Charts />
      </Grid>
      <DataFetching />
    </Grid>
  );
}

export default OverviewPage;
