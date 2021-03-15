import {TableCell, TableRow, IconButton, Collapse, Box, Typography } from '@material-ui/core';
import React, {useState} from "react";
import useStyles from '../../style/IssueContributionPageStyles'; 
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const Row = (props) => {
    const {row} = props;
    const [open, setOpen] = useState(false);
    const styles = useStyles(); 

    const OnButtonClick = () => {
        setOpen(!open); 
    }

    return (
        <React.Fragment>
            <TableRow className={styles.root}>
                <TableCell component="th" scope="row">{row.openedDate}</TableCell>
                <TableCell>{row.issueName}</TableCell>  
                <TableCell className={styles.noteText}>{row.issueDescription}</TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={OnButtonClick}>
                        {open ? <KeyboardArrowUpIcon className={styles.icon}/> : <KeyboardArrowDownIcon className={styles.icon}/>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6} className={open ? styles.dropDownRow : styles.empty}>
                    <Collapse in={open} timeout="auto" unmountOnExit >
                        <Box margin={1}>
                            <Typography variant="h7" gutterBottom component="div">Full Note: {row.issueDescription}</Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default Row;