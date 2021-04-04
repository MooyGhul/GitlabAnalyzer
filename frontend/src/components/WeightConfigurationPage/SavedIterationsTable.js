import {
    TableCell,
    TableRow,
    Button,
  } from "@material-ui/core";
import React from 'react';
import useStyles from '../../style/WeightConfigurationPageStyles'; 

const Row = (props) => {
    const classes = useStyles();
    const row = props.row;
    const deleteRow = props.deleteRow;
    const handleDelete = () => {
        deleteRow(row.iterationName)
    }

    return (
        <TableRow key={row.name} hover={true}>
            <TableCell align="center">{row.iterationName}</TableCell>
            <TableCell align="center">{row.startDate}</TableCell>
            <TableCell align="center">{row.endDate}</TableCell>
            <TableCell align="center">
                <Button variant="contained" component="span" className={classes.deleteButton} onClick={handleDelete} size="small">Delete</Button>
            </TableCell>
        </TableRow>
    )
}

export default Row;