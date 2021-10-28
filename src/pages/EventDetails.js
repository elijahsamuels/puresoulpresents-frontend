import { connect } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";

import { schema } from "../components/eventComponents/EventSchema";
// import EventName from "../components/eventComponents/EventName";
// import EventContact from "../components/eventComponents/EventContact";
// import EventAddress from "../components/eventComponents/EventAddress";
// import EventBio from "../components/eventComponents/EventBio";
// import EventTaxInfo from "../components/eventComponents/EventTaxInfo";
// import EventPaymentInfo from "../components/eventComponents/EventPaymentInfo";
// import StaffInfo from "../components/eventComponents/StaffInfo";
// import EventPhoto from "../components/eventComponents/EventPhoto";

import { fetchEventData, editEvent } from "../actions/eventActions";

import CircularProgress from "@mui/material/CircularProgress";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

function EventDetails(props) {
  const eventid = props.match.params.id;
  const [eventData, setEventData] = useState(null);

  const lastUpdatedDateTime = () => {
    let dateTime = props.event.updated_at
    let lastUpdated = new Date(dateTime)
    return <span>Last updated at {lastUpdated.toString()} </span>
  }

  const dateTimeEventCreated = () => {
    let dateTime = props.event.created_at
    let eventCreated = new Date(dateTime)
    return <span>Created at {eventCreated.toString()} </span>
  }

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: useMemo(() => {
      return props;
    }, [props])
  });
  console.log("EventDetails/props: ", props)
  
  useEffect(() => {
    setEventData(props.fetchEventData(eventid));
  }, []);

  useEffect(() => {
    methods.reset(props.event);
  }, [props.event]);
    
  const onHandleSubmit = (data) => {
    // Do something with the data
    console.log("handleSubmit/Form data: ", data);
    props.editEvent(data);
  }

  return !!props.event ? (
    // If data is loaded
    <div className="eventDetails">
      <h1>
        Details for TBD
      </h1>

      <FormProvider {...methods }>
        <form onSubmit={methods.handleSubmit(onHandleSubmit)}>



          <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
          >
            Save
          </LoadingButton>
        </form>
          <div>{dateTimeEventCreated()}</div>
          <div>{lastUpdatedDateTime()}</div>
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
  return {
    loading: state.loading,
    users: state.users,
    event: state.events.event,
  };
};

export default connect(mapStateToProps, { fetchEventData, editEvent })(EventDetails);