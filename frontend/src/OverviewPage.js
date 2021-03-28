import Banner from "./components/Banner";
import Navbar from './components/Navbar/Navbar';
import Charts from "./components/Charts/Charts";
import DataFetching from "./components/DataFetching";
import "./OverviewPage.css";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {useParams} from "react-router-dom";
import NavbarSide from "./NavbarSide";

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

const OverviewPage = (props) => {
  const classes = useStyles();
  // eslint-disable-next-line
  const {member_id} = props.member_id===-1? useParams():props.member_id;

  console.log("props:");
  console.log(props);

  console.log(props.test + " OverviewPage ");

  return (
    // <Grid container>
    //   <Grid item xs={12} >
    //       <NavbarSide />
    //     </Grid>
    <Grid container spacing={2} className={classes.grid}>
      <Grid container spacing={0}>
        {/* <Grid item xs={12} >
          <Navbar />
        </Grid> */}
        <Grid item xs={12} >
          <Banner memberName={member_id}/>
        </Grid>
      </Grid>
      <Grid container>
        <Charts />
      </Grid>
      <DataFetching />
    </Grid>
    // </Grid> 
  );
}

export default OverviewPage;
