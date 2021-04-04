import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Tooltip
} from "@material-ui/core";
import HelpIcon from '@material-ui/icons/Help'
import React from "react";
import MergeRequestsTableRow from "./MergeRequestsTableRow";
import MergeRequestsTableTotalRow from "./MergeRequestsTableTotalRow";
import {useStyles} from "../../../style/ScoreBreakdownStyles";

export default function MergeRequestsTable(props) {
  const classes = useStyles();
  const totalScoreNote = `The total score may be lower than the merged score when the user contributed to a multiple-participant MR.
  This is due to the total score factoring in the commit author whereas the merged score does not consider this during calculation.`;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className={classes.banner}>
            <TableCell align="left" className={classes.banner}>Merge Date</TableCell>
            <TableCell align="left" className={classes.banner}>MR Title</TableCell>
            <TableCell align="left" className={classes.banner}>Collaborators</TableCell>
            <TableCell align="left" className={classes.banner}>Merged Code Score</TableCell>
            <TableCell align="left" className={classes.banner}>Total Code Score <Tooltip title={totalScoreNote}><HelpIcon fontSize="inherit"/></Tooltip></TableCell>
            <TableCell align="left" className={classes.banner}>Comment Score</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
        <MergeRequestsTableRow
          mergeRequest={{ mergeRequestName: 'Resolve "Create Extractor Class"', mergedAt: new Date().toString() }}
          mergedCodeScore={39}
          totalCodeScore={120}
          commentScore={0}
        />
        <MergeRequestsTableTotalRow soloOnly mergedCodeScore={39} totalCodeScore={120} commentScore={0}/>
        <MergeRequestsTableTotalRow mergedCodeScore={39} totalCodeScore={120} commentScore={0}/>
      </Table>
    </TableContainer>
  )
}