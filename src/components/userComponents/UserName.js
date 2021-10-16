import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";
import { useForm, Controller, useFormContext } from "react-hook-form";
// import { TextField } from "@material-ui/core";
import TextField from '@mui/material/TextField';

function UserName(props) {
  // console.log("UserName preloadedValues: ", preloadedValues);
  // console.log("UserName props.user: ", props.user);
  const userFullName = `${props.user.first_name} ${props.user.last_name}`;

  const { register, watch, reset, control, handleSubmit, setValue, formState: { errors }} = useFormContext({
    defaultValues: props.user
    });
    // console.log("watch(first_name):", watch("first_name"))

  // useEffect(() => {
//     if (props.user) {
//       setValue(
//           { defaultValues: props.user }
//       );
//   }
// }, [props.user]);

    // you can do async server request and fill up form
    // reset({
    //   defaultValues: props.user
    // });
  // }, []);
  // },[]);


  // const onHandleSubmit = (data) => {
  //   // Do something with the data
  //   console.log("handleSubmit/Form data: ", data);
  // }

  return (
    <div className="userDetails">
      {/* <form onSubmit={handleSubmit(onHandleSubmit)}> */}
        <h3>User Information for {userFullName}</h3>
        
        {/* <Controller name="first_name" control={control} defaultValue={props.user.first_name} render={({ field }) => ( */}
        <Controller name="first_name" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="First Name"
            variant="outlined" 
            size="small"
            error={!!errors.first_name}
            helperText={errors.first_name ? errors.first_name.message : ""}
            />
        )}/>

        
        {/* <Controller name="last_name" control={control} defaultValue={props.user.last_name} render={({ field }) => ( */}
        <Controller name="last_name" control={control} render={({ field }) => (
          // console.log(field),
          <TextField 
          {...field} 
          label="Last Name" 
          variant="outlined" 
          size="small"
          error={!!errors.last_name}
          helperText={errors.last_name ? errors.last_name.message : ""}
          />
          )}/>
        {/* <Controller name="email" control={control} defaultValue={props.user.email} render={({ field }) => (
          <TextField 
            {...field}
            type="email"
            label="Email" 
            variant="outlined" 
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
        )}/>
        <Controller name="phone" control={control} defaultValue={props.user.phone} render={({ field }) => (
          <TextField 
            {...field}
            type="phone"
            label="Phone" 
            variant="outlined" 
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ""}
          />
        )}/> */}
        


        {/* <label htmlFor={"first_name"}>
          First Name 
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            {...register("first_name")}
          />
          {errors.first_name && <p>{errors.first_name.message}</p>}
          {errors.first_name && <p>Required field</p>}
          {errors.first_name && <p>{errors.first_name.message}</p>}
        </label> 

        <label htmlFor={"last_name"}>
          Last Name
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            {...register("last_name")}
          />
          {errors.last_name && <p>{errors.last_name.message}</p>}
        </label>
        */}

        {/* 
        <label htmlFor={"phone"}>
          Phone
          <input
            {...register("phone", { required: true, valueAsNumber: true })}
            placeholder="Phone"
          />
        </label> 
        */}

        {/* <input type="submit" /> */}
      {/* </form> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("UserName state: ", state);
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUserData, editUser })(UserName);
