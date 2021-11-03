import React from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

function UserAddress (props) {

  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.users.user,
  });

  return (
    <div className="userContact">
      <h3>Address</h3>

      <div>
        <Controller name="address1" control={control} render={({ field }) => (
          <TextField 
            {...field}
            type="text"
            label="Street Address" 
            variant="outlined" 
            size="small"
            margin="dense"
            error={!!errors.address1}
            helperText={errors.address1 ? errors.address1.message : ""}
          />
        )}/>
        <Controller name="address2" control={control} render={({ field }) => (
            <TextField 
              {...field}
              type="text"
              label="Apt #" 
              variant="outlined" 
              size="small"
              margin="dense"
              sx={{ ml: 0.5}}
              error={!!errors.address2}
              helperText={errors.address2 ? errors.address2.message : ""}
            />
          )}/>
        </div>
        <div>
          <Controller name="city" control={control} render={({ field }) => (
            <TextField 
              {...field}
              type="text"
              label="City" 
              variant="outlined" 
              size="small"
              margin="dense"
              sx={{ ml: 0.5}}
              error={!!errors.city}
              helperText={errors.city ? errors.city.message : ""}
            />
          )}/>
          <Controller name="state" control={control} render={({ field }) => (
            <TextField 
              {...field}
              type="text"
              label="State"
              variant="outlined"
              size="small"
              margin="dense"
              sx={{ ml: 0.5}}
              error={!!errors.state}
              helperText={errors.state ? errors.state.message : ""}
            />
          )}/>
          <Controller name="zip_code" control={control} render={({ field }) => (
            <TextField 
              {...field}
              type="text"
              label="Zip Code"
              variant="outlined"
              size="small"
              margin="dense"
              sx={{ ml: 0.5}}
              error={!!errors.zip_code}
              helperText={errors.zip_code ? errors.zip_code.message : ""}
            />
            
            )}/>
          </div>

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

export default connect(mapStateToProps, { fetchUserData, editUser })(UserAddress);