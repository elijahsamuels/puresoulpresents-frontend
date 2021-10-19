import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { createNewUser } from "../actions/userActions";
import UserName from "../components/userComponents/UserName";
import UserContact from "../components/userComponents/UserContact";
// import { schema } from "../components/userComponents/UserSchema";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoadingButton from '@mui/lab/LoadingButton';
// import TextField from '@mui/material/TextField';

import { useForm, FormProvider } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

function CreateUser(props) {

  const methods = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      }
    });
  
  const onHandleSubmit = (data) => {
    // Do something with the data
    console.log("CreateUser/handleSubmit/Form data: ", data);
    props.createNewUser(data);
  };

  return (
    <div className="createNewUser">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onHandleSubmit)}>
          <UserName />       
          <UserContact />       
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

export default connect(null, { createNewUser })(CreateUser);
