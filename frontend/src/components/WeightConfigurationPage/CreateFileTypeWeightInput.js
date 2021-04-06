import {
    TextField,
    IconButton,
  } from "@material-ui/core";
import React, {useState, Fragment} from 'react';
import useStyles from '../../style/WeightConfigurationPageStyles'; 
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';

const CreateFileTypeWeightInput = (props) => {
    const {fileType, getTextFieldValue, defaultFileWeight} = props
    const [selected, setSelected] = useState(true);
    const classes = useStyles();

    const onSelectionClick = () => {
        setSelected(!selected);
    }

    const displayIcon = (selected) => {
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
            <TextField id={fileType} defaultValue={defaultFileWeight} label={fileType} disabled={!selected} variant="outlined" type="number" onChange={getTextFieldValue}/>
        </Fragment>
    );
}

export default CreateFileTypeWeightInput