import { connect } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";

import { schema } from "../components/userComponents/UserSchema";
import UserName from "../components/userComponents/UserName";
import UserContact from "../components/userComponents/UserContact";
import UserAddress from "../components/userComponents/UserAddress";
import UserBio from "../components/userComponents/UserBio";
// import UserTaxInfo from "../components/userComponents/UserTaxInfo";
import UserPaymentInfo from "../components/userComponents/UserPaymentInfo";

import UserPhoto from "../components/UserPhoto";
import StaffInfo from "../components/userComponents/StaffInfo";
import { fetchUserData, editUser } from "../actions/userActions";

import CircularProgress from "@mui/material/CircularProgress";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

function UserDetails(props) {
  const userFullName = `${props.user.first_name} ${props.user.last_name}`;
  const userid = props.match.params.id;
  const [userData, setUserData] = useState(null);

  const lastUpdatedDateTime = () => {
    let dateTime = props.user.updated_at
    let lastUpdated = new Date(dateTime)
    return <span>Last updated at {lastUpdated.toString()} </span>
  }

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: useMemo(() => {
      return props.user;
    }, [props])
  });
  
  useEffect(() => {
    setUserData(props.fetchUserData(userid));
  }, []);

  useEffect(() => {
    methods.reset(props.user);
  }, [props.user]);
    
  const onHandleSubmit = (data) => {
    // Do something with the data
    console.log("handleSubmit/Form data: ", data);
    // props.editUser(data);
  }

  return !!props.user ? (
    // If data is loaded
    <div className="userDetails">
      <h1>
        Details for {userFullName}
      </h1>

      <FormProvider {...methods }>
        <form onSubmit={methods.handleSubmit(onHandleSubmit)}>
          <UserName />
          <br />
          <UserContact />
          <UserAddress />
          <UserBio />
          <UserPaymentInfo />
          {/* <UserTaxInfo /> */}
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
          {lastUpdatedDateTime()}
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