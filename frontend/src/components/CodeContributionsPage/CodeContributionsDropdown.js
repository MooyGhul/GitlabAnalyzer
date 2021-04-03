import TableCell from "@material-ui/core/TableCell";
import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import LinkIcon from '@material-ui/icons/Link';
import TableRow from "@material-ui/core/TableRow";

const CodeContributionsDropdown = (props) => {
  const {row} = props;

    return (
        <Fragment>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell style={{width: 200}} align="left">
              <Button variant="outlined" color="primary" href={row.url} target="_blank" rel="noreferrer noopener">
                Link &nbsp;
                <LinkIcon />
              </Button>
            </TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.score}</TableCell>
          </TableRow>
        </Fragment>
    )
}

export default CodeContributionsDropdown;