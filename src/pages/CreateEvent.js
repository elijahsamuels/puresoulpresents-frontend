import { connect } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";

import { schema } from "../components/eventComponents/EventSchema";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EventMusicians from "../components/eventComponents/EventMusicians";
import EventContact from "../components/eventComponents/EventContact";
import EventLocation from "../components/eventComponents/EventLocation";
import EventTimes from "../components/eventComponents/EventTimes";
import EventFinances from "../components/eventComponents/EventFinances";
import EventNotes from "../components/eventComponents/EventNotes";

import { createNewEvent } from "../actions/eventActions";

import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Tooltip from '@mui/material/Tooltip';

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import LoadingCircularProgress from '../components/staticComponents/LoadingCircularProgress.js';

function CreateEvent(props) {
  // const eventid = props.match.params.id;
  // const [eventData, setEventData] = useState(null);

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    });
  
    // const methods = useForm({
    //   resolver: yupResolver(schema),
    //   mode: "all",
    //   defaultValues: useMemo(() => {
    //     return props.event;
    //   }, [props.event])
    // });
    
  const onHandleSubmit = (data) => {
    // Do something with the data
    console.log("CreateEvent/handleSubmit/Form data: ", data);
    props.createNewEvent(data);
  };

  // const lastUpdatedDateTime = () => {
  //   let producer = props.event.last_updated_by
  //   let dateTime = props.event.updated_at
  //   let lastUpdated = new Date(dateTime)
  //   return <div>Last updated at {lastUpdated.toString()}  { !!producer ? `by ${producer}` : ""} </div>
  // }

  // const dateTimeEventCreated = () => {
  //   let dateTime = props.event.created_at
  //   let eventCreated = new Date(dateTime)
  //   return <span>Created at {eventCreated.toString()} </span>
  // }

  // const dateTimeCurrent = () => {
  //   let dateTime = Date.now()
  //   let currentDateTime = new Date(dateTime)
  //   return <span>Currently: {currentDateTime.toString()} </span>
  // }

  const showProgramIfConcert = () => {
    if (props.event.event_type.toLowerCase().includes('wedding' || 'private' || 'corporate')) {
      return <></>
    } else {
      return <div>Event Program: {props.event.program ? props.event.program : <font color="red">Missing Program</font>}</div>
    }
  }

  useEffect(() => {
    // setEventData(props.fetchEventData(eventid));
  }, []);

  useEffect(() => {
    methods.reset(props.event);
  }, [props.event]);
  
  // const colorChangeLoadingButton = () => {
  //   if (methods.formState.isDirty === false) {
  //     // disable the save button. Prevents unnecessary API calls
  //     return <LoadingButton
  //       color="primary"
  //       disableRipple={true}
  //       loadingPosition="start"
  //       startIcon={<SaveIcon />}
  //       variant="contained"
  //       // type="submit"
  //       >
  //        <Tooltip title="Nothing changed to save.">
  //         <span>Save</span>
  //       </Tooltip>
  //       </LoadingButton>
  //   } else {
  //     return <LoadingButton
  //       color="error"
  //       disableRipple={true}
  //       loadingPosition="start"
  //       startIcon={<SaveIcon />}
  //       variant="contained"
  //       type="submit"
  //       >
  //       <Tooltip title="You need to save!">
  //         <span>Save</span>
  //       </Tooltip>
  //       </LoadingButton>
  //     }
  //   }

  // const onHandleSubmit = (data) => {
  //   props.editEvent(data);
  // }
  
  return (
    // If data is loaded
    <div className="CreateNewEvent">
      
      <h3>
        Overall Component
        <div>
        {/* {new Date(props.event.event_date).toLocaleString('en-US', { weekday: 'short', day: 'numeric', year: 'numeric', month: 'short'})} */}
        </div>

      </h3>
      
      <FormProvider {...methods } >
        <form onSubmit={methods.handleSubmit(onHandleSubmit)}>
          <EventLocation />
          <EventContact />
          {/* <EventMusicians /> */}
          {/* <EventTimes /> */}
          {/* <EventFinances /> */}
          {/* <EventNotes /> */}
          <br />

          <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<AddBoxIcon />}
            variant="contained"
            type="submit"
          >
            Add Event
          </LoadingButton>

          <br />
        </form>

      </FormProvider>
    </div>
    
  );
}

export default connect(null, { createNewEvent })(CreateEvent);