import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEventData, editEvent } from "../../actions/eventActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';

function EventContact (props) {
// console.log("EventContact/props.event: ", props.event)
  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.event,
  });

  return (
    <div className="eventContactDetails">

      <h3>
        Contact Component
      </h3>

      <Controller name="primary_contact_first_name" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Primary Contact First Name" 
        variant="outlined" 
        size="small"
        margin="dense"
        sx={{ ml: 0.5}}
        error={!!errors.primary_contact_first_name}
        helperText={errors.primary_contact_first_name ? errors.primary_contact_first_name.message : ""}
        />
      )}/>

      <Controller name="primary_contact_last_name" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Primary Contact Last Name" 
        variant="outlined" 
        size="small"
        margin="dense"
        sx={{ ml: 0.5 }} 
        error={!!errors.primary_contact_last_name}
        helperText={errors.primary_contact_last_name ? errors.primary_contact_last_name.message : ""}
        />
      )}/>

      <Controller name="primary_contact_email" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Email" 
        variant="outlined" 
        size="small"
        margin="dense"
        sx={{ ml: 0.5 }} 
        error={!!errors.primary_contact_email}
        helperText={errors.primary_contact_email ? errors.primary_contact_email.message : ""}
        />
      )}/>

      <Controller name="primary_contact_phone" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Phone" 
        variant="outlined" 
        size="small"
        sx={{ ml: 0.5 }} 
        margin="dense"
        error={!!errors.primary_contact_phone}
        helperText={errors.primary_contact_phone ? errors.primary_contact_phone.message : ""}
        />
      )}/>

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

export default connect(mapStateToProps, { fetchEventData, editEvent })(EventContact);