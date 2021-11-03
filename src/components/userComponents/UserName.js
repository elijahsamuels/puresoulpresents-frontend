import React from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';

function UserName(props) {

  const {control, formState: { errors }} = useFormContext({
    defaultValues: props.users.user
  });
    // console.log("watch(first_name):", watch("first_name"))
    // console.log("props.users.user:", props.users.user)

  return (
    <div className="userNameDetails">
        
        <Controller name="first_name" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="First Name"
            variant="outlined" 
            size="small"
            margin="dense"
            error={!!errors.first_name}
            helperText={errors.first_name ? errors.first_name.message : ""}
            />
        )}/>
        <Controller name="last_name" control={control} render={({ field }) => (
          <TextField 
          {...field} 
          label="Last Name" 
          variant="outlined" 
          size="small"
          margin="dense"
          sx={{ ml: 0.5}}
          error={!!errors.last_name}
          helperText={errors.last_name ? errors.last_name.message : ""}
          />
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

export default connect(mapStateToProps, { fetchUserData, editUser })(UserName);
