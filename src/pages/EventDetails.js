import { connect } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";

import { schema } from "../components/eventComponents/EventSchema";
import EventMusicians from "../components/eventComponents/EventMusicians";
import EventContact from "../components/eventComponents/EventContact";
import EventLocation from "../components/eventComponents/EventLocation";
import EventTimes from "../components/eventComponents/EventTimes";
import EventFinances from "../components/eventComponents/EventFinances";
import EventNotes from "../components/eventComponents/EventNotes";
import EventDate from "../components/eventComponents/EventDate";
import LoadingCircularProgress from '../components/staticComponents/LoadingCircularProgress.js';

import { fetchEventData, editEvent } from "../actions/eventActions";

import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Tooltip from '@mui/material/Tooltip';
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

function EventDetails(props) {

  // console.log(props.event)
  const eventid = props.match.params.id;
  const [eventData, setEventData] = useState(null);

  const lastUpdatedDateTime = () => {
    let producer = props.event.last_updated_by
    let dateTime = props.event.updated_at
    let lastUpdated = new Date(dateTime)
    return <div>Last updated at {lastUpdated.toString()}  { !!producer ? `by ${producer}` : ""} </div>
  }

  const dateTimeEventCreated = () => {
    let dateTime = props.event.created_at
    let eventCreated = new Date(dateTime)
    return <span>Created at {eventCreated.toString()} </span>
  }

  const dateTimeCurrent = () => {
    let dateTime = Date.now()
    let currentDateTime = new Date(dateTime)
    return <span>Currently: {currentDateTime.toString()} </span>
  }

  const showProgramIfConcert = () => {
    
    function EventProgramReturn() {
      return <div>Event Program: {props.event.program ? props.event.program : <font color="red">Missing Program</font>}</div>
    }

    if (props.event.event_type == null ) {
      EventProgramReturn()
    } else {
      if (props.event.event_type.toLowerCase().includes('wedding' || 'private' || 'corporate')) {
        return <></>
      } else {
        EventProgramReturn()
      }
    }
  }

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: useMemo(() => {
      return props.event;
    }, [props.event])
  });
  
  // useEffect(() => {
  //   let mounted = true
  //   if (!props.loading) {
  //     console.log("EventDetails/mounted: ", mounted)
  //     setEventData(props.fetchEventData(eventid))
  //     mounted = false
  //     console.log("EventDetails/mounted: ", mounted)
  //   }

  //   return () => {
  //     console.log("EventDetails/mounted: ", mounted)
  //     mounted = false
  //     setEventData().removeEventListener()
  //     console.log("EventDetails/mounted: ", mounted)
  //   }
  // }, []);

  useEffect(() => {
    setEventData(props.fetchEventData(eventid));
  }, []);

  useEffect(() => {
    methods.reset(props.event);
  }, [props.event]);
  
  const colorChangeLoadingButton = () => {
    if (methods.formState.isDirty === false) {
      // disable the save button. Prevents unnecessary API calls
      return <LoadingButton
        color="primary"
        disableRipple={true}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
        type="submit"
        >
         <Tooltip title="Nothing changed to save.">
          <span>Save</span>
        </Tooltip>
        </LoadingButton>
    } else {
      return <LoadingButton
        color="error"
        disableRipple={true}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
        type="submit"
        >
        <Tooltip title="You need to save!">
          <span>Save</span>
        </Tooltip>

        </LoadingButton>
      }
    }

  const onHandleSubmit = (data) => {
    console.log(data);
    props.editEvent(data);
  }
  
  return !!props.event && !!props.event.users ? (
    // If data is loaded
    <div className="eventDetails">
      
      <h3>
        Overall Component
        <div>
          {/* {props.event.event_type ? props.event.event_type : <font color="red">Missing Type</font>} */}
        {/* {props.event.program ? props.event.program : <font color="red">Missing Program</font>} */}
        {new Date(props.event.event_date).toLocaleString('en-US', { weekday: 'short', day: 'numeric', year: 'numeric', month: 'short'})}</div>

      </h3>
        <div>Event Type: {!!props.event.event_type ? props.event.event_type : <font color="red">Missing Type</font>}</div>
        {showProgramIfConcert()}
        {/* <div>Event Program: {props.event.program ? props.event.program : <font color="red">Missing Program</font>}</div> */}
        <div>Event Date: {new Date(props.event.event_date).toLocaleString('en-US', { weekday: 'long', day: 'numeric', year: 'numeric', month: 'long'})}</div>

{/* 
      <h3>
        Musicians Component
      </h3>
        <div>Event Band Size: {props.event.band_size}</div> */}

      <FormProvider {...methods } >
        <form onSubmit={methods.handleSubmit(onHandleSubmit)}>
          <EventDate />
          <EventLocation />
          <EventContact />
          {/* <EventMusicians /> */}
          <EventTimes />
          <EventFinances />
          <EventNotes />
          <br />
          {colorChangeLoadingButton()}
          <br />
        </form>
          <div>{dateTimeEventCreated()}</div>
          <div>{lastUpdatedDateTime()}</div>
          <div>{dateTimeCurrent()}</div>
      </FormProvider>
    </div>
  ) : (
    <LoadingCircularProgress />
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    // users: state.events.event.users,
    event: state.events.event,
  };
};

export default connect(mapStateToProps, { fetchEventData, editEvent })(EventDetails);