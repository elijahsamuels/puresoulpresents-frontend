import React from "react";
import { Controller } from "react-hook-form";
  // import { connect } from "react-redux";
  // import { fetchUserData, editUser } from "../../actions/userActions";
  // import { useFormContext } from "react-hook-form";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import UserRatingObject from '../../dictionaries/UserRatingObject';

function UserStaffRating() {
    
    const userRatingFunction = (dictionary) => {
      let selectOptions = []
      // console.log("userRatingFunction/dictionary: ", dictionary)

      for (let i = 0; i < Object.values(dictionary).length; i++){
        selectOptions.push( 
        <MenuItem 
          key={Object.keys(dictionary)[i]} 
          value={Object.keys(dictionary)[i]}>
            {Object.keys(dictionary)[i]}. {Object.values(dictionary)[i]}
        </MenuItem>)
      }
      return selectOptions
    }

  return (
    <span className="user-staff-rating">
      <Controller 
        name="user_staff_rating" 
        // control={control} 
        render={({ field }) => (
          <FormControl sx={{ ml: 0.5, mt: 1 }}>
            <InputLabel id="user_staff_rating">Rating</InputLabel>
            <Select
              {...field}
              label="Rating"
              id="user_staff_rating"
              variant="outlined"
              size="small"
              margin="dense"
              sx={{ minWidth: 120 }}
            >
            <MenuItem key='0' value="0" disabled><em>Select Rating</em></MenuItem>
              {userRatingFunction(UserRatingObject)}

          </Select>
        </FormControl>
        )}/>
    </span>
  );
}

export default UserStaffRating;