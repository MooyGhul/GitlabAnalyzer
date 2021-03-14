import React from "react";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { CardContent, Divider } from "@material-ui/core";
import useStyles from "../style/ScoreStyles";
import { StudentJS } from "../mockDataDir/mockJS";
import { StudentJava } from "../mockDataDir/mockJava";
import { StudentPython } from "../mockDataDir/mockPython";
import { StudentC } from "../mockDataDir/mockC";
import { EmptyChoice } from "../mockDataDir/mockEmpty";
import LanguageType from "./LanguageType";

const Scores = (props) => {
  let { mergeRequestCount, commitCount, language, onChange } = props;
  const classes = useStyles(props);
  let api = "";
  switch (language) {
    case "Java":
      api = StudentJava;
      break;
    case "C++":
      api = StudentC;
      break;
    case "Python":
      api = StudentPython;
      break;
    case "JS":
      api = StudentJS;
      break;
    case "Empty":
      api = EmptyChoice;
      language = "";
      break;
    default:
  }

  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={12} sm={12}>
        <Card className={classes.card1}>
          <CardContent>
            {/* <section className={classes.titles}>
              <p className={classes.title}>Total Commit</p>
              <p className={classes.title}>Total MR</p>
            </section>
            <Divider /> */}
            {/* <section className={classes.values}>
              <p>{commitCount ? commitCount : "N/A"}</p>
              <p>{mergeRequestCount ? mergeRequestCount : "N/A"}</p>
            </section> */}
          </CardContent>
        </Card>
      </Grid>

      <Grid item lg={6} md={12} sm={12}>
        <Card className={classes.card2}>
          <CardContent>
            <LanguageType language={language} onChange={onChange} />
            <section className={classes.titles} style={{marginTop: "-3vh"}}>
              <p className={classes.title}>Score for {language} Files</p>
            </section>
            <Divider />
            <section className={classes.values}>
              <p>{api.TotalScore ? api.TotalScore : "N/A"}</p>
            </section>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Scores;
