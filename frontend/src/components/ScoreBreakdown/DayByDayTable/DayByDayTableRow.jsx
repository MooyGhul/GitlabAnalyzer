import {TableCell, TableRow} from "@material-ui/core";
import {formatTableDate} from "../../../helper";
import React from "react";
import PropTypes from "prop-types";
import {useStyles} from "../../../style/ScoreBreakdownStyles";

export default function DayByDayTableRow(props) {
  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell className={classes.cell}>{formatTableDate(props.date, false)}</TableCell>
      {Object.keys(props.scores).map((key) => <TableCell className={classes.cell}>{props.scores[key]}</TableCell>)}
      <TableCell className={classes.cell}>{props.mrScore}</TableCell>
      <TableCell className={classes.cell}>{props.issueScore}</TableCell>
    </TableRow>
  )
}

DayByDayTableRow.propTypes = {
  date: PropTypes.number.isRequired,
  scores: PropTypes.object.isRequired,
  mrScore: PropTypes.number.isRequired,
  issueScore: PropTypes.number.isRequired,
};
