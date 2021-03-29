import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import {useDropDownStyles} from "../../style/CodeContributionPageStyles";

const CodeContributionsDropdown = (props) => {
  const classes = useDropDownStyles();
  const columns = [
      {id: 'gitlabLink', label: 'Gitlab Link'},
      {id: 'date', label: 'Date'},
      {id: 'name', label: 'Name'},
      {id: 'score', label: 'Score'},
    ]

    return (
      <Table size="small">
        <TableHead>
          <TableRow>
            {/*//remove one of these below after removing column: type in main table*/}
            <TableCell className={classes.banner} />
            <TableCell className={classes.banner}/>
            {columns.map((column) => (
              <TableCell className={classes.banner} key={column.id}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>

        </TableBody>
      </Table>
    )
}

export default CodeContributionsDropdown;