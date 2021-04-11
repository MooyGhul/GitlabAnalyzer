import TableCell from "@material-ui/core/TableCell";
import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import LinkIcon from '@material-ui/icons/Link';
import TableRow from "@material-ui/core/TableRow";
import {useDropdownStyles} from "../../style/CodeContributionPageStyles";

const CodeContributionsDropdown = (props) => {
  const {row} = props;
  const classes = useDropdownStyles();

    return (
        <Fragment>
          <TableRow className={classes.root} hover role ="checkbox" tabIndex={-1}>
            <TableCell style={{width: 150}} align="left">
              <Button variant="outlined" color="primary" href={row.url} target="_blank" rel="noreferrer noopener">
                Link &nbsp;
                <LinkIcon />
              </Button>
            </TableCell>
            <TableCell align="left">{row.date}</TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.score}</TableCell>
          </TableRow>
        </Fragment>
    )
}

export default CodeContributionsDropdown;