import React, { useEffect, useState} from "react";
import {
    Paper, Table, TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import {useParams} from "react-router";
import Header from "../Header";
import Banner from "../Banner";
import CommentRow from "./CommentRow";
import CommentContributionBarChart from "../CommentContribution";
import {getGraphData} from "../../helper";
import useStyles from "../../style/CommentContributionPageStyles";

const CommentContributionPage = (props) => {
    const [comments, setComments] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [expandAll, setExpandAll] = React.useState(false);
    const classes = useStyles(props);

    const {project_id, member_id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const commentResult = await axios.get(
                `http://localhost:8080/project/25513/member/${member_id}/comments`
            );
            setComments(commentResult.data);
            const commentCounts = getGraphData(commentResult.data);
            setGraphData(commentCounts);
        }
        fetchData().then(() => {
            console.log("Successfully obtained comments");
        }).catch((e) => {
            console.log("Failed to obtain comments");
            console.log(e);
        });
    }, [project_id, member_id, setGraphData]);

    return (
        <Grid container className={classes.root}>
            <Grid item>
                <Header pageTitle={"Comments"}/>
                <Banner />
            </Grid>
            <Grid item className={classes.graph}>
                <CommentContributionBarChart commentsDataProp={graphData}/>
            </Grid>
            <Grid item className={classes.accordian} >
                <Button variant="contained" onClick={() => setExpandAll(!expandAll)} className={classes.expandBtn}>
                    {expandAll ? "Collapse All" : "Expand All"}
                </Button>
            </Grid>
            <Grid item className={classes.table}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow className={classes.head}>
                                <TableCell align="left" style={{fontWeight: "bold", fontSize: "1.2rem"}}>Date</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold", fontSize: "1.2rem"}}>Author</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold", fontSize: "1.2rem"}}>Word Count</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold", fontSize: "1.2rem"}}>Comment Type</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {comments.map(comment => (
                                <CommentRow key={comment.commentId} comment={comment} expandAll={expandAll} setExpandall={setExpandAll}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default CommentContributionPage;