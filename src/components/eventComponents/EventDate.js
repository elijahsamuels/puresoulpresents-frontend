import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEventData, editEvent } from "../../actions/eventActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateAdapter from '@mui/lab/AdapterDateFns';
import FormControl from '@mui/material/FormControl';
// import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import DatePicker from "react-multi-date-picker";



function EventDate (props) {
// console.log("EventDate/props.event: ", props.event)
// console.log("EventDate/props.event.event_date: ", props.event.event_date)
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
      return `${month}-${date}-${year}`
    }
  }

  const [eventDate, setEventDate] = useState(props.event.event_date);
  // const [eventDate, setEventDate] = useState(new Date('2014-05-18T21:11:54'));
  // const [eventDate, setEventDate] = useState(Date(props.event.event_date));
  console.log(eventDate)
  console.log(props.event.event_date)
  // const [eventDate, setEventDate] = useState(inputDateConverterYYYYMMDD(props.event.event_date));

  const handleChange = (newValue) => {
    console.log("newValue.target.value:", newValue.target.value)
    console.log("newValue:", newValue)
    setEventDate(newValue);
  };

  return (
    <div className="EventDateDetails">
      <h3>Event Date</h3>

      {/* {console.log(props.event.event_date)} */}
      {/* {console.log("date converter: ", inputDateConverterYYYYMMDD(props.event.event_date))} */}

      <div>DatePicker</div>
      <br />

      <Controller
          control={control}
          name="event_date"
          rules={{ required: true }} //optional
          render={({ field }) => (
            <>
              <DatePicker
                {...console.log(eventDate)}
                value={outputDateConverterYYYYMMDD(eventDate) || ""}
                onChange={(date) => {
                  field.onChange(date?.isValid ? date : "");
                }}
                format={navigator.language === 'en-US' ? "MM/DD/YYYY" : "YYYY/MM/DD"}
              />
            </>
          )}
        />

      {/* <div>DesktopDatePicker</div>
      <br />
      <Controller
        name="event_date"
        control={control}
        render={({ field }) => (
          
          <TextField 
            {...field}
            {...console.log("field:", field)}
            type="text"
            label="Event Date"
            variant="outlined" 
            size="small"
            margin="dense"
            sx={{ ml: 0.5 }}
            // onChange={(e) => field.onChange(setEventDate(e.target.value))}
            value={field.value || ''}
            error={!!errors.venue_capacity}
            helperText={errors.venue_capacity ? errors.venue_capacity.message : ""}
          />
        )}/> */}
        {/* <br/>
        <br/>
        <input
          type="date"
          name="event_date"
          autoComplete="off"
          // value={eventDate}
          // value={inputDateConverterYYYYMMDD(eventDate)}
          value={inputDateConverterYYYYMMDD(eventDate) || ""}
          // onChange={handleChange}
          onChange={(e) => handleChange(e)}
          // value={field.value}
        /> */}

      {/* <Controller
        name="event_date"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ ml: 0.5, mt: 1, minWidth: 200 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {
                <DesktopDatePicker
                  {...field}
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  value={eventDate || ""}
                  // value={eventDate || field.value}
                  // minDate={Date.now()}
                  // orientation="landscape"
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params}/>}
                />
              }
            </LocalizationProvider>
          </FormControl>
        )}
      /> */}
<br />
<br />

      <div>Controller/Input</div>
      {/* <div>inputDateConverterYYYYMMDD: {outputDateConverterYYYYMMDD(props.event.event_date)}</div> */}
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
            <div>eventDate: {eventDate}</div>
            <input
              type="date"
              name="event_date"
              autoComplete="off"
              // value={eventDate}
              // value={inputDateConverterYYYYMMDD(eventDate)}
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