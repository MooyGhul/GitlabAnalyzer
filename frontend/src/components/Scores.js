import React from "react";
import Card from "@material-ui/core/Card";
import { CardContent, Divider } from "@material-ui/core";
import useStyles from "../style/ScoreStyles";
import { StudentJS } from "../mockDataDir/mockJS";
import { StudentJava } from "../mockDataDir/mockJava";
import { StudentPython } from "../mockDataDir/mockPython";
import { StudentC } from "../mockDataDir/mockC";
import { EmptyChoice } from "../mockDataDir/mockEmpty";

const Scores = (props) => {
  let { language } = props;
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
    <div>
      <h2> ScoreBoard </h2>
      <Card className={classes.root}>
        <CardContent>
          <section className={classes.titles}>
            <p className={classes.title}>Total Commit</p>
            <p className={classes.title}>Total MR</p>
            <p className={classes.title}>Total {language} Files</p>
            <p className={classes.title}>Total Score</p>
          </section>
          <Divider />
          <section className={classes.titles}>
            <p>{api.TotalCommit ? api.TotalCommit : 0}</p>
            <p>{api.TotalMR ? api.TotalMR : 0}</p>
            <p>{api.TotalFiles ? api.TotalFiles : 0}</p>
            <p>{api.TotalScore ? api.TotalScore : 0}</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default Scores;
