import React, { useState } from 'react'; 
import DateFnsUtils from '@date-io/date-fns';
import { 
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import "react-datepicker/dist/react-datepicker.css";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 225,
  },
}));

const Calendar = (props) => {
  const classes = useStyles();

  // I will move this hooks to the parent class (configure component) when it is merged.
  // then I will add a "making an array" logic to send all the configure thing to backend.
  const [startDate, setStartDate] = useState(new Date('January 1, 2021 00:00:00'));
  const [endDate, setEndDate] = useState(new Date('Dec 31, 2021 00:00:00'));

  const handleStartDate = (newDate) => {setStartDate(newDate)};
  const handleEndDate = (newDate) => {setEndDate(newDate)};

  const startDateChange = (event)=>{
    props.onStartDateChange(event);
  };
  const endDateChange = (event)=>{
    props.onEndDateChange(event);
  };

  return (
    <div>
      <form className={classes.container} noValidate>
        <TextField
          id="start-date"
          label="Start Date"
          type="datetime-local"
          defaultValue={new Date(props.startDate)}
          onChange={startDateChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <form className={classes.container} noValidate>
        <TextField
          id="end-date"
          label="End Date"
          type="datetime-local"
          defaultValue={new Date(props.endDate)}
          onChange={endDateChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      
{/* 
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={new Date(props.startDate)}
                onChange={startDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />

            </Grid>
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={new Date(props.endDate)}
                onChange={endDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />

            </Grid>
          </MuiPickersUtilsProvider> */}
  ​  </div>
  );
}



export default Calendar;