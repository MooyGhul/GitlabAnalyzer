import React from 'react'; 
import DateFnsUtils from '@date-io/date-fns';
import { 
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import "react-datepicker/dist/react-datepicker.css";
import Grid from '@material-ui/core/Grid';

const Calendar = (startDate, endDate, onStartDateChange, onEndDateChange) => {
  const startDateChange = (event)=>{
    onStartDateChange.onChange(event.target.value);
  };
  const endDateChange = (event)=>{
    onEndDateChange.onChange(event.target.value);
  };
  

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={startDate}
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
                value={endDate}
                onChange={endDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
  ​  </div>
  );
}

export default Calendar;

