import {
    Grid,
    Typography,
    Divider,
    TableContainer,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    Table,
    TextField,
    IconButton,
    Button,
  } from "@material-ui/core";
import React, { useEffect, useState, Fragment} from 'react';
import useStyles from '../../style/WeightConfigurationPageStyles'; 
import mockIterationsDates from "../../mockDataDir/mockIterationDates";
import Row from "./SavedIterationsTable";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from "axios";
import {useParams} from "react-router";

/*
const getValueFromTextField = (e) => {
    const textFieldId = e.target.id;
    const textFieldValue = e.target.value;
    configData[textFieldId] = textFieldValue;
}
*/

const CreateFileTypeWeightInput = ({fileType}) => {
    const [selected, setSelected] = useState(true);
    const classes = useStyles();
    const defaultFileWeight = 1;

    const onSelectionClick = () => {
        setSelected(!selected);
    }

    const displayIcon = () => {
        if(selected) {
            return (<IndeterminateCheckBoxIcon className={classes.minusButton}></IndeterminateCheckBoxIcon>);
        }
        else {
            return(<AddBoxIcon className={classes.plusButton}></AddBoxIcon>);
        }
    }

    return (
        <Fragment>
            <IconButton className={classes.button} onClick={onSelectionClick}>{displayIcon()}</IconButton>
            <TextField id={fileType} defaultValue={defaultFileWeight} label={fileType} disabled={!selected} variant="outlined" type="number" />
        </Fragment>
    );
}

export default CreateFileTypeWeightInput