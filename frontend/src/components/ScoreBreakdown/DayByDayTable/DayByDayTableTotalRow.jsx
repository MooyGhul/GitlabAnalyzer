import {TableCell, TableRow} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import {useStyles} from "../../../style/ScoreBreakdownStyles";

export default function DayByDayTableTotalRow({ scores, mrScore, issueScore }) {
  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell className={classes.cell}><b>Total</b></TableCell>
      {Object.keys(scores).map((key) => <TableCell className={classes.cell}><b>{scores[key]}</b></TableCell>)}
      <TableCell className={classes.cell}><b>{mrScore}</b></TableCell>
      <TableCell className={classes.cell}><b>{issueScore}</b></TableCell>
    </TableRow>
  )
}

DayByDayTableTotalRow.propTypes = {
  scores: PropTypes.object.isRequired,
  mrScore: PropTypes.number.isRequired,
  issueScore: PropTypes.number.isRequired,
};
