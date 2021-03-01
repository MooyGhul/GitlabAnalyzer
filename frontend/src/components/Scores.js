import React from "react";
import Card from '@material-ui/core/Card';
import {CardContent, Divider, withStyles} from "@material-ui/core";
import styles from "../style/ScoreStyles"
import { StudentJS } from '../mockDataDir/mockJS';
import { StudentJava } from '../mockDataDir/mockJava';
import { StudentPython } from '../mockDataDir/mockPython';
import { StudentC } from '../mockDataDir/mockC';
import { EmptyChoice } from '../mockDataDir/mockEmpty';


const Scores = (props) => {
    let {language, classes} = props;
  let api = "";
  switch (language){
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
                        <p>{api.TotalCommit ? 0 : 1}</p>
                        <p>{api.TotalMR ? 0 : 1}</p>
                        <p>{api.TotalFiles ? 0 : 1}</p>
                        <p>{api.TotalScore ? 0 : 1}</p>
                    </section>
                </CardContent>
            </Card>
        </div>
    );
}

export default withStyles(styles)(Scores);