import React from "react";
import { Controller } from "react-hook-form";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InstrumentDictionary from '../../dictionaries/InstrumentDictionary';

// import { connect } from "react-redux";
// import { fetchUserData, editUser } from "../../actions/userActions";
// import { useFormContext } from "react-hook-form";
// import TextField from '@mui/material/TextField';

function UserInstrument() {
  // const {control, formState: { errors }} = useFormContext({
  //   defaultValues: props.users.user
  // });

  const userInstrumentFunction = (dictionary) => {
    let selectOptions = []

    for (let i = 0; i < Object.values(dictionary).length; i++){
      selectOptions.push( 
      <MenuItem 
        key={Object.keys(dictionary)[i]} 
        value={parseInt(Object.keys(dictionary)[i])}>
          {Object.keys(dictionary)[i]}. {Object.values(dictionary)[i]}
      </MenuItem>)
    }
    return selectOptions
  }

  return (
    <span className="instrument">
        
      <Controller 
        {...console.log()}
        name="instrument" 
        // control={control} 
        render={({ field }) => (
          <FormControl sx={{ ml: 0.5, mt: 1 }}>
            <InputLabel id="instrument">Primary Instrument</InputLabel>
            <Select
              {...field}
              label="instrument"
              id="instrument"
              variant="outlined"
              size="small"
              value={field.value || ""}
              margin="dense"
              sx={{ minWidth: 150 }}
            >
            <MenuItem key='0' value="0" disabled><em>Select Instrument</em></MenuItem>
              {userInstrumentFunction(InstrumentDictionary)}
          </Select>
        </FormControl>

      )}/>
    </span>
  );
}

export default UserInstrument;