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

import CircularProgress from "@mui/material/CircularProgress";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
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
  }, [props.users.user]);

  const onHandleSubmit = (data) => {
    // Do something with the data
    console.log("handleSubmit/Form data: ", data);
    props.editUser(data);
  }

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
          <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
          >
            Save
          </LoadingButton>
        </form>
          <div>{dateTimeUserCreated()}</div>
          <div>{lastUpdatedDateTime()}</div>
      </FormProvider>
    </div>
  ) : (
    // If the data is still loading
    <div className="loading">
      UGH! WE'RE LOADING!
      <CircularProgress color="error" />
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

export default connect(mapStateToProps, { fetchUserData, editUser })(UserDetails);