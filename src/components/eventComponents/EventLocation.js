import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEventData, editEvent } from "../../actions/eventActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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
        type="number"
        label="Venue Capacity"
        variant="outlined" 
        size="small"
        margin="dense"
        sx={{ ml: 0.5 }} 
        error={!!errors.venue_capacity}
        helperText={errors.venue_capacity ? errors.venue_capacity.message : ""}
        />
      )}/>

      <Controller name="status" control={control} render={({ field }) => (
        <span>
          <FormControl sx={{ ml: 0.5, mt: 1, minWidth: 200 }}>
          <InputLabel id="status">Status</InputLabel>
          <Select
            {...field}
            // onChange={e => setStatus(e.target.value)}
            // value={status} // this works to change the value of the select (and number of musicians), but changes between controlled to uncontrolled. Boo!
            // renderValue={() => status}
            label="Status"
            id="status"
            variant="outlined"
            size="small"
            margin="dense"
            // sx={{ ml: 0.5, mt: 1, minWidth: 200 }}
          >
          <MenuItem value="0" disabled><em>Status</em></MenuItem>
          <MenuItem value="Inquiry">1. Inquiry</MenuItem>
          <MenuItem value="Quote">2. Quote Sent</MenuItem>
          <MenuItem value="Negotiations">3. Negotiations</MenuItem>
          <MenuItem value="Confirmed">4. Confirmed</MenuItem>
          <MenuItem value="Green Light">5. Green Light</MenuItem>
          <MenuItem value="Completed">6. Completed</MenuItem>
          <MenuItem value="TBD">7. TBD</MenuItem>
          <MenuItem value="TBD">8. TBD</MenuItem>
          <MenuItem value="Postponed">9. Postponed</MenuItem>
          <MenuItem value="Cancelled">10. Cancelled</MenuItem>
        </Select>
        </FormControl>
        </span>
        )}/>

      <Controller name="indoor" control={control} render={({ field }) => (
        <span>
          <FormControl sx={{ ml: 0.5, mt: 1, minWidth: 150 }}>
            <InputLabel shrink id="indoor">Indoor/Outdoor</InputLabel>
              <Select
                {...field}
                // onChange={e => setindoor(e.target.value)}
                // value={indoor} // this works to change the value of the select (and number of musicians), but changes between controlled to uncontrolled. Boo!
                // renderValue={() => indoor}
                label="Indoor/Outdoor"
                id="indoor"
                variant="outlined"
                size="small"
                margin="dense"
                // sx={{ m: 0.5, minWidth: 200 }}
              >
              <MenuItem value="0" disabled><em>Indoor/Outdoor</em></MenuItem>
              <MenuItem value="true">1. Indoor</MenuItem>
              <MenuItem value="false">2. Outdoor</MenuItem>
            </Select>
          </FormControl>
        </span>
      )}/>

      <div>
        
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
          sx={{ ml: 0.5 }} 
          error={!!errors.city}
          helperText={errors.city ? errors.city.message : ""}
          />
        )}/>

        {/* Convert to a select field */}
        <Controller name="state" control={control} render={({ field }) => (
          <TextField 
          {...field}
          type="text"
          label="State" 
          variant="outlined" 
          size="small"
          margin="dense"
          sx={{ ml: 0.5 }} 
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
          sx={{ ml: 0.5 }} 
          error={!!errors.zip_code}
          helperText={errors.zip_code ? errors.zip_code.message : ""}
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

export default connect(mapStateToProps, { fetchEventData, editEvent })(EventLocation);