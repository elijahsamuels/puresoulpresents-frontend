import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";
import { useForm, Controller, useFormContext } from "react-hook-form";
// import { TextField } from "@material-ui/core";
import TextField from '@mui/material/TextField';

function UserPaymentInfo(props) {

  const { register, watch, reset, control, handleSubmit, setValue, formState: { errors }} = useFormContext({
    defaultValues: props.user
    });

  return (
    <div className="userPaymentsDetails">
      <h3>Payment Information</h3>
        <Controller name="account_name" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="Account Name"
            variant="outlined"
            placeholder="Name on your account"
            size="small"
            margin="dense"
            error={!!errors.account_name}
            helperText={errors.account_name ? errors.account_name.message : ""}
            />
        )}/>
        <Controller name="ach_number" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="ACH Routing Number"
            variant="outlined"
            placeholder="1234567"
            type="password"
            size="small"
            margin="dense"
            error={!!errors.ach_number}
            helperText={errors.ach_number ? errors.ach_number.message : ""}
            />
        )}/>

        <Controller name="tax_city" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="City for tax purposes"
            variant="outlined"
            placeholder="San Diego"
            type="text"
            size="small"
            margin="dense"
            error={!!errors.tax_city}
            helperText={errors.tax_city ? errors.tax_city.message : ""}
            />
        )}/>
        <Controller name="tax_state" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="State for tax purposes"
            variant="outlined" 
            placeholder="CA"
            type="text"
            size="small"
            margin="dense"
            error={!!errors.tax_state}
            helperText={errors.tax_state ? errors.tax_state.message : ""}
            />
        )}/>
        <Controller name="tax_zip" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="Zip code for tax purposes"
            variant="outlined"
            placeholder="12345"
            type="text"
            size="small"
            margin="dense"
            error={!!errors.tax_zip}
            helperText={errors.tax_zip ? errors.tax_zip.message : ""}
            />
        )}/>
        <Controller name="taxID" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="SSN/EIN"
            variant="outlined"
            placeholder="1234567"
            type="text"
            size="small"
            margin="dense"
            error={!!errors.taxID}
            helperText={errors.taxID ? errors.taxID.message : ""}
            />
        )}/>
      </div>
  );
}

const mapStateToProps = (state) => {
  console.log("UserPaymentInfo state: ", state);
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUserData, editUser })(UserPaymentInfo);
