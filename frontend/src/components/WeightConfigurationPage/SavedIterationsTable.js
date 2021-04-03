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

const Row = (props) => {
    const {row} = props;
    const classes = useStyles();

    return (
        <TableRow key={row.name} hover={true}>
            <TableCell align="center">{row.iterationName}</TableCell>
            <TableCell align="center">{row.startDate}</TableCell>
            <TableCell align="center">{row.endDate}</TableCell>
            <TableCell align="center">
                <Button variant="contained" component="span" className={classes.deleteButton} size="small">Delete</Button>
            </TableCell>
        </TableRow>
    )
}

export default Row;