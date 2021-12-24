import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEventData, editEvent } from "../../actions/eventActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import EventTypes from "./EventTypes.js"

function EventNotes (props) {
  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.event,
  });

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

  // check event_type to see if program is displayed

  const showProgramIfConcert = () => {
    if (props.event.event_type?.toLowerCase().includes('wedding' || 'private' || 'corporate')) {
      return <></>
    } else {
      return <Controller name="program" control={control} render={({ field }) => (
        <TextField
        {...field}
        type="text"
        label="Program"
        variant="outlined"
        size="small"
        margin="dense"
        sx={{ ml: 0.5}}
        value={field.value || ''}
        error={!!errors.program}
        helperText={errors.program ? errors.program.message : ""}
        />
      )}/>
    }
  }

  return (
    <div className="eventNotes">

      <h3>
        Notes Component
      </h3>

    {showProgramIfConcert()}
    <EventTypes />

      <Controller name="set_list" control={control} render={({ field }) => (
        <TextField 
          {...field}
          type="text"
          label="Set List"
          variant="outlined"
          margin="dense"
          multiline={true}
          minRows="4"
          maxRows="20"
          size="small"
          sx={{ ml: 0.5}}
          value={field.value || ''}
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
          margin="dense"
          multiline={true}
          minRows="4"
          maxRows="20"
          size="small"
          sx={{ ml: 0.5}}
          value={field.value || ''}
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
          margin="dense"
          multiline={true}
          minRows="4"
          maxRows="20"
          size="small"
          sx={{ ml: 0.5}}
          value={field.value || ''}
          error={!!errors.client_notes}
          helperText={errors.client_notes ? errors.client_notes.message : ""}
          />
        )}/>


      {/* <div>{dateTimeEventCreated()}</div>
      <div>{lastUpdatedDateTime()}</div> */}

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