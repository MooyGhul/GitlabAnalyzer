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
    Button,
  } from "@material-ui/core";
import React, { useEffect, useState} from 'react';
import useStyles from '../../style/WeightConfigurationPageStyles'; 
import mockIterationsDates from "../../mockDataDir/mockIterationDates";
import Row from "./SavedIterationsTable";
import axios from "axios";
import {useParams} from "react-router";
import Calendar from "../Calendar";
import CreateFileTypeWeightInput from "./CreateFileTypeWeightInput";
import moment from 'moment';
import { AirlineSeatFlatAngled } from "@material-ui/icons";

const WeightConfigurationPage = ({token, startDate, endDate, handleStartDate, handleEndDate}) => {
    const classes = useStyles();
    let {project_id} = useParams();
    const [fileType, setFileType] = useState([]);
    const [iterDates, setIterDates] = useState([]);
    const [flag, setFlag] = useState(0);
    
    const defaultFileWeight = 1;
    const defaultCommitMRWeight = 1;
    const defaultLineOfCodeWeight = 1.2; 
    const defaultMinorCodeChangeWeight = 0.2;
    let configData = {
        "MergeRequest": defaultCommitMRWeight,
        "Commit": defaultCommitMRWeight,
        "Line": defaultLineOfCodeWeight,
        "Deleted": defaultMinorCodeChangeWeight,
        "Syntax": defaultMinorCodeChangeWeight,
    }

    const [iterationName, setIterationName] = useState('new Iteration');

    useEffect(() => {
      const fetchIterationsDates  = async () => {
        console.log("----START----");
        let iterationsDates = await axios.get(process.env.NODE_ENV === 'development' ?
              `${process.env.REACT_APP_DEVHOST}/configuration/iterations/all` :
              `configuration/iterations/all`);
        console.log("----iterationsDates----");
        console.log(iterationsDates.data);
        setIterDates(iterationsDates.data);
      }
      fetchIterationsDates();
    }, [flag]);

    const saveIterationConfiguration  = async () => {
      await axios.post(process.env.NODE_ENV === 'development' ?

            `${process.env.REACT_APP_DEVHOST}/configuration/newIterationConfig` :
            `/configuration/newIterationConfig`,
          {
            token: `${token}`,
            iterationName: `${iterationName}`,
            startDate:`${moment(startDate).format()}`,
            endDate:`${moment(endDate).format()}`
          }
      ).catch(function(error){
          console.log(error.response.status);
      });
      setFlag(flag+1);
      console.log(flag);
  }

    useEffect(() => {
        const fetchData = async () => {
          const languageResult = await axios.get(
            process.env.NODE_ENV === "development"
              ? `${process.env.REACT_APP_DEVHOST}/project/${project_id}/languages`
              : `/project/${project_id}/languages`
          );
          setFileType(languageResult.data);
          languageResult.data.forEach(lang => configData[lang] = defaultFileWeight);
        };

        fetchData()
          .then(() => {
            console.log("Successfully obtained languages");
          } )
          .catch((e) => {
            console.log("Failed to obtain languages");
            console.log(e);
        });
          
    }, [project_id, setFileType]);

    const getIterationNameFromTextField = (e) => {
      setIterationName(e.target.value);
    }

    const getValueFromTextField = (e) => {
        const textFieldId = e.target.id;
        const textFieldValue = e.target.value;
        configData[textFieldId] = textFieldValue;
    }

    const createTableHeader = () => {
        return(
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
        );
    }

    const DeleteRow = (rowName) => {
        let filteredIterations = iterDates.filter(iterDate => iterDate.iterationName !== rowName);
        setIterDates(filteredIterations);
    }

    const createTextFieldsForProjectWeights = () => {
        return(
            <form className={classes.textField} noValidate autoComplete="off">
                <TextField id="MergeRequest" label="Merge Request Weight" variant="outlined" type="number" defaultValue={defaultCommitMRWeight} onChange={getValueFromTextField}/>
                <TextField id="Commit" label="Commit Weight" variant="outlined" type="number" defaultValue={defaultCommitMRWeight} onChange={getValueFromTextField}/>
                <TextField id="Line" label="Line of Code" variant="outlined" type="number" defaultValue={defaultLineOfCodeWeight} onChange={getValueFromTextField}/>
                <TextField id="Deleted" label="Deleted Line" variant="outlined" type="number" defaultValue={defaultMinorCodeChangeWeight} onChange={getValueFromTextField}/>
                <TextField id="Syntax" label="Syntax Change" variant="outlined" type="number" defaultValue={defaultMinorCodeChangeWeight} onChange={getValueFromTextField}/>
            </form>  
        );
    } 

    return (
        <Grid container spacing={5} justify="center" alignItems="center" className={classes.root}>
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
                <form className={classes.textField} noValidate autoComplete="off">
                    <TextField id="IterationName" label="Iteration Name" variant="outlined" onChange={getIterationNameFromTextField}/>
                </form>
                <Typography className={classes.pageTitle}>
                  <Calendar startDate={startDate} endDate={endDate} handleStartDate={handleStartDate} handleEndDate={handleEndDate}/>
                </Typography>
                <Grid container justify="flex-end" direction="row">
                    <Grid item xs={10}>
                        <Button variant="contained" component="span" className={classes.addIterationButton} size="large" onClick={saveIterationConfiguration}>+ Add Iteration</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={7} >
                <Typography className={classes.subHeader}>Saved Iterations</Typography>
                <Divider className={classes.divider} orientation='horizontal'/>
                <TableContainer>
                    <Table>
                        <TableHead>
                            {createTableHeader()}
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
                    <form className={classes.textField} noValidate autoComplete="off">
                        <TextField id="ConfigName" label="Configuration Name" variant="outlined" onChange={getValueFromTextField}/>
                    </form>
                </Grid>
                {createTextFieldsForProjectWeights()}
            </Grid>
            <Grid item xs={10}>
                <Typography className={classes.subHeader1}>Configure Weights by File Type</Typography>
                <Divider className={classes.divider} orientation='horizontal'/>
                <Grid item xs={5}>
                    <form className={classes.textField} noValidate autoComplete="off">
                        {fileType.map((fileType) => (
                            <CreateFileTypeWeightInput key={fileType} fileType={fileType} defaultFileWeight={defaultFileWeight} configData={configData}/>
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