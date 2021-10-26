import React from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";
import { useForm, Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';

function UserPaymentInfo(props) {

  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.users.user
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
            label="Account Number"
            variant="outlined"
            placeholder="1234567"
            type="password"
            size="small"
            margin="dense"
            error={!!errors.ach_number}
            helperText={errors.ach_number ? errors.ach_number.message : ""}
            />
        )}/>
        <Controller name="ach_routing_number" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="ACH Routing Number"
            variant="outlined"
            placeholder="1234567"
            type="password"
            size="small"
            margin="dense"
            error={!!errors.ach_routing_number}
            helperText={errors.ach_routing_number ? errors.ach_routing_number.message : ""}
            />
        )}/>

      </div>
  );
}

const mapStateToProps = (state) => {
  // console.log("UserPaymentInfo state: ", state);
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUserData, editUser })(UserPaymentInfo);
