import { connect } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";

import { schema } from "../components/eventComponents/EventSchema";
// import EventName from "../components/eventComponents/EventName";
import EventContact from "../components/eventComponents/EventContact";
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
    return <div>Last updated at {lastUpdated.toString()} </div>
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
      return props.event;
    }, [props.event])
  });
  // console.log("EventDetails/props: ", props)
  
  useEffect(() => {
    setEventData(props.fetchEventData(eventid));
  }, []);

  useEffect(() => {
    methods.reset(props.event);
  }, [props.event]);
    
  const onHandleSubmit = (data) => {
    // Do something with the data
    console.log("handleSubmit/Form data: ", data);
    // props.editEvent(data);
  }
  
  return !!props.event ? (
    // If data is loaded
    <div className="eventDetails">
      
      <h3>
        Overall Component
      </h3>
        <div>Event Type: {props.event.type}</div>
        <div>Event Program: {props.event.program}</div>
        <div>Event Date: {props.event.event_date}</div>



      {/* <h3>
        Contact Component
      </h3>
        <div>Event Primary Contact First Name: {props.event.primary_contact_first_name}</div>
        <div>Event Primary Contact Last Name: {props.event.primary_contact_last_name}</div>
        <div>Event Primary Contact Phone: {props.event.primary_contact_phone}</div>
        <div>Event Primary Contact Email: {props.event.primary_contact_email}</div> */}
{/* 
      <h3>
        Location Component
      </h3>
        <div>Event Address: {props.event.address1}</div>
        <div>Event City: {props.event.city}</div>
        <div>Event State: {props.event.state}</div>
        <div>Event Zip Code: {props.event.zip_code}</div>

      <h3>
        Times Component
      </h3>
        <div>Event Load in Time: {props.event.load_in_time}</div>
        <div>Event Soundcheck Time: {props.event.soundcheck_time}</div>
        <div>Event Doors Open Time: {props.event.doors_open_time}</div>
        <div>Event Start Time: {props.event.start_time}</div>
        <div>Event End Time: {props.event.end_time}</div>
        <div>Event End Time: {props.event.soundcheck_complete_time}</div>

      <h3>
        Finances Component
      </h3>
        <div>Event Total Amount: {props.event.total_amount}</div>
        <div>Event Deposit Amount: {props.event.deposit_amount}</div>
        <div>Event Balance Amount: {props.event.balance_amount}</div>
        <div>Event Invoice Sent: {props.event.invoice_sent}</div>
        <div>Event Invoice Paid: {props.event.invoice_paid}</div>
        <div>Event Invoice File: {props.event.invoice_file}</div>
        <div>Event Hire Order Recevied: {props.event.hire_order_recevied}</div>
        <div>Event Hire Order File: {props.event.hire_order_file}</div>
        <div>Event Musician Invoices Sent: {props.event.musician_invoices_sent}</div>

      <h3>
        Musicians Component
      </h3>
        <div>Event Band Size: {props.event.band_size}</div> */}


      <FormProvider {...methods }>
        <form onSubmit={methods.handleSubmit(onHandleSubmit)}>
        <EventContact />

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
    // users: state.users,
    event: state.events.event,
  };
};

export default connect(mapStateToProps, { fetchEventData, editEvent })(EventDetails);