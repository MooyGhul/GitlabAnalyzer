import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    grid: {
      width: "100%",
      margin: "0px"
    },
    title: {
        textAlign: 'center'
    }

  }));
  

function IssueContributionPage(props) {
    const history = useHistory();
    const styles = useStyles(); 

    return(
        <Grid container xs={12}>
            <Grid item>
                <Header pageTitle="Issue Contribution"></Header>
            </Grid>
            <Grid item xs={12}>
                <h1 className>This is a test</h1>
            </Grid>
            <Grid item xs={12} className={styles.title}>
                <h1 className>Scoreboard goes here</h1>
            </Grid>
            
        </Grid>
    );
}

export default IssueContributionPage;