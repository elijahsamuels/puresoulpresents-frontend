import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";
import { useForm, Controller, useFormContext } from "react-hook-form";
// import { TextField } from "@material-ui/core";
import TextField from '@mui/material/TextField';

function UserContact (props) {
  // console.log("UserContact props.user:", props.user);

  const { register, control, handleSubmit, setValue, formState: { errors }} = useFormContext({
  });

  return (
    <div className="userContact">
      <h3>User Contact</h3>

      {/* <Controller name="email" control={control} defaultValue={props.user.email} render={({ field }) => ( */}
      <Controller name="email" control={control} render={({ field }) => (
          <TextField 
            {...field}
            type="email"
            label="Email" 
            variant="outlined" 
            size="small"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
        )}/>
        {/* <Controller name="phone" control={control} defaultValue={props.user.phone} render={({ field }) => ( */}
        <Controller name="phone" control={control} render={({ field }) => (
          <TextField 
            {...field}
            type="phone"
            label="Phone" 
            variant="outlined" 
            size="small"
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ""}
          />
        )}/>

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUserData, editUser })(
  UserContact
);
