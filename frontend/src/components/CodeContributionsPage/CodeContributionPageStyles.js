import { makeStyles } from '@material-ui/core/styles';

export const useTableStyles = makeStyles({
  table:{
    minWidth: 500,
  },
  banner:{
    background: '#d1d0ff',
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
  },
  mrIcon:{
    color: 'white',
    background: '#3AD2E7',
  },
  cIcon: {
    color: 'white',
    background: '#E7AC3A',
  }
});

