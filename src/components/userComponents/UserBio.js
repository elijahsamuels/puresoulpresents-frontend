import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";
import { useForm, Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';

function UserBio(props) {

  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.users.user
  });

  return (
    <div className="UserBio">
        
        <Controller name="bio" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="Bio"
            variant="outlined" 
            multiline={true}
            margin="dense"
            minRows="4"
            maxRows="20"
            error={!!errors.bio}
            helperText={errors.bio ? errors.bio.message : ""}
            />
        )}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log("UserBio state: ", state);
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUserData, editUser })(UserBio);
