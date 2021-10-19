import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { createNewUser } from "../actions/userActions";
import UserName from "../components/userComponents/UserName";
import { schema } from "../components/userComponents/UserSchema";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function CreateUser(props) {

  // console.log(props)
  const methods = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
    }
  });
  
  const onHandleSubmit = (data) => {
    // Do something with the data
    console.log("CreateUser/handleSubmit/Form data: ", data);
    // props.createUser(data);
  };

  return (
    <div className="createUser">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onHandleSubmit)}>
          <UserName />

        <br />
        
        <LoadingButton
          color="primary"
          loadingPosition="start"
          startIcon={<PersonAddIcon />}
          variant="contained"
          type="submit"
        >
          Add User
        </LoadingButton>
        </form>
      </FormProvider>
    </div>
  );
}



// const mapStateToProps = (state) => {
//   console.log("CreateUser/state: ", state)
//   return {
//     loading: state.loading,
//     // users: state.users,
//     user: state.user,
//   };
// };

export default connect(null, { createNewUser })(CreateUser);
