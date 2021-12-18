import React from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";
import { Controller, useFormContext } from "react-hook-form";

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function StaffInfo(props) {

  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.users.user
    });

  return (
    <div className="staffInfo">
      <h3>PureSoul Staff Notes</h3>

      <Controller name="staff_notes" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="Staff Notes"
            variant="outlined" 
            multiline={true}
            margin="dense"
            minRows="4"
            maxRows="20"
            sx={{ ml: 0.5 }}
            value={field.value || ''}
            error={!!errors.staff_notes}
            helperText={errors.staff_notes ? errors.staff_notes.message : ""}
            />
        )}/>

      <Controller name="nick_name" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="Nick Name"
            variant="outlined" 
            size="small"
            margin="dense"
            sx={{ ml: 0.5 }}
            value={field.value || ''}
            error={!!errors.nick_name}
            helperText={errors.nick_name ? errors.nick_name.message : ""}
            />
        )}/>

      <Controller name="user_staff_rating" control={control} render={({ field }) => (
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
          <MenuItem value="" disabled><em>Select Rating</em></MenuItem>
          <MenuItem value="1">1. Great</MenuItem>
          <MenuItem value="2">2. Good</MenuItem>
          <MenuItem value="3">3. Ok</MenuItem>
          <MenuItem value="4">4. Trainable</MenuItem>
          <MenuItem value="5">5. Questionable</MenuItem>
          <MenuItem value="6">6. Difficult</MenuItem>
          <MenuItem value="7">7. Bad</MenuItem>
          <MenuItem value="8">8. TBD</MenuItem>
          <MenuItem value="9">9. Hidden - Doesn't want gigs</MenuItem>
          <MenuItem value="0">0. Hidden - Blacklisted</MenuItem>
        </Select>
        </FormControl>
        )}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUserData, editUser })(StaffInfo);
