import React from "react";
// import { connect } from "react-redux";
// import { fetchEventData, editEvent } from "../../actions/eventActions";
// import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// export {eventTypesSelectFunction}

function EventInquiryStatus () {

  // <MenuItem value="Inquiry">1. Inquiry</MenuItem>
  // {/* <MenuItem value="Negotiations">3. Negotiations</MenuItem> */}
  // <MenuItem value="Tentative Booking">2. Tentative Booking</MenuItem>
  // <MenuItem value="Tentative Expired">3. Tentative Expired</MenuItem>
  // <MenuItem value="Awaiting Deposit" >4. Awaiting Deposit</MenuItem>
  // <MenuItem value="Confirmed">5. Confirmed</MenuItem>
  // <MenuItem value="Green Light">6. Green Light</MenuItem>
  // <MenuItem value="Completed">7. Completed</MenuItem>
  // <MenuItem value="TBD" disabled>8. TBD</MenuItem>
  // <MenuItem value="Postponed">9. Postponed</MenuItem>
  // <MenuItem value="Cancelled">10. Cancelled</MenuItem>
  
  const eventStatusObject = {
    1: "Inquiry",
    2: "Tentative Booking",
    3: "Tentative Expired",
    4: "Awaiting Deposit",
    5: "TBD",
    6: "TBD",
    7: "TBD",
    8: "TBD",
    9: "Pending Hire Order",
    10: "Rescheduled",
    11: "Confirmed",
    12: "Green Light",
    13: "Completed",
    14: "Postponed",
    15: "Cancelled"
  }

  const eventTypesSelectFunction = (eventObject) => {

    let selectOptions = []

    for (let i = 0; i < Object.values(eventObject).length; i++){
      selectOptions.push(
      <MenuItem 
        key={Object.keys(eventObject)[i]} 
        value={Object.keys(eventObject)[i]}>
          {Object.keys(eventObject)[i]}. {Object.values(eventObject)[i]}
      </MenuItem>)
    }
    return selectOptions
  }
  
  return (    
    <Controller 
    name="status" 
    control={control} 
    render={({ field }) => (
    <React.Fragment>
      <FormControl sx={{ ml: 0.5, mt: 1, minWidth: 200 }}>
        <InputLabel id="status">Status</InputLabel>
        <Select
          {...field}
          label="Status"
          id="status"
          variant="outlined"
          size="small"
          margin="dense"
          // sx={{ ml: 0.5, mt: 1, minWidth: 200 }}
        >
          <MenuItem value="0" disabled><em>Status</em></MenuItem>
          <MenuItem value="Inquiry">1. Inquiry</MenuItem>
          {/* <MenuItem value="Negotiations">3. Negotiations</MenuItem> */}
          <MenuItem value="Tentative Booking">2. Tentative Booking</MenuItem>
          <MenuItem value="Tentative Expired">3. Tentative Expired</MenuItem>
          <MenuItem value="Awaiting Deposit" >4. Awaiting Deposit</MenuItem>
          <MenuItem value="Confirmed">5. Confirmed</MenuItem>
          <MenuItem value="Green Light">6. Green Light</MenuItem>
          <MenuItem value="Completed">7. Completed</MenuItem>
          <MenuItem value="TBD" disabled>8. TBD</MenuItem>
          <MenuItem value="Postponed">9. Postponed</MenuItem>
          <MenuItem value="Cancelled">10. Cancelled</MenuItem>
        </Select>
      </FormControl>
    </React.Fragment>
    )}/>
    
    );
};

// const mapStateToProps = (state) => {
//   return {
//     loading: state.loading,
//     users: state.users,
//     event: state.events.event,
//   };
// };

// export default connect(mapStateToProps, { fetchEventData, editEvent })(EventInquiryStatus);
export default EventInquiryStatus
