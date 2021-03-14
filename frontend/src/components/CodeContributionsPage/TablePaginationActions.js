import {useTheme} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import * as PropTypes from "prop-types";
import React from "react";
import {usePaginationStyle} from "./CodeContributionPageStyles";

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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
        {theme.direction === 'rtl' ? <LastPageIcon className={classes.icons} />
                                  : <FirstPageIcon className={classes.icons}/>}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} >
        {theme.direction === 'rtl' ? <KeyboardArrowRight className={classes.icons}/>
                                  : <KeyboardArrowLeft className={classes.icons} />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft className={classes.icons}/>
                                  : <KeyboardArrowRight className={classes.icons}/>}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === 'rtl' ? <FirstPageIcon className={classes.icons} />
                                  : <LastPageIcon className={classes.icons} />}
      </IconButton>
    </div>
  );
}

export default TablePaginationActions;