import React from 'react'; 
import DateFnsUtils from '@date-io/date-fns';
import { 
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import "react-datepicker/dist/react-datepicker.css";
import Grid from '@material-ui/core/Grid';

const Calendar = (props) => {
  const startDateChange = (event)=>{
    props.onStartDateChange(event);
  };
  const endDateChange = (event)=>{
    props.onEndDateChange(event);
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
          </MuiPickersUtilsProvider>
  ​  </div>
  );
}



export default Calendar;