import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import {makeStyles} from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';
import Banner from "../components/Banner";

const useStyles = makeStyles((theme) => ({
    grid: {
      width: "100%",
      margin: "0px"
    },
    dataGrid: {
        height: 900, 
        width: '100%',
        alignContent: 'center',
    },
    text: {
        textAlign: 'center'
    },
    header: {
        textAlign: 'center'
    }
  }));

function getIssueContributionGraph() {
    return 1; 
}

const columns = [
    {field: 'date', headerName: 'Date', width: 150}, 
    {field: 'issue', headerName: 'Issue', width: 500},
    {field: 'note', headerName: 'Note', width: 700},  
]

const rows = [
    {id: 1, date: 'Jan 30, 2020', issue: '#1 add a filter to main page', note: 'Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way'},
    {id: 2, date: 'Mar 8, 2020 ', issue: '#2 fix a bug that doesnt work because of reasons', note: 'I’m not superstitious, but I am a little stitious.'}
]

function IssueContributionPage(props) {
    const history = useHistory();
    const styles = useStyles(); 

    return(
        <Grid container justify='center' alignItems='center'>
            <Grid item>
                <Header pageTitle="Issue Contribution"></Header>
            </Grid>
            <Grid item xs={12}>
                <h1 className>This is a test</h1>
            </Grid>
            <Grid item xs={12} className={styles.text}>
                <Banner></Banner>
            </Grid>
            <Grid item xs={12} className={styles.text}>
                <h2>Issues created for *Insert date here*</h2>
            </Grid>
            <Grid item xs={12} className={styles.text}>
                <h2>Insert issue bar chart here</h2>
            </Grid>
            <Grid item xs={8}>
                <DataGrid rows={rows} columns={columns} className={styles.dataGrid}></DataGrid>
            </Grid>
        </Grid>
    );
}

export default IssueContributionPage;