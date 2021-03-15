import {makeStyles} from '@material-ui/core/styles';

export const useGraphStyles = makeStyles({
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export const useTableStyles = makeStyles({
  table:{
    minWidth: 500,
  },
  banner:{
    background: '#d1d0ff',
    font: 'bold',
    fontSize: '1.2rem'
  },
});

export const usePaginationStyle = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  icons: {
    background: 'white',
  }
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
    background: '#fc8053',
  },
  cIcon: {
    color: 'white',
    background: '#6179ff',
  },
  dropDownIcon: {
    background: 'white',
  }
});

