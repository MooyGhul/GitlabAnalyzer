import React, {Fragment, useEffect, useState} from "react";
import {
    Collapse, IconButton, Paper, Table, TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import {useParams} from "react-router";
import CommentJson from "../mockDataDir/mockComments";
import useStyles from "../style/CommentContributionPageStyles";
import Header from "./Header";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const CommentRow = (props) => {
    const {comment, expandAll} = props;
    const [open, setOpen] = React.useState(false);

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TableCell component="th" scope="row">
                    {comment.updated_at}
                </TableCell>
                <TableCell align="left">{comment.author.username}</TableCell>
                <TableCell align="left">0</TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small">
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open || expandAll} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography gutterBottom component="div">
                                {comment.body}
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

    const {project_id, member_id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const commentResult = await axios.get(
                `http://localhost:8080/project/${project_id}/member/${member_id}/comments`
            );
            console.log(`Comment Result ${commentResult}`);
            setComments(commentResult);
        }
        try {
            fetchData();
        } catch {
            setComments(CommentJson);
        }
    }, [project_id, member_id]);

    return (
        <Grid container className={classes.root}>
            <Grid item>
                <Header pageTitle={"Commets"}/>
            </Grid>
            <Grid item className={classes.accordian}>
                <Button variant="contained" color="primary" onClick={() => setExpandAll(!expandAll)}>Expand All</Button>
            </Grid>
            <Grid item>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow className={classes.head}>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Author</TableCell>
                                <TableCell align="left">Word Count</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {comments.map(comment => (
                                <CommentRow comment={comment} expandAll={expandAll} setExpandall={setExpandAll}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default CommentContributionPage;