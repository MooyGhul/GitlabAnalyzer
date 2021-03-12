import CodeContributionTable from "./components/CodeContributionTable";
import Header from "./components/Header";
import {Grid} from "@material-ui/core";
import React from "react";

function CodeContributionPage (props) {
 return(
    <Grid container spacing={4}>
      <Grid item xs={12} >
        <Header
          pageTitle="Code Contribution Page"
        />
      </Grid>
      <Grid item xs={12} >
      </Grid>
      <Grid item xs={12}>
        <CodeContributionTable/>
      </Grid>
    </Grid>


 )
}

export default CodeContributionPage;