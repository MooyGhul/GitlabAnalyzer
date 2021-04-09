import {makeStyles} from "@material-ui/core/styles";

export const useGraphStyles = makeStyles({
  graph: {
    width: "60vw",
    height: "30vh",
    margin: "20px 0 20px 0",
  },
  table: {
    margin: "0 auto 0 auto",
    width: "90%",
  },
});

export const useSwitchStyles = makeStyles({
  root: {
    width: 95,
    height: 48,
    padding: 8,
    left: "55vw",
  },
  switchBase: {
    padding: 11,
    color: '#ee0979',
  },
  thumb: {
    width: 26,
    height: 26,
    backgroundColor: '#ffffff',
  },
  track: {
    background: 'linear-gradient(to right, #ee0979, #ee0979)',
    opacity: '1 !important',
    borderRadius: 20,
    position: 'relative',
    '&:before, &:after': {
      display: 'inline-block',
      position: 'absolute',
      top: '50%',
      width: '50%',
      transform: 'translateY(-50%)',
      color: '#ffffff',
      textAlign: 'center',
    },
    '&:before': {
      content: '"counts"',
      left: 4,
      opacity: 0,
    },
    '&:after': {
      content: '"score"',
      right: 7,
    },
  },
  checked: {
    '&$switchBase': {
      color: '#43cea2',
      transform: 'translateX(45px)',
      '&:hover': {
        backgroundColor: '185AFF',
      },
    },
    '& $thumb': {
      backgroundColor: '#ffffff',
    },
    '& + $track': {
      background: 'linear-gradient(to right, #43cea2, #43cea2)',
      '&:before': {
        opacity: 1,
      },
      '&:after': {
        opacity: 0,
      }
    },
  },
});

export const useTableStyles = makeStyles({
  banner: {
    background: "#d1d0ff",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  expandBtn: {
    position: "fixed",
    bottom: "1vh",
    right: "1vw",
    backgroundColor: "#7553ff",
    width: "8%",
    color: "white"
  }
});

export const usePaginationStyle = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginRight: theme.spacing(65),
  },
  icons: {
    backgroundColor: "none",
  },
}));

export const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  cell: {
    width: 300,
  },
  mrIcon: {
    color: "white",
    background: "#fc8053",
  },
  cIcon: {
    color: "white",
    background: "#6179ff",
  },
  dropDownIcon: {
    background: "white",
  },
});
