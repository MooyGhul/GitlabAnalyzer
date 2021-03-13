import { makeStyles } from '@material-ui/core/styles';

export const useTableStyles = makeStyles({
  table:{
    minWidth: 500,
  },
});

export const usePaginationStyle = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

export const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  cell: {
    width: 300,
  }
});

