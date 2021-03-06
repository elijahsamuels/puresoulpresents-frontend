import React from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';

function UserContact (props) {

  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.users.user,
  });

  return (
    <div className="userContactDetails">

      <Controller name="email" control={control} render={({ field }) => (
        <TextField 
          {...field}
          type="email"
          label="Email" 
          variant="outlined" 
          size="small"
          margin="dense"
          sx={{ ml: 0.5}}
          value={field.value || ''}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />
      )}/>
      
      <Controller name="phone" control={control} render={({ field }) => (
        <TextField 
          {...field}
          label="Phone" 
          variant="outlined" 
          size="small"
          margin="dense"
          sx={{ ml: 0.5}}
          value={field.value || ''}
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

export default connect(mapStateToProps, { fetchUserData, editUser })(UserContact);