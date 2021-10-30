import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEventData, editEvent } from "../../actions/eventActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';

function EventLocation (props) {
// console.log("EventLocation/props.event: ", props.event)
  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.event,
  });

  return (
    <div className="eventLocationDetails">

      <h3>
        Location Component
      </h3>

      <Controller name="venue_name" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Venue Name" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.venue_name}
        helperText={errors.venue_name ? errors.venue_name.message : ""}
        />
      )}/>

      <Controller name="venue_capacity" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Venue Capacity"
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.venue_capacity}
        helperText={errors.venue_capacity ? errors.venue_capacity.message : ""}
        />
      )}/>

      <Controller name="status" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Status" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.status}
        helperText={errors.status ? errors.status.message : ""}
        />
      )}/>

      <Controller name="indoor" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Indoor/Outdoor" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.indoor}
        helperText={errors.indoor ? errors.indoor.message : ""}
        />
      )}/>

      <Controller name="address1" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Street Address" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.address1}
        helperText={errors.address1 ? errors.address1.message : ""}
        />
      )}/>

      <Controller name="city" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="City" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.city}
        helperText={errors.city ? errors.city.message : ""}
        />
      )}/>

      <Controller name="state" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="State" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.state}
        helperText={errors.state ? errors.state.message : ""}
        />
      )}/>

      <Controller name="zip_code" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Zip Code" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.zip_code}
        helperText={errors.zip_code ? errors.zip_code.message : ""}
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

export default connect(mapStateToProps, { fetchEventData, editEvent })(EventLocation);