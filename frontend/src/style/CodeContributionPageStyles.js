import {makeStyles} from '@material-ui/core/styles';

export const useGraphStyles = makeStyles({
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  graph: {
    width: "60vw",
    height: '30vh',
    margin: "20px 0 20px 0"
},   

table: {
  margin: "0 auto 0 auto",
  width: "90%"
},
});

export const useTableStyles = makeStyles({
  
  banner:{
    background: '#d1d0ff',
    font: 'bold',
    fontSize: '1.2rem'
  },
});

export const usePaginationStyle = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginRight: theme.spacing(65),
  },
  icons: {
    backgroundColor: 'none',
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

