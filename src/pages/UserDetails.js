import { connect } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";
import UserPhoto from "../components/UserPhoto";
import StaffInfo from "../components/userComponents/StaffInfo";
import ContactInfo from "../components/userComponents/ContactInfo";
import TaxInfo from "../components/userComponents/TaxInfo";
import PaymentInfo from "../components/userComponents/PaymentInfo";
// import UserName from "../components/userComponents/UserName";
import UserName from "../components/userComponents/UserName";
// import UserName3 from "../components/userComponents/UserName3";
import UserContact from "../components/userComponents/UserContact";
import { fetchUserData, editUser } from "../actions/userActions";
// import Button from "@material-ui/core/Button";
import CircularProgress from "@mui/material/CircularProgress";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Must be a valid email address").required("Email is required"),
  phone: yup.string()
  .required("Phone number is required")
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(10, 'Must be exactly 10 digits')
  .max(10, 'Must be exactly 10 digits')
})

function UserDetails(props) {
  const userid = props.match.params.id;
  const [userData, setUserData] = useState(null);
  // console.log("props.user:", props.user);

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
    props.editUser(data);
  }

  return !!props.user ? (
    // If data is loaded
    <div className="userDetails">
      <h1>
        Details for {props.user.first_name} {props.user.last_name}
      </h1>

      <FormProvider {...methods }>
        <form onSubmit={methods.handleSubmit(onHandleSubmit)}>
          <UserName />
          <UserContact />
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