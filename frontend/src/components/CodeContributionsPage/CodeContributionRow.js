import React, {useState, Fragment} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {Avatar, Typography} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import * as PropTypes from "prop-types";
import {useRowStyles} from "../../style/CodeContributionPageStyles";
import {ComingSoonMsg} from "../../shared/ComingSoonMsg";
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

const CodeContributionRow = (props) => {
  const { row, expandAll } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const isOpen = () => {
    return open || expandAll;
  }

  const columns = [
    {id: 'gitlabLink', label: 'Gitlab Link'},
    {id: 'date', label: 'Date'},
    {id: 'name', label: 'Name'},
    {id: 'score', label: 'Score'},
  ]

  return (
    <Fragment>
      <TableRow hover role ="checkbox" tabIndex={-1} className={classes.root}>
        <TableCell>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {isOpen() ? <ExpandLess className={classes.dropDownIcon} />
                              : <ExpandMore className={classes.dropDownIcon} />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.cell} align="left" component='th' scope='row'>
          {row.type === "MR" ? <Avatar className={classes.mrIcon}>M</Avatar>
                            : <Avatar className={classes.cIcon}>C </Avatar> }
        </TableCell>
        <TableCell className={classes.cell} align="left">
          <Button variant="outlined" color="primary" href={row.url} target="_blank" rel="noreferrer noopener">
             Link &nbsp;
            <LinkIcon />
          </Button>
        </TableCell>
        <TableCell className={classes.cell}  align="left">{row.date}</TableCell>
        <TableCell style={{width: 600}} align="left">{row.name}</TableCell>
        <TableCell className={classes.cell} align="left">{row.score}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: '#f1f0fc' }} colSpan={7}>
          <Collapse in={isOpen()} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <h2>
                Commits
              </h2>
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
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

CodeContributionRow.propTypes = {
  expandAll: PropTypes.bool.isRequired,
};

export default CodeContributionRow;