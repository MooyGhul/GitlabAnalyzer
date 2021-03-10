import React, {Fragment, useEffect, useState} from "react";
import {
    Collapse, IconButton, Paper, Table, TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import {useParams} from "react-router";
import Header from "./Header";
import CommentJson from "../mockDataDir/mockComments";
import useStyles from "../style/CommentContributionPageStyles";


const CommentRow = (props) => {
    const {comment, expandAll} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TableCell component="th" scope="row">
                    <Typography gutterBottom component="div" className={classes.rowBody}>
                        {comment.commentDate}
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography gutterBottom component="div" className={classes.rowBody}>
                        {comment.commenter}
                    </Typography>
                </TableCell>
                <TableCell align="left">0</TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small">
                        {open || expandAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open || expandAll} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant={"h6"} gutterBottom component="div" className={classes.rowBody}>
                                Comment Type: {comment.commentType}
                            </Typography>
                            <Typography gutterBottom component="div" className={classes.rowBody}>
                                Body: {comment.commentText}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

const CommentContributionPage = (props) => {
    const [comments, setComments] = useState(CommentJson);
    const [expandAll, setExpandAll] = React.useState(false);
    const classes = useStyles(props);

    const {projectId, memberId} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const commentResult = await axios.get(
                `http://localhost:8080/project/25513/member/${memberId}/comments`
            );
            setComments(commentResult.data);
        }
        try {
            fetchData().then(() => {
                console.log("Successfully obtained comments");
            });
        } catch {
            setComments(CommentJson);
        }
    }, [projectId, memberId]);

    return (
        <Grid container className={classes.root}>
            <Grid item>
                <Header pageTitle={"Comments"}/>
            </Grid>
            <Grid item className={classes.accordian} >
                <Button variant="contained" onClick={() => setExpandAll(!expandAll)} className={classes.expandBtn}>
                    {expandAll ? "Collapse All" : "Expand All"}
                </Button>
            </Grid>
            <Grid item>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow className={classes.head}>
                                <TableCell align="left" style={{fontWeight: "bold"}}>Date</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>Author</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>Word Count</TableCell>
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