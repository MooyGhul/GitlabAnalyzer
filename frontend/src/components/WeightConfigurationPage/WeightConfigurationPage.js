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
import React, { useEffect, useState} from 'react';
import useStyles from '../../style/WeightConfigurationPageStyles'; 
import InnerNavBar from '../InnerNavBar'; 
import {useInnerNavStyle} from "../../style/InnerNavStyle";
import mockIterationsDates from "../../mockDataDir/mockIterationDates";
import Row from "./SavedIterationsTable";
import mockFileTypes from "../../mockDataDir/mockFileTypes";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';

const WeightConfigurationPage = () => {
    const classes = useStyles();
    const fileTypes = mockFileTypes;
    var iterationDates = mockIterationsDates;
    const [iterDates, setIterDates] = useState(mockIterationsDates);

    const displayIcon = (selected) => {
        if(selected) {
            return (<IndeterminateCheckBoxIcon className={classes.minusButton}/>);
        }
        else {
            return(<AddBoxIcon className={classes.plusButton}/>);
        }
    }

    const CreateFileTypeWeightInput = (fileType) => {
        const [selected, setSelected] = React.useState(true); 

        const onSelectionClick = () => {
            setSelected(!selected); 
        }
    
        return (
            <React.Fragment>
                <IconButton className={classes.button} onClick={onSelectionClick}>{displayIcon(selected)}</IconButton>
                <TextField id={fileType} label={fileType} disabled={!selected} variant="outlined" type="number"></TextField>
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
                                //<Row key={iterationDates.iterationName} deleteButton={DeleteRow} row={iterationDates}/>
                                <TableRow key={row.name} hover={true}>
                                    <TableCell align="center">{row.iterationName}</TableCell>
                                    <TableCell align="center">{row.startDate}</TableCell>
                                    <TableCell align="center">{row.endDate}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" component="span" className={classes.deleteButton} onClick={DeleteRow} size="small">Delete</Button>
                                    </TableCell>
                                </TableRow>
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
                        <TextField id="ConfigName" label="Configuration Name" variant="outlined"></TextField>
                    </form>
                </Grid>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="MR" label="Merge Request Weight" variant="outlined" type="number"></TextField>
                    <TextField id="Commit" label="Commit Weight" variant="outlined" type="number"></TextField>
                    <TextField id="Line" label="Line of Code" variant="outlined" type="number"></TextField>
                    <TextField id="Deleted" label="Deleted Line" variant="outlined" type="number"></TextField>
                    <TextField id="Syntax" label="Syntax Change" variant="outlined" type="number"></TextField>
                </form>
            </Grid>
            <Grid item xs={10}>
                <Typography className={classes.subHeader1}>Configure Weights by File Type</Typography>
                <Divider className={classes.divider} orientation='horizontal'/>
                <Grid item xs={5}>
                    <form className={classes.root} noValidate autoComplete="off">
                        {fileTypes.map((fileType) => (
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