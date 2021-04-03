import React, {useState} from "react";
import {useParams} from "react-router";
import Grid from "@material-ui/core/Grid";
import Banner from "../Banner";
import Navbar from "../Navbar/Navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core";
import TablePaginationActions from "../TablePaginationActions";
import {formatTableDate} from "../../helper";

const ScoreBreakdown = (props) => {
  const { member_id } = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Grid container spacing={5} justify="center" alignItems="center">
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12}>
          <Banner memberName={member_id} type="commentContribution" />
        </Grid>
      </Grid>
      <Grid item>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">.js</TableCell>
                <TableCell align="left">.java</TableCell>
                <TableCell align="left">.css</TableCell>
                <TableCell align="left">.html</TableCell>
                <TableCell align="left">MR Comments</TableCell>
                <TableCell align="left">Issue Comments</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
            </TableBody>
              <TableRow>
                <TableCell>{formatTableDate(Date.now(), false)}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{formatTableDate(Date.now() + (24 * 60 * 60 * 1000), false)}</TableCell>
                <TableCell>15</TableCell>
                <TableCell>147</TableCell>
                <TableCell>21</TableCell>
                <TableCell>42</TableCell>
                <TableCell>32</TableCell>
                <TableCell>13</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Total</b></TableCell>
                <TableCell><b>15</b></TableCell>
                <TableCell><b>147</b></TableCell>
                <TableCell><b>21</b></TableCell>
                <TableCell><b>42</b></TableCell>
                <TableCell><b>32</b></TableCell>
                <TableCell><b>13</b></TableCell>
              </TableRow>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[100, 200, { label: "All", value: -1 }]}
                  count={0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">MR Title</TableCell>
                <TableCell align="left">Collaborators</TableCell>
                <TableCell align="left">Merged Code Score</TableCell>
                <TableCell align="left">Total Code Score</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
            </TableBody>
              <TableRow>
                <TableCell>{formatTableDate(Date.now(), false)}</TableCell>
                <TableCell>Resolve "Create Extractor Class"</TableCell>
                <TableCell>-</TableCell>
                <TableCell>39</TableCell>
                <TableCell>120</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Total (solo only)</b></TableCell>
                <TableCell><b>-</b></TableCell>
                <TableCell><b>-</b></TableCell>
                <TableCell><b>39</b></TableCell>
                <TableCell><b>120</b></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Total</b></TableCell>
                <TableCell><b>-</b></TableCell>
                <TableCell><b>-</b></TableCell>
                <TableCell><b>39</b></TableCell>
                <TableCell><b>120</b></TableCell>
              </TableRow>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[100, 200, { label: "All", value: -1 }]}
                  count={0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ScoreBreakdown;
