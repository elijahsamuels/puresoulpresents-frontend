import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { createNewUser } from "../actions/userActions";
import UserName from "../components/userComponents/UserName";
import { schema } from "../components/userComponents/UserSchema";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoadingButton from '@mui/lab/LoadingButton';

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function CreateUser(props) {

  // console.log(props)
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: useMemo(() => {
      return props.user;
    }, [props]),
  });

  // useEffect(() => {
  //   methods.reset(props.user);
  // }, [props.user]);
  
// console.log("props: ", props)
// console.log("methods.watch('first_name' & 'last_name'): ", methods.watch('first_name' & 'last_name'));

  const onHandleSubmit = (data) => {
    // Do something with the data
    console.log("CreateUser/handleSubmit/Form data: ", data);
    props.createUser(data);
  };

  return (
    <div className="createUser">
      make me new!
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onHandleSubmit)}></form>
        {console.log("within FormProvider data: ", onHandleSubmit)}
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
      </FormProvider>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("CreateUser/state: ", state)
  return {
    loading: state.loading,
    // users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { createNewUser })(CreateUser);
