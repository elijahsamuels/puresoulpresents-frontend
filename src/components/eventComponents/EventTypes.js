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

function EventTypes () {
  // const { control, formState: { errors }} = useFormContext({
  //   defaultValues: props.event,
  // });

  const eventTypesObject = {
    1: "Wedding",
    2: "Corporate",
    3: "Candlelight Concert",
    4: "Concert",
    5: "Showcase",
    6: "Other",
    7: "TBD",
    8: "TBD",
    9: "TBD"
  }

// const eventTypesReturnFunction = (eventTypeKey) => {
// if (eventTypesObject.keys(eventTypeKey)) {
//   return eventTypesObject.values()
// }
//   return false
// }

  const eventTypesSelectFunction = (eventObject) => {
  // export function eventTypesSelectFunction(eventObject) {
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
      name="event_type" 
      // control={control} 
      render={({ field }) => (

        <FormControl sx={{ ml: 0.5, mt: 1, minWidth: 200 }}>
          <InputLabel id="event_type">Event Type</InputLabel>
          <Select
            {...field}
            label="Event Type"
            id="event_type"
            variant="outlined"
            size="small"
            margin="dense"
          >
            <MenuItem key='0' value="0" disabled><em>Event Type</em></MenuItem>
            {eventTypesSelectFunction(eventTypesObject)}
          </Select>
        </FormControl>
      )}
    />
  );
};

// const mapStateToProps = (state) => {
//   return {
//     loading: state.loading,
//     users: state.users,
//     event: state.events.event,
//   };
// };

// export default connect(mapStateToProps, { fetchEventData, editEvent })(EventTypes);
export default EventTypes
