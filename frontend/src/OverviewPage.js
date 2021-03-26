import Banner from "./components/Banner";
import Navbar from './components/Navbar/Navbar';
import Charts from "./components/Charts/Charts";
import DataFetching from "./components/DataFetching";
import "./OverviewPage.css";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
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

const OverviewPage = () => {
  const classes = useStyles();
  const {member_id} = useParams();

  // history.push({
  //   pathname: "/projectInfo/" + projectIdArray[0],
  //   state: { id: projectIdArray[0], projectName: projectName },
  // });
  // } else {
  // console.log("multiple projects have been selected ");
  // }

  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid container spacing={0}>
        <Grid item xs={12} >
          <Navbar />
        </Grid>
        <Grid item xs={12} >
          <Banner memberName={member_id}/>
        </Grid>
      </Grid>
      <Grid container>
        <Charts />
      </Grid>
      <DataFetching />
    </Grid>

  );
}

export default OverviewPage;
