import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEventData, editEvent } from "../../actions/eventActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateAdapter from '@mui/lab/AdapterDateFns';
// import { format, formatDistance, formatRelative, subDays } from 'date-fns'

function EventDate (props) {
// console.log("EventDate/props.event: ", props.event)
  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.event,
  });

  const addZeroValue = (value) => {
    if (value < 10) {
      return `0${value}`
    } else {
      return `${value}`
    }
  }
  const inputDateConverterYYYYMMDD = (dateData) => {
    if (dateData){
      let b = new Date(dateData)
      let year = b.getYear() + 1900
      let month = addZeroValue(b.getMonth()+1)
      let date = addZeroValue(b.getDate())
      return `${year}-${month}-${date}`
    }
  }
  const outputDateConverterYYYYMMDD = (dateData) => {
    if (dateData){
      let b = new Date(dateData)
      let year = b.getYear() + 1900
      let month = addZeroValue(b.getMonth())
      let date = addZeroValue(b.getDate())
      return `${year}-${month}-${date}`
    }
  }

  // const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));
  const [value, setValue] = useState(Date(props.event.event_date));
  // const [value, setValue] = useState(inputDateConverterYYYYMMDD(props.event.event_date));

  const handleChange = (newValue) => {
    console.log("newValue.target.value:", newValue.target.value)
    // setValue(newValue);
  };

  return (
    <div className="EventDateDetails">
      <h3>Event Date</h3>

      {/* {console.log(props.event.event_date)} */}
      {/* {console.log("date converter: ", inputDateConverterYYYYMMDD(props.event.event_date))} */}

      <div>DesktopDatePicker</div>
      <br />
      <Controller
        name="event_date"
        control={control}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/dd/yyyy"
                value={value}
                minDate={Date.now()}
                // orientation="landscape"
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            }
          </LocalizationProvider>
        )}
      />

      <div>Controller/Input</div>
      <div>props.event.event_date: {props.event.event_date}</div>
      <div>
        inputDateConverterYYYYMMDD:{" "}
        {inputDateConverterYYYYMMDD(props.event.event_date)}
      </div>

      {/* <Controller
        name="event_date"
        control={control}
        render={({ field }) => (
          <div>
            <br />
            // {console.log("field.value: ",field.value)}
            <div>props.event.event_date: {props.event.event_date}</div>
            <div>field.value: {field.value}</div>
            <div>inputDateConverterYYYYMMDD: {inputDateConverterYYYYMMDD(field.value)}</div>
            <div>value: {value}</div>
            <input
              type="date"
              name="event_date"
              autoComplete="off"
              // value={value}
              // value={inputDateConverterYYYYMMDD(value)}
              value={inputDateConverterYYYYMMDD(field.value) || ""}
              // onChange={handleChange}
              // onChange={(e) => handleChange(e)}
              // value={field.value}
            />
            <br />
          </div>
        )}
      /> */}

      {/* <Controller name="primary_contact_first_name" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Primary Contact First Name" 
        variant="outlined" 
        size="small"
        margin="dense"
        sx={{ ml: 0.5 }}
        value={field.value || ''}
        error={!!errors.primary_contact_first_name}
        helperText={errors.primary_contact_first_name ? errors.primary_contact_first_name.message : ""}
        />
      )}/> */}
    </div>
  );


};

const mapStateToProps = (state) => {

  return {
    loading: state.loading,
    users: state.users,
    event: state.events.event,
  };
};

export default connect(mapStateToProps, { fetchEventData, editEvent })(EventDate);