import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import React from "react";
import DayByDayTableTotalRow from "./DayByDayTableTotalRow";
import DayByDayTableRow from "./DayByDayTableRow";
import {useStyles} from "../../../style/ScoreBreakdownStyles";

export default function DayByDayTable(props) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className={classes.banner}>
            <TableCell align="left" className={classes.banner}>Date</TableCell>
            <TableCell align="left" className={classes.banner}>.js</TableCell>
            <TableCell align="left" className={classes.banner}>.java</TableCell>
            <TableCell align="left" className={classes.banner}>.css</TableCell>
            <TableCell align="left" className={classes.banner}>.html</TableCell>
            <TableCell align="left" className={classes.banner}>MR Score</TableCell>
            <TableCell align="left" className={classes.banner}>Issue Score</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <DayByDayTableRow date={Date.now()} scores={{ '.js': 0, '.java': 0, '.css': 0, '.html': 0 }} mrScore={0} issueScore={0} />
          <DayByDayTableRow date={Date.now() + 86400000} scores={{ '.js': 5, '.java': 3, '.css': 44, '.html': 643 }} mrScore={12} issueScore={22}/>
          <DayByDayTableTotalRow scores={{ '.js': 5, '.java': 3, '.css': 44, '.html': 643 }} mrScore={12} issueScore={22}/>
        </TableBody>
      </Table>
    </TableContainer>
  )
}