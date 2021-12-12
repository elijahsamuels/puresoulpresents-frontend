import { connect } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";

import { schema } from "../components/eventComponents/EventSchema";
import EventMusicians from "../components/eventComponents/EventMusicians";
import EventContact from "../components/eventComponents/EventContact";
import EventLocation from "../components/eventComponents/EventLocation";
import EventTimes from "../components/eventComponents/EventTimes";
import EventFinances from "../components/eventComponents/EventFinances";
import EventNotes from "../components/eventComponents/EventNotes";

import { fetchEventData, editEvent } from "../actions/eventActions";

import CircularProgress from "@mui/material/CircularProgress";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Tooltip from '@mui/material/Tooltip';
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

function EventDetails(props) {
  const eventid = props.match.params.id;
  const [eventData, setEventData] = useState(null);

  const lastUpdatedDateTime = () => {
    let dateTime = props.event.updated_at
    let lastUpdated = new Date(dateTime)
    return <div>Last updated at {lastUpdated.toString()} </div>
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

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: useMemo(() => {
      return props.event;
    }, [props.event])
  });
  // console.log("EventDetails/props: ", props)
  
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
    // {console.log({...methods.formState.isDirty === false} ? "DIRTY!" : "CLEAN!")}
  }, [props.event]);
  
  // console.log("props.event.users: ", props.event.users)

  // useEffect(() => {
  //   // methods.reset(props.users);
  //   const users = props.users;

  //   // console.log("users: ", users)
  // }, [props.users]);

  const colorChangeLoadingButton = () => {
    if (methods.formState.isDirty === false) {
      // disable the save button. Prevents unnecessary API calls
      return <LoadingButton
        color="primary"
        disableRipple={true}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
        // type="submit"
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
        Save
        </LoadingButton>
      }
    }

  const onHandleSubmit = (data) => {
    // Do something with the data
    // console.log("handleSubmit/Form data: ", data);
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
        <div>Event Type: {props.event.event_type ? props.event.event_type : <font color="red">Missing Type</font>}</div>
        <div>Event Program: {props.event.program ? props.event.program : <font color="red">Missing Program</font>}</div>
        <div>Event Date: {new Date(props.event.event_date).toLocaleString('en-US', { weekday: 'long', day: 'numeric', year: 'numeric', month: 'long'})}</div>
        {/* <div>Users: {props.users[1].first_name}</div> */}

{/* 
      <h3>
        Musicians Component
      </h3>
        <div>Event Band Size: {props.event.band_size}</div> */}

      <FormProvider {...methods } >
      {/* {console.log({...methods})} */}
      {/* {console.log(Object.values({...methods.control.formState.dirtyFields}))} */}
        <form onSubmit={methods.handleSubmit(onHandleSubmit)}>
        <EventLocation />
        {/* <EventContact /> */}
        <EventMusicians />
        {/* <EventTimes /> */}
        {/* <EventFinances /> */}
        {/* <EventNotes /> */}
        <br />
        {colorChangeLoadingButton()}

          {/* <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
          >
            Save
          </LoadingButton> */}
          <br />
        </form>
          <div>{dateTimeEventCreated()}</div>
          <div>{lastUpdatedDateTime()}</div>
          <div>{dateTimeCurrent()}</div>
      </FormProvider>
    </div>
  ) : (
    // If the data is still loading
    <div className="loading">
      UGH! WE'RE LOADING!
      <CircularProgress color="error" />
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state.events.event)
  // console.log(state.events.event.users)
  return {
    loading: state.loading,
    // users: state.events.event.users,
    event: state.events.event,
  };
};

export default connect(mapStateToProps, { fetchEventData, editEvent })(EventDetails);