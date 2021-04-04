import PropTypes from "prop-types";
import {TableCell, TableRow} from "@material-ui/core";
import {formatTableDate} from "../../../helper";
import React from "react";
import {useStyles} from "../../../style/ScoreBreakdownStyles";

export default function MergeRequestsTableRow(props) {
  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell className={classes.cell}>{formatTableDate(props.mergeRequest.mergedAt)}</TableCell>
      <TableCell className={classes.cell}>{props.mergeRequest.mergeRequestName}</TableCell>
      <TableCell className={classes.cell}>-</TableCell>
      <TableCell className={classes.cell}>{props.mergedCodeScore}</TableCell>
      <TableCell className={classes.cell}>{props.totalCodeScore}</TableCell>
      <TableCell className={classes.cell}>{props.commentScore}</TableCell>
    </TableRow>
  )
}

MergeRequestsTableRow.propTypes = {
  mergeRequest: PropTypes.shape({
    mergedAt: PropTypes.string.isRequired,
    mergeRequestName: PropTypes.string.isRequired,
  }).isRequired,
  mergedCodeScore: PropTypes.number.isRequired,
  totalCodeScore: PropTypes.number.isRequired,
  commentScore: PropTypes.number.isRequired,
};
