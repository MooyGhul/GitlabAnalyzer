import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import {useParams} from "react-router";
import CommentJson from "../mockDataDir/mockComments";
import useStyles from "../style/CommentContributionPageStyles";

const CommentContributionPage = (props) => {
    const expand = useState(true);
    const [comments, setComments] = useState(CommentJson);
    const classes = useStyles(props);

    const {project_id, member_id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const commentResult = await axios.get(
                `http://localhost:8080/project/${project_id}/member/${member_id}/comments`
            );
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
            {comments.map(comment => (
                <Accordion key={comment.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.secondaryHeading}>{comment.updated_at}</Typography>
                        <Typography className={classes.heading}>{comment.author.username}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {comment.body}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Grid>
    );
}

export default CommentContributionPage;