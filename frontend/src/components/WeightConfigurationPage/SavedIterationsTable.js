import {
    Grid,
    Typography,
    Divider,
    TableContainer,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
  } from "@material-ui/core";
import React, { useEffect, useState} from 'react';
import useStyles from '../../style/WeightConfigurationPageStyles'; 

const Row = (props) => {
    const {row} = props;
    const classes = useStyles();

    return (
        <TableRow key={row.name}>
            <TableCell align="center">{row.iterationName}</TableCell>
            <TableCell align="center">{row.startDate}</TableCell>
            <TableCell align="center">{row.endDate}</TableCell>
        </TableRow>
    )
}

export default Row;