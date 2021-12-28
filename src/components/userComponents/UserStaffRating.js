import React from "react";
import { Controller } from "react-hook-form";
// import { connect } from "react-redux";
// import { fetchUserData, editUser } from "../../actions/userActions";
// import { useFormContext } from "react-hook-form";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function UserStaffRating() {

  // const { control, formState: { errors }} = useFormContext({
  //   defaultValues: props.users.user
  //   });

    const userRatingObject = {
      1: "Great",
      2: "Good",
      3: "Ok",
      4: "Trainable",
      5: "Questionable",
      6: "Difficult",
      7: "Bad",
      8: "Hidden - Doesn't want gigs",
      9: "Hidden - Blacklisted"
    }

    const userRatingFunction = (userObject) => {
      let selectOptions = []
  
      for (let i = 0; i < Object.values(userObject).length; i++){
        selectOptions.push( 
        <MenuItem 
          key={Object.keys(userObject)[i]} 
          value={Object.keys(userObject)[i]}>
            {Object.keys(userObject)[i]}. {Object.values(userObject)[i]}
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
              {userRatingFunction(userRatingObject)}

          </Select>
        </FormControl>
        )}/>
    </span>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     loading: state.loading,
//     users: state.users,
//     user: state.user,
//   };
// };

export default UserStaffRating;
// export default connect(mapStateToProps, { fetchUserData, editUser })(UserStaffRating);
