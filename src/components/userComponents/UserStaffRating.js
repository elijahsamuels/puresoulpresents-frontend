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

    const userRatingFunction = (obj) => {
      let selectOptions = []
  
      for (let i = 0; i < Object.values(obj).length; i++){
        selectOptions.push(<MenuItem key={Object.keys(obj)[i]} value={Object.values(obj)[i]}>{Object.keys(obj)[i]}. {Object.values(obj)[i]}</MenuItem>)
      }
      return selectOptions
    }

  return (
    <span className="user-staff-rating">
      {/* <h3>Staff Rating</h3> */}

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
          {/* <MenuItem value="" disabled><em>Select Rating</em></MenuItem> */}
          <MenuItem key='0' value="0" disabled><em>Select Rating</em></MenuItem>
            {userRatingFunction(userRatingObject)}

          {/* <MenuItem value="1">1. Great</MenuItem>
          <MenuItem value="2">2. Good</MenuItem>
          <MenuItem value="3">3. Ok</MenuItem>
          <MenuItem value="4">4. Trainable</MenuItem>
          <MenuItem value="5">5. Questionable</MenuItem>
          <MenuItem value="6">6. Difficult</MenuItem>
          <MenuItem value="7">7. Bad</MenuItem>
          <MenuItem value="8">8. TBD</MenuItem>
          <MenuItem value="9">9. Hidden - Doesn't want gigs</MenuItem>
          <MenuItem value="0">0. Hidden - Blacklisted</MenuItem> */}
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
