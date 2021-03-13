import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LastPageIcon from '@material-ui/icons/LastPage';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Avatar, TableFooter, TablePagination} from "@material-ui/core";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import moment from 'moment';
import * as PropTypes from "prop-types";
import axios from "axios";

const columns = [
  {id: 'type', label: 'Type'},
  {id: 'date', label: 'Date'},
  {id: 'details', label: 'Details'},
  {id: 'score', label: 'Score'},
]

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  cell: {
    width: 300,
  }
});

function Row(props) {
  const { row, openAll } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow hover role ="checkbox" tabIndex={-1} className={classes.root}>
        <TableCell>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {open || openAll ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.cell} align="left" component='th' scope='row'>
          {row.type === "MR" ? <Avatar>M</Avatar> : <Avatar>C</Avatar> }
        </TableCell>
        <TableCell className={classes.cell}  align="left">{row.date}</TableCell>
        <TableCell style={{width: 600}} align="left">{row.details}</TableCell>
        <TableCell className={classes.cell} align="left">{row.score}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open || openAll} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <h2>Code Diff</h2>
              <div>To be Added...</div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  openAll: PropTypes.bool.isRequired,
};

const usePaginationStyle = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = usePaginationStyle();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  table:{
    minWidth: 500,
  },
});

function CodeContributionTable () {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAll, setOpenAll] = useState(false);
  const [commitData, setCommitData] = useState([]);
  const [mrData, setMRData] = useState([]);
  const [codeContributionRows, setCodeContributionRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultCommit = await axios.get('http://localhost:8080/project/2/commits');
      setCommitData(resultCommit.data);

      const resultMR = await axios.get('http://localhost:8080/project/2/merge_requests');
      setMRData(resultMR.data);
    }
    fetchData().then(() => {
      console.log("Successful data retrieval");

    }).catch(() => {
      console.log("Failed retrieve data ");
    });
    codeContributionData();

  },[]);

  // console.log(commitData);
  // console.log(mrData);
  console.log("Rows: ");
  console.log(codeContributionRows);

  const createData = (id, type, date, details, score) => {
    return {id, type, date, details, score};
  }

  const codeContributionData = () => {
    let ccArray = [];
    for(let i = 0; i < commitData.length; i++) {
      ccArray.push(createData(commitData[i].commitId,
                        'commit',
                              commitData[i].commitDate,
                              commitData[i].commitName,
                              14));
    }

    for(let i = 0; i < mrData.length; i++) {
      if(mrData[i].status === 'merged')
      ccArray.push(createData(mrData[i].id,
                              "MR",
                              mrData[i].createdAt,
                              "Merge Request merged at " + mrData[i].mergedAt,
                              24));
    }

    setCodeContributionRows(ccArray);
    codeContributionRows.sort((a,b) => {
      return a.date - b.date
    })
  };

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
               <TableCell>
                  <IconButton size='small' onClick={() => setOpenAll(!openAll)}>
                    {openAll ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </TableCell>
                {columns.map((column) => (
                <TableCell key={column.id}>
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
              <Row key ={row.id} row={row} openAll={openAll} />
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
