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
  } from "@material-ui/core";
import React, { useEffect, useState} from 'react';
import useStyles from '../../style/WeightConfigurationPageStyles'; 
import InnerNavBar from '../InnerNavBar'; 
import {useInnerNavStyle} from "../../style/InnerNavStyle";
import mockIterationsDates from "../../mockDataDir/mockIterationDates";
import Row from "./SavedIterationsTable";

const WeightConfigurationPage = () => {
    const classes = useStyles();

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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockIterationsDates.map((iterationDates) => (
                                <Row key={iterationDates.iterationName} row={iterationDates}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={10}>
                <Typography className={classes.subHeader}>Configure Score Weights</Typography>
                <Divider className={classes.divider} orientation='horizontal'/>
            </Grid>
            <Grid item xs={10}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="MR" label="Merge Request Weight" variant="outlined" type="number"></TextField>
                    <TextField id="Commit" label="Commit Weight" variant="outlined" type="number"></TextField>
                </form>
            </Grid>

        </Grid>
    );
}

export default WeightConfigurationPage; 