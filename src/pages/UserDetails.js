import { connect } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";

import { schema } from "../components/userComponents/UserSchema";
import UserName from "../components/userComponents/UserName";
import UserContact from "../components/userComponents/UserContact";
import UserAddress from "../components/userComponents/UserAddress";
import UserBio from "../components/userComponents/UserBio";
import UserTaxInfo from "../components/userComponents/UserTaxInfo";
import UserPaymentInfo from "../components/userComponents/UserPaymentInfo";
import StaffInfo from "../components/userComponents/StaffInfo";
import UserPhoto from "../components/userComponents/UserPhoto";
import { fetchUserData, editUser } from "../actions/userActions";

import LoadingCircularProgress from '../components/staticComponents/LoadingCicularProgress.js';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Tooltip from '@mui/material/Tooltip';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';


import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

function UserDetails(props) {
  const userFullName = `${props.users.user.first_name} ${props.users.user.last_name}`;
  const userid = props.match.params.id;
  const [userData, setUserData] = useState(null);

  const lastUpdatedDateTime = () => {
    let dateTime = props.users.user.updated_at
    let lastUpdated = new Date(dateTime)
    return <span>Last updated at {lastUpdated.toString()} </span>
  }

  const dateTimeUserCreated = () => {
    let dateTime = props.users.user.created_at
    let userCreated = new Date(dateTime)
    return <span>{userFullName} was created at {userCreated.toString()} </span>
  }

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: useMemo(() => {
      return props.users.user;
    }, [props.users.user])
  });
  
  useEffect(() => {
    setUserData(props.fetchUserData(userid));
  }, []);

  useEffect(() => {
    methods.reset(props.users.user);
  // }, [props.users.user]);
  }, [methods, props.users.user]);

const colorChangeLoadingButton = () => {
    if (methods.formState.isDirty === false) {
      // disable the save button. Prevents unnecessary API calls
    return <LoadingButton
      color="primary"
      disableRipple={true}
      loadingPosition="start"
      startIcon={<SaveIcon />}
      variant="contained"
      // type="submit"
      >
       <Tooltip title="Nothing changed to save.">
        <span>Save</span>
      </Tooltip>
      </LoadingButton>
  } else {
    return <LoadingButton
      color="error"
      disableRipple={true}
      loadingPosition="start"
      startIcon={<SaveIcon />}
      variant="contained"
      type="submit"
      >
      Save
      </LoadingButton>
    }
  }

  const onHandleSubmit = (data) => {
    // Do something with the data
    // console.log("handleSubmit/Form data: ", data);
    props.editUser(data);
  }

  // const Input = styled('input')({
  //   display: 'none',
  // });

  
  return !!props.users.user ? (
    // If data is loaded
    <div className="userDetails">
      <h1>
        Details for {userFullName}
      </h1>

      <FormProvider {...methods }>
        <form onSubmit={methods.handleSubmit(onHandleSubmit)}>
          <UserPhoto />
          <UserName />
          <UserContact />
          <UserAddress />
          <UserBio />
          <UserPaymentInfo />
          <StaffInfo />
          <UserTaxInfo /> 
          <br />
          {colorChangeLoadingButton()}
        </form>
          <div>{dateTimeUserCreated()}</div>
          <div>{lastUpdatedDateTime()}</div>
      </FormProvider>
    </div>
  ) : (
    <LoadingCircularProgress />
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUserData, editUser })(UserDetails);