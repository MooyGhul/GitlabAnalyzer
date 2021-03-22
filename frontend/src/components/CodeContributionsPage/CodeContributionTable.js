import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {TableFooter, TablePagination} from '@material-ui/core';
import CodeContributionRow from "./CodeContributionRow";
import TablePaginationActions from "../TablePaginationActions";
import {useTableStyles} from '../../style/CodeContributionPageStyles';

const columns = [
  {id: 'type', label: 'Type'},
  {id: 'gitlabLink', label: 'Gitlab Link'},
  {id: 'date', label: 'Date'},
  {id: 'name', label: 'Name'},
  {id: 'score', label: 'Score'},
]

const CodeContributionTable = (props) => {
  const classes = useTableStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAll, setOpenAll] = useState(false);
  const {codeContributionRows} = props;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, codeContributionRows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.banner}>
                <IconButton size='small' onClick={() => setOpenAll(!openAll)}>
                  {openAll ? <ExpandLess className={classes.banner} />
                          : <ExpandMore className={classes.banner} />}
                </IconButton>
              </TableCell >
              {columns.map((column) => (
                <TableCell className={classes.banner} key={column.id}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
                ? codeContributionRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : codeContributionRows
            ).map((row) => (
              <CodeContributionRow key ={row.id} row={row} openAll={openAll} />
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={codeContributionRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default CodeContributionTable;
