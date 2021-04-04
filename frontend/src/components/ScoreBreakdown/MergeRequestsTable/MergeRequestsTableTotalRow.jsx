import PropTypes from "prop-types";
import {TableCell, TableRow} from "@material-ui/core";
import React from "react";
import {useStyles} from "../../../style/ScoreBreakdownStyles";

export default function MergeRequestsTableTotalRow(props) {
  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell className={classes.cell}><b>Total{props.soloOnly ? ' (solo only)' : ''}</b></TableCell>
      <TableCell className={classes.cell}><b>-</b></TableCell>
      <TableCell className={classes.cell}><b>-</b></TableCell>
      <TableCell className={classes.cell}><b>{props.mergedCodeScore}</b></TableCell>
      <TableCell className={classes.cell}><b>{props.totalCodeScore}</b></TableCell>
      <TableCell className={classes.cell}><b>{props.commentScore}</b></TableCell>
    </TableRow>
  )
}

MergeRequestsTableTotalRow.propTypes = {
  soloOnly: PropTypes.bool,
  mergedCodeScore: PropTypes.number.isRequired,
  totalCodeScore: PropTypes.number.isRequired,
  commentScore: PropTypes.number.isRequired,
};
