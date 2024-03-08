import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import Basicform from './basicform';
import { Grid } from '@mui/material';

//From  https://mui.com/x/react-date-pickers/date-time-picker/
export default function AppointmentPicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6}>
          <StaticDateTimePicker orientation="landscape" />
        </Grid>
        <Grid item xs={6}>
          <Basicform />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
