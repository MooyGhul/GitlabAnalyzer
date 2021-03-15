import Banner from "./components/Banner";
import Header from "./components/Header";
import Charts from "./components/Charts/Charts";
import DataFetching from "./components/DataFetching";
import "./OverviewPage.css";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {useHistory} from "react-router";

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
  const history = useHistory();
  const classes = useStyles();
  const {project_id, member_id} = useParams();

  const onClickHandler = () => {
    history.push(`/overview/${project_id}/${member_id}/codecontributions`);
  };

  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid container>
        <Header pageTitle="Overview Test" />
        <Banner memberName={member_id}/>
      </Grid>

      <Grid container>
        <h3 onClick={onClickHandler}> Go to Code Contributions </h3>
        <Charts />
      </Grid>
      <DataFetching />

    </Grid>

  );
}

export default OverviewPage;
