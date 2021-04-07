import PropTypes from "prop-types";
import {TableCell, TableRow} from "@material-ui/core";
import {formatTableDate} from "../../../helper";
import React from "react";
import {useStyles} from "../../../style/ScoreBreakdownStyles";

export default function MergeRequestsTableRow({ mergeRequest, mergedCodeScore, totalCodeScore, commentScore }) {
  const classes = useStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell className={classes.cell}>{formatTableDate(mergeRequest.mergedAt)}</TableCell>
      <TableCell className={classes.cell}>{mergeRequest.mergeRequestName}</TableCell>
      <TableCell className={classes.cell}>-</TableCell>
      <TableCell className={classes.cell}>{mergedCodeScore}</TableCell>
      <TableCell className={classes.cell}>{totalCodeScore}</TableCell>
      <TableCell className={classes.cell}>{commentScore}</TableCell>
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
