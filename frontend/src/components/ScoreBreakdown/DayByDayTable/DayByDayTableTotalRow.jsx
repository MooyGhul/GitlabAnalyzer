import {TableCell, TableRow} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import {useStyles} from "../../../style/ScoreBreakdownStyles";

export default function DayByDayTableTotalRow(props) {
  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell className={classes.cell}><b>Total</b></TableCell>
      {Object.keys(props.scores).map((key) => <TableCell className={classes.cell}><b>{props.scores[key]}</b></TableCell>)}
      <TableCell className={classes.cell}><b>{props.mrScore}</b></TableCell>
      <TableCell className={classes.cell}><b>{props.issueScore}</b></TableCell>
    </TableRow>
  )
}

DayByDayTableTotalRow.propTypes = {
  scores: PropTypes.object.isRequired,
  mrScore: PropTypes.number.isRequired,
  issueScore: PropTypes.number.isRequired,
};
