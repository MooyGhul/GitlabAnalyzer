import {
    Grid,
    Typography,
    Divider,
    TableContainer,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    Button,
  } from "@material-ui/core";
import React, { useEffect, useState} from 'react';
import useStyles from '../../style/WeightConfigurationPageStyles'; 

const Row = ({row, deleteRow}) => {
    const classes = useStyles();

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