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
import React, { useEffect, useState, setState} from 'react';
import useStyles from '../../style/WeightConfigurationPageStyles'; 
import mockIterationsDates from "../../mockDataDir/mockIterationDates";
import Row from "./SavedIterationsTable";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from "axios";
import {useParams} from "react-router";

const WeightConfigurationPage = () => {
    const classes = useStyles();
    var {project_id} = useParams();
    const [fileT, setFileT] = useState([]);
    const [iterDates, setIterDates] = useState(mockIterationsDates);
    var configData = {};
     
    useEffect(() => {
        const fetchData = async () => {
          const languageResult = await axios.get(
            process.env.NODE_ENV === "development"
              ? `${process.env.REACT_APP_DEVHOST}/project/${project_id}/languages`
              : `/project/${project_id}/languages`
          );
          setFileT(languageResult.data);
        };
        fetchData()
          .then(() => {
            console.log("Successfully obtained languages");
          })
          .catch((e) => {
            console.log("Failed to obtain languages");
            console.log(e);
          });
      }, [project_id, setFileT]);


    const displayIcon = (selected) => {
        if(selected) {
            return (<IndeterminateCheckBoxIcon className={classes.minusButton}/>);
        }
        else {
            return(<AddBoxIcon className={classes.plusButton}/>);
        }
    }

    const getValueFromTextField = (e) => {
        const textFieldId = e.target.id;
        const textFieldValue = e.target.value;
        configData[textFieldId] = textFieldValue;
        console.log(configData);
    }

    const CreateFileTypeWeightInput = (fileType) => {
        var selected = true;
        const onSelectionClick = () => {
            selected = !selected;
        }
    
        return (
            <React.Fragment>
                <IconButton className={classes.button} onClick={onSelectionClick}>{displayIcon(selected)}</IconButton>
                <TextField id={fileType} defaultValue={1} label={fileType} disabled={!selected} variant="outlined" type="number" onChange={getValueFromTextField}></TextField>
            </React.Fragment>
        );
    }

    const DeleteRow = (rowName) => {
        var filteredIterations = iterDates.filter(iterDate => iterDate.iterationName != rowName);
        setIterDates(filteredIterations);
    }

    return (
        <Grid container spacing={5} justify="center" alignItems="center">
            <Grid item xs={10}>
                <Typography className={classes.pageTitle}> </Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography className={classes.pageTitle}>Configurations</Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography className={classes.subHeader}>Configure Dates</Typography>
                <Divider className={classes.divider} orientation='horizontal'/>
            </Grid>
            <Grid item xs={3}>
                <Typography className={classes.pageTitle}>Insert date picker</Typography>
                <Grid container justify="flex-end" direction="row">
                    <Grid item xs={10}>
                        <Button variant="contained" component="span" className={classes.addIterationButton} size="large">+ Add Iteration</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={7} >
                <Typography className={classes.subHeader}>Saved Iterations</Typography>
                <Divider className={classes.divider} orientation='horizontal'/>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.headCell} align="center">
                                    Iteration Name
                                </TableCell>
                                <TableCell className={classes.headCell} align="center">
                                    Start Date
                                </TableCell>
                                <TableCell className={classes.headCell} align="center">
                                    End Date
                                </TableCell>
                                <TableCell className={classes.headCell} align="center"/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {iterDates.map((row) => (
                                <Row key={row.iterationName} deleteRow={DeleteRow} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={10}>
                <Grid container justify="flex-end" direction="row">
                    <Grid item xs={1}>
                        <Button variant="contained" component="span" className={classes.saveButton} size="large">Save</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Typography className={classes.subHeader}>Configure Score Weights</Typography>
                <Divider className={classes.divider} orientation='horizontal'/>
                <Grid item xs={10}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="ConfigName" label="Configuration Name" variant="outlined" onChange={getValueFromTextField}></TextField>
                    </form>
                </Grid>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="MergeRequest" label="Merge Request Weight" variant="outlined" type="number" defaultValue={1} onChange={getValueFromTextField}></TextField>
                    <TextField id="Commit" label="Commit Weight" variant="outlined" type="number" defaultValue={1} onChange={getValueFromTextField}></TextField>
                    <TextField id="Line" label="Line of Code" variant="outlined" type="number" defaultValue={1.2} onChange={getValueFromTextField}></TextField>
                    <TextField id="Deleted" label="Deleted Line" variant="outlined" type="number" defaultValue={0.2} onChange={getValueFromTextField}></TextField>
                    <TextField id="Syntax" label="Syntax Change" variant="outlined" type="number" defaultValue={0.2} onChange={getValueFromTextField}></TextField>
                </form>
            </Grid>
            <Grid item xs={10}>
                <Typography className={classes.subHeader1}>Configure Weights by File Type</Typography>
                <Divider className={classes.divider} orientation='horizontal'/>
                <Grid item xs={5}>
                    <form className={classes.root} noValidate autoComplete="off">
                        {fileT.map((fileType) => (
                            CreateFileTypeWeightInput(fileType)
                        ))}
                    </form>  
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Grid container justify="flex-end" direction="row">
                    <Grid item xs={10}>
                        <Button variant="contained" component="span" className={classes.saveButton} size="large">Save</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default WeightConfigurationPage; 