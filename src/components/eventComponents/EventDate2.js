import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEventData, editEvent } from "../../actions/eventActions";
import { Controller, useFormContext, useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateAdapter from '@mui/lab/AdapterDateFns';
import FormControl from '@mui/material/FormControl';
// import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import DatePicker, { DateObject } from "react-multi-date-picker";

function EventDate (props) {

  console.log("props.event.event_date_utc:",props.event.event_date_utc)

  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.event,
  });

  const [submittedDate, setSubmittedDate] = useState();
  const [eventDate, setEventDate] = useState(null);

  const [dates, setDates] = useState(new Date(props.event.event_date_utc));
  // new DateObject(props.event.event_date_utc),

  const onSubmit = ({ date }) => { setSubmittedDate(date) };

  const handleChange = (newValue) => {
    setEventDate(newValue);
  };

  const datetimeConverterPostgresqlToJavascript = (datetime) => {
    let newDateTimeWithZone = new Date(datetime.replace("T", " ").toString()).toString()
    return newDateTimeWithZone
  }

  const datetimeConverterPostgresqlToJavascriptWithoutZone = (datetime) => {
    let newDateTimeWithoutZone = new Date(datetime.replace("T", " ").replace("Z", "").toString()).toString()
    return newDateTimeWithoutZone
  }

  const addZeroValue = (value) => {
    if (value < 10) {
      return `0${value+1}`
    } else {
      return value
    }
  }

  const inputDateConverterYYYYMMDD = (dateData) => {
    if (dateData){
      let d = new Date(dateData)
      let year = d.getFullYear()
      let month = addZeroValue(d.getMonth()+1)
      let date = addZeroValue(d.getDate())
      return `${year}-${month}-${date}`
    }
    return false
  }

  const outputDateConverterYYYYMMDD = (dateData) => {
    if (dateData){
      let d = new Date(dateData)
      let year = d.getFullYear()
      let month = addZeroValue(d.getMonth())
      let date = addZeroValue(d.getDate())
      return `${month}-${date}-${year}`
    }
    return false
  }

  const outputTitleDate = (dateData) => {
    if (dateData){
      let d = new Date(dateData)
      let year = d.getFullYear()
      let month = addZeroValue(d.getMonth())
      let date = addZeroValue(d.getDate())
      let day = d.getDay()
      return new Date(`${year}, ${month}, ${date}`).toDateString()
    }
    return false
  }


  return (
    <div className="EventDateDetails">
      <h3>Event Date: {outputTitleDate(props.event.event_date_utc)}</h3>
      Step 0{eventDate || "Missing Date"}
      <br/>
      Step 1{props.event.event_date_utc || "Missing Date"}
      <br/>
      Step 2{props.event.event_date_utc?.replace("T", " ").toString() || "Missing Date"}
      <br/>
      Step 3{new Date(props.event.event_date_utc?.replace("T", " ").toString()).toString() || "Missing Date"}
      <br/>
      {/* {outputDateConverterYYYYMMDD(datetimeConverterPostgresqlToJavascript(props.event.event_date_utc)) || "Missing Date"} */}
      {outputTitleDate(props.event.event_date_utc)}
      <div>DatePicker</div>
      <br />


      <DatePicker
        label="Event Type"
        id="event_date_utc"
        // {...field}
        value={dates}
        // onChange={setDates}
        onChange={(e) => console.log(e)}
        // value={props.event.event_date_utc || ""}
        // onChange={console.log(setDates)}
        // {...console.log("field.value", field.value)}
        // onChange={(date) => {field.onChange(date?.isValid ? date : "");}}
        format={
          navigator.language === "en-US" ? "MM/DD/YYYY" : "YYYY/MM/DD"
        }
      />


{/* 
      <Controller
        control={control}
        name="event_date_utc"
        // {...console.log()}
        // rules={{ required: true }} //optional
        // render={({ field: { onChange, onBlur, value, name, ref } }) => (
        render={({ field }) => (
          <FormControl sx={{ ml: 0.5, mt: 1, minWidth: 200 }}>
            <>
              <DatePicker
                label="Event Type"
                id="event_date_utc"
                {...field}
                value={field.value || ""}
                // onChange={setDates}

                {...console.log("field.value", field.value)}

                // onChange={(date) => {field.onChange(date?.isValid ? date : "");}}
                format={
                  navigator.language === "en-US" ? "MM/DD/YYYY" : "YYYY/MM/DD"
                }
              />
            </>
          </FormControl>
        )}
      /> */}

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