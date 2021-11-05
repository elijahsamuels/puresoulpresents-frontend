import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEventData, editEvent } from "../../actions/eventActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';

function EventTimes (props) {
console.log("EventTimes/props.event: ", props.event)
  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.event,
  });
  // {console.log("props.event: ", props.event)}

  return (
    <div className="eventTimes">

      <h3>
        Times Component
      </h3>

      <div>
        <Controller name="load_in_time" control={control} render={({ field }) => (
          // console.log("load_in_time/field: ", field),
          <TextField 
          {...field}
          value={field.value}
          type="text"
          label="Load in Time" 
          variant="outlined" 
          size="small"
          margin="dense"
          sx={{ ml: 0.5}}
          error={!!errors.load_in_time}
          helperText={errors.load_in_time ? errors.load_in_time.message : ""}
          />
        )}/>

        <Controller name="soundcheck_time" control={control} render={({ field }) => (
          <TextField 
          {...field}
          type="text"
          label="Soundcheck Time" 
          variant="outlined" 
          size="small"
          margin="dense"
          sx={{ ml: 0.5 }} 
          error={!!errors.soundcheck_time}
          helperText={errors.soundcheck_time ? errors.soundcheck_time.message : ""}
          />
        )}/>

        <Controller name="soundcheck_complete_time" control={control} render={({ field }) => (
          <TextField 
          {...field}
          type="text"
          label="Soundcheck Complete Time" 
          variant="outlined" 
          size="small"
          margin="dense"
          sx={{ ml: 0.5 }} 
          error={!!errors.soundcheck_complete_time}
          helperText={errors.soundcheck_complete_time ? errors.soundcheck_complete_time.message : ""}
          />
        )}/>

        <Controller name="doors_open_time" control={control} render={({ field }) => (
          <TextField 
          {...field}
          type="text"
          label="Doors Open Time" 
          variant="outlined" 
          size="small"
          margin="dense"
          sx={{ ml: 0.5 }} 
          error={!!errors.doors_open_time}
          helperText={errors.doors_open_time ? errors.doors_open_time.message : ""}
          />
        )}/>
      </div>
      
      <div>
        <Controller name="start_time" control={control} render={({ field }) => (
          <TextField 
          {...field}
          type="text"
          label="Start Time" 
          variant="outlined" 
          size="small"
          margin="dense"
          sx={{ ml: 0.5}}
          error={!!errors.start_time}
          helperText={errors.start_time ? errors.start_time.message : ""}
          />
        )}/>

        <Controller name="set_1_start_time" control={control} render={({ field }) => (
          <TextField 
          {...field}
          type="text"
          label="Set 1" 
          variant="outlined" 
          size="small"
          margin="dense"
          sx={{ ml: 0.5 }} 
          error={!!errors.set_1_start_time}
          helperText={errors.set_1_start_time ? errors.set_1_start_time.message : ""}
          />
        )}/>

        <Controller name="set_2_start_time" control={control} render={({ field }) => (
          <TextField 
          {...field}
          type="text"
          label="Set 2" 
          variant="outlined" 
          size="small"
          margin="dense"
          sx={{ ml: 0.5 }} 
          error={!!errors.set_2_start_time}
          helperText={errors.set_2_start_time ? errors.set_2_start_time.message : ""}
          />
        )}/>

        <Controller name="end_time" control={control} render={({ field }) => (
          <TextField 
          {...field}
          type="text"
          label="End Time" 
          variant="outlined" 
          size="small"
          margin="dense"
          sx={{ ml: 0.5 }} 
          error={!!errors.end_time}
          helperText={errors.end_time ? errors.end_time.message : ""}
          />
        )}/>
      </div>
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

export default connect(mapStateToProps, { fetchEventData, editEvent })(EventTimes);