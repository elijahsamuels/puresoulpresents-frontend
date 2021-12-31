import React from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';

function UserInstrument(props) {

  const {control, formState: { errors }} = useFormContext({
    defaultValues: props.users.user
  });

  return (
    <div className="user-instrument">
        
        <Controller name="user_instrument_primary" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="User Instrument Primary"
            variant="outlined" 
            size="small"
            margin="dense"
            sx={{ ml: 0.5}}
            value={field.value?.instrument_id || ''}
            error={!!errors.user_instrument_primary}
            helperText={errors.user_instrument_primary ? errors.user_instrument_primary.message : ""}
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

export default connect(mapStateToProps, { fetchUserData, editUser })(UserInstrument);
