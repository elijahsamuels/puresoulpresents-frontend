import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEventData, editEvent } from "../../actions/eventActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';

function EventNotes (props) {
// console.log("EventLocation/props.event: ", props.event)
  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.event,
  });

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

  return (
    <div className="eventNotes">

      <h3>
        Notes Component
      </h3>

      <Controller name="program" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Program" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.program}
        helperText={errors.program ? errors.program.message : ""}
        />
      )}/>

      <Controller name="set_list" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Set List" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.set_list}
        helperText={errors.set_list ? errors.set_list.message : ""}
        />
      )}/>

      <Controller name="staff_notes" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Staff Notes" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.staff_notes}
        helperText={errors.staff_notes ? errors.staff_notes.message : ""}
        />
      )}/>

      <Controller name="client_notes" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Client Notes" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.client_notes}
        helperText={errors.client_notes ? errors.client_notes.message : ""}
        />
      )}/>


      <div>{dateTimeEventCreated()}</div>
      <div>{lastUpdatedDateTime()}</div>

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

export default connect(mapStateToProps, { fetchEventData, editEvent })(EventNotes);