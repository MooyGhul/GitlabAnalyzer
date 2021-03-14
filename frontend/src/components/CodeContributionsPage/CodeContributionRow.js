import React, {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {Avatar} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import * as PropTypes from "prop-types";
import {useRowStyles} from "./CodeContributionPageStyles";

CodeContributionRow.propTypes = {
  openAll: PropTypes.bool.isRequired,
};

function CodeContributionRow(props) {
  const { row, openAll } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow hover role ="checkbox" tabIndex={-1} className={classes.root}>
        <TableCell>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {open || openAll ? <ExpandLess className={classes.dropDownIcon} />
                              : <ExpandMore className={classes.dropDownIcon} />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.cell} align="left" component='th' scope='row'>
          {row.type === "MR" ? <Avatar className={classes.mrIcon}>M</Avatar>
                            : <Avatar className={classes.cIcon}>C </Avatar> }
        </TableCell>
        <TableCell className={classes.cell}  align="left">{row.date}</TableCell>
        <TableCell style={{width: 600}} align="left">{row.details}</TableCell>
        <TableCell className={classes.cell} align="left">{row.score}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: '#f1f0fc' }} colSpan={6}>
          <Collapse in={open || openAll} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <h2>Code Diff</h2>
              <div>This feature is coming soon.</div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default CodeContributionRow;