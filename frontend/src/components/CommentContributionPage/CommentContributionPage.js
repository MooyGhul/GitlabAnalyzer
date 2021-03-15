import React, { useEffect, useState} from "react";
import {
    Paper, Table, TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow, Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import {useParams} from "react-router";
import Header from "../Header";
import Banner from "../Banner";
import CommentRow from "./CommentRow";
import {getGraphData} from "../../helper";
import useStyles from "../../style/CommentContributionPageStyles";
import BarChart from '../Charts/BarChart';
import BarChartProperties from '../Charts/BarChartProperties';

const CommentContributionPage = (props) => {
    const [comments, setComments] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [expandAll, setExpandAll] = React.useState(false);
    const classes = useStyles(props);

    const {project_id, member_id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const commentResult = await axios.get(
                process.env.NODE_ENV === 'development' ?
                    `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/comments` :
                    `/project/${project_id}/member/${member_id}/comments`
            );
            setComments(commentResult.data);
            const commentCounts = getGraphData(commentResult.data);
            setGraphData(commentCounts);
        };
        fetchData().then(() => {
            console.log("Successfully obtained comments");
        }).catch((e) => {
            console.log("Failed to obtain comments");
            console.log(e);
        });
    }, [project_id, member_id, setGraphData]);

    const handleExpand = () => {
        setExpandAll(!expandAll)
    }

    return (
        <Grid container className={classes.root}>
            <Grid item>
                <Header pageTitle={"Comments"}/>
                <Banner memberName={member_id} />
            </Grid>
            <Grid item xs={8} className={classes.graph}>
                <Typography variant="h5" className={classes.graphTitle}>Comment Word Count Per Day</Typography>
                <BarChart data={graphData} comment={true} barLabel1={BarChartProperties.comments.label} barColour1={BarChartProperties.comments.barColour}/>
            </Grid>
            <Grid item className={classes.accordian} >
                <Button variant="contained" onClick={handleExpand} className={classes.expandBtn}>
                    {expandAll ? "Collapse All" : "Expand All"}
                </Button>
            </Grid>
            <Grid item className={classes.table}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow className={classes.head}>
                                <TableCell align="left" className={classes.headCell}>Date</TableCell>
                                <TableCell align="left" className={classes.headCell}>Author</TableCell>
                                <TableCell align="left" className={classes.headCell}>Word Count</TableCell>
                                <TableCell align="left" className={classes.headCell}>Comment Type</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {comments.map(comment => (
                                <CommentRow key={comment.commentId} comment={comment} expandAll={expandAll} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default CommentContributionPage;