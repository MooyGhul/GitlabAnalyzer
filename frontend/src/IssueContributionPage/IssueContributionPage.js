import { Grid, TableContainer } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import {makeStyles} from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';
import Banner from "../components/Banner";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    grid: {
      width: "100%",
      margin: "0px"
    },
    dataGrid: {
        height: 900, 
        width: '100%',
        alignContent: 'center',
        whiteSpace: 'unset',
    },
    text: {
        textAlign: 'center'
    },
    header: {
        textAlign: 'center'
    },
    table: {
        minWidth: 650,
    },
    dateCol: {
        minWidth: 100,
        fontWeight: 'bold',
    }, 
    issueCol: {
        minWidth: 200,
        fontWeight: 'bold',
    },
    noteCol: {
        fontWeight: 'bold'
    }
  }));

function getIssueContributionGraph() {
    return 1; 
}

const columns = [
    {field: 'date', headerName: 'Date', width: 170}, 
    {field: 'issue', headerName: 'Issue', width: 500},
    {field: 'note', headerName: 'Note', width: 650},  
]

const rows = [
    {id: 1, date: 'Jan 30, 2020', issue: '#1 add a filter to main page', note: 'Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way - Michael Scott'},
    {id: 2, date: 'Mar 8, 2020 ', issue: '#2 fix a bug that doesnt work because of reasons', note: 'I’m not superstitious, but I am a little stitious.'},
    {id: 3, date: 'Mar 10, 2020', issue: '#3 fix a bug that is breaking things because', note: 'Dont ever, for any reason, do anything, to anyone, for any reason, ever, no matter what, no matter where, or who, or who you are with, or where you are going, or where youve been, ever, for any reason whatsoever.'}
]

function IssueContributionPage(props) {
    const history = useHistory();
    const styles = useStyles(); 

    return(
        <Grid container justify='center' alignItems='center'>
            <Grid item xs={12}>
                <Header pageTitle="Issue Contribution"/>
                <Banner></Banner>
            </Grid>
            <Grid item xs={12} className={styles.text}>
                <h2>Issues created for *Insert date here*</h2>
            </Grid>
            <Grid item xs={12} className={styles.text}>
                <h2>Insert issue bar chart here</h2>
            </Grid>
            <Grid item xs={8}>
                {/*<DataGrid rows={rows} columns={columns} className={styles.dataGrid}/>*/}
                <TableContainer className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles.dateCol}> Date</TableCell>
                            <TableCell className={styles.issueCol}> Issue</TableCell>
                            <TableCell className={styles.noteCol}>Note</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.date}</TableCell>
                                <TableCell>{row.issue}</TableCell>
                                <TableCell>{row.note}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default IssueContributionPage;