import {TableCell, TableRow} from "@material-ui/core";
import {formatTableDate} from "../../../helper";
import React from "react";
import PropTypes from "prop-types";
import {useStyles} from "../../../style/ScoreBreakdownStyles";

export default function DayByDayTableRow({ date, scores, mrScore, issueScore }) {
  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell className={classes.cell}>{formatTableDate(date, false)}</TableCell>
      {Object.keys(scores).map((key) => <TableCell className={classes.cell}>{scores[key]}</TableCell>)}
      <TableCell className={classes.cell}>{mrScore}</TableCell>
      <TableCell className={classes.cell}>{issueScore}</TableCell>
    </TableRow>
  )
}

DayByDayTableRow.propTypes = {
  date: PropTypes.number.isRequired,
  scores: PropTypes.object.isRequired,
  mrScore: PropTypes.number.isRequired,
  issueScore: PropTypes.number.isRequired,
};
