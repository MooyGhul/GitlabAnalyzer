import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import {useParams} from "react-router";

const CommentContributionPage = (props) => {
    const expand = useState(false);
    const [comments, setComments] = useState([1,2,3,4]);

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
            setComments([1,2,3,4]);
        }
    }, [project_id, member_id]);

    return (
        <Grid container>
            {comments.map(comment => (
                <Accordion key={1}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        aria-expanded={expand}
                        id="panel1a-header"
                    >
                        <Typography >Bob</Typography>
                        <Typography >Fred</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Grid>
    );
}

export default CommentContributionPage;