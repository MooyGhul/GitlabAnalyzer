import React, {Fragment} from "react";
import {Avatar, Collapse, IconButton, TableCell, TableRow, Typography} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Box from "@material-ui/core/Box";
import {formatTableDate} from "../../helper";
import useStyles from "../../style/CommentContributionPageStyles";

const CommentRow = (props) => {
    const {comment, expandAll} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleDropDown = () => {
        setOpen(!open)
    };

    return (
        <Fragment>
            <TableRow onClick={handleDropDown}>
                <TableCell component="th" scope="row">
                    <Typography gutterBottom component="div">
                        {formatTableDate(comment.commentDate)}
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography gutterBottom component="div">
                        {comment.commenter}
                    </Typography>
                </TableCell>
                <TableCell align="left" className={classes.wordCount}>{comment.wordCount}</TableCell>
                <TableCell>
                    {comment.commentType === "MergeRequest" ? <Avatar className={classes.mrIcon}>M</Avatar> :
                        <Avatar className={classes.issueIcon}>I</Avatar>}
                </TableCell>
                <TableCell>
                    <IconButton size="small">
                        {open || expandAll ? <KeyboardArrowUpIcon className={classes.icon}/> :
                            <KeyboardArrowDownIcon className={classes.icon}  />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow className={classes.expandBody} style={open || expandAll ? {borderBottom: "medium solid #7553ff"} : {}}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open || expandAll} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography gutterBottom component="div" className={classes.rowBody}>
                                {comment.commentText}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default CommentRow;