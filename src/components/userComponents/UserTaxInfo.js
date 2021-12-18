import React from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';

function UserTaxInfo(props) {

  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.users.user
  });
  // console.log("props.users.user", props.users.user)

  return (
    <div className="userTaxDetails">
      <h3>Tax Information</h3>
      <div width="100">
        <h6>
          Name and address user for your taxes. This is the PureSoul equivalent
          for a W9 form. Earnings more than $600 (USD) per calendar year will
          receive a 1099 form via email.
        </h6>
      </div>

    <div>
      <Controller name="tax_first_or_business_name" control={control} render={({ field }) => (
        <TextField 
          {...field} 
          label="1. Name (as shown on your income tax form). Name is required. Do not leave blank."
          variant="outlined"
          placeholder="Name (as shown on your income tax form)"
          size="small"
          margin="dense"
          sx={{ ml: 0.5 }}
          value={field.value || ''}
          error={!!errors.tax_first_or_business_name}
          helperText={errors.tax_first_or_business_name ? errors.tax_first_or_business_name.message : ""}
          />
        )}/>
        
      <Controller name="tax_last_name" control={control} render={({ field }) => (
        <TextField 
          {...field} 
          label="2. Legal Last Name"
          variant="outlined"
          placeholder="Legal last name"
          size="small"
          margin="dense"
          sx={{ ml: 0.5}}
          value={field.value || ''}
          error={!!errors.tax_last_name}
          helperText={errors.tax_last_name ? errors.tax_last_name.message : ""}
          />
        )}/>
      </div>

      <div>
        <Controller name="tax_address1" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="5. Address line 1"
            variant="outlined"
            placeholder="Street number & name"
            type="text"
            size="small"
            margin="dense"
            sx={{ ml: 0.5}}
            value={field.value || ''}
            error={!!errors.tax_address1}
            helperText={errors.tax_address1 ? errors.tax_address1.message : ""}
            />
          )}/>

        <Controller name="tax_address2" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="5. Address line 2"
            variant="outlined"
            placeholder="Apt. number"
            type="text"
            size="small"
            margin="dense"
            sx={{ ml: 0.5}}
            value={field.value || ''}
            error={!!errors.tax_address2}
            helperText={errors.tax_address2 ? errors.tax_address2.message : ""}
            />
          )}/>
      </div>

      <div>
      <Controller name="tax_city" control={control} render={({ field }) => (
        <TextField 
          {...field} 
          label="6. City"
          variant="outlined"
          placeholder="San Diego"
          type="text"
          size="small"
          margin="dense"
          sx={{ ml: 0.5}}
          value={field.value || ''}
          error={!!errors.tax_city}
          helperText={errors.tax_city ? errors.tax_city.message : ""}
          />
        )}/>

        <Controller name="tax_state" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="6. State"
            variant="outlined" 
            placeholder="CA"
            type="text"
            size="small"
            margin="dense"
            sx={{ ml: 0.5}}
            value={field.value || ''}
            error={!!errors.tax_state}
            helperText={errors.tax_state ? errors.tax_state.message : ""}
            />
        )}/>

        <Controller name="tax_zip" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="6. Zip"
            variant="outlined"
            placeholder="12345"
            type="text"
            size="small"
            margin="dense"
            sx={{ ml: 0.5}}
            value={field.value || ''}
            error={!!errors.tax_zip}
            helperText={errors.tax_zip ? errors.tax_zip.message : ""}
            />
        )}/>
      </div>
      <div>
        <Controller name="taxID" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="TIN (Taxpayer Identification Number"
            variant="outlined"
            placeholder="SSN/EIN"
            type="text"
            size="small"
            margin="dense"
            sx={{ ml: 0.5}}
            value={field.value || ''}
            error={!!errors.taxID}
            helperText={errors.taxID ? errors.taxID.message : ""}
            />
        )}/>
      </div>

      <div>
        <ol>
          <strong>By saving my information here, I submit under penalty of perjury that:</strong>
          <li>My SSN or TIN above is correct.</li>
          <li>I am a U.S. person.</li>
          <li>I am not subject to backup withholding tax.</li>
          <li>I am not exempt from FATCA reporting.</li>
        </ol>
      </div>
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

export default connect(mapStateToProps, { fetchUserData, editUser })(UserTaxInfo);