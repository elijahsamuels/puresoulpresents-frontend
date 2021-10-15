import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import UserPhoto from "../components/UserPhoto";
import StaffInfo from "../components/userComponents/StaffInfo";
import ContactInfo from "../components/userComponents/ContactInfo";
import TaxInfo from "../components/userComponents/TaxInfo";
import PaymentInfo from "../components/userComponents/PaymentInfo";
// import UserName from "../components/userComponents/UserName";
import UserName2 from "../components/userComponents/UserName2";
// import UserName3 from "../components/userComponents/UserName3";
import UserContact from "../components/userComponents/UserContact";
import { fetchUserData, editUser } from "../actions/userActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Must be a valid email address").required("Email is required"),
  phone: yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
})

function UserDetails(props) {
  console.log("props.user:", props.user);

  const [userData, setUserData] = useState(null);

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: props.user,
  });

  useEffect(() => {
    const userid = props.match.params.id;
    setUserData(props.fetchUserData(userid));

    // const fetchData = async () => {
    // }
    // fetchData()

    // const userData = async () => {
    //   await props.fetchUserData(userid)
    // }

    // const userID = props.match.params.id
    // const fetchData = async () => {
    //   await fetch(`http://localhost:3000/users/${userID}`)
    //   .then((response) => response.json())
    //   .then((data) => setUserData(data))
    //   .catch((error) => console.log(error))
    // }
    // fetchData()

    // const userID = props.match.params.id;
    // props.fetchUserData(userID);
    // setUserData(props.user);
    // console.log("props.fetchUserData(userid):", props.fetchUserData(userID));

    // setUserData(props.fetchUserData(props.match.params.id))
  }, []);

  const onHandleSubmit = (data) => {
    // Do something with the data
    console.log("handleSubmit/Form data: ", data);
  }

  return !!props.user ? (
    // If data is loaded
    <div className="userDetails">
      <h1>
        Details for {props.user.first_name} {props.user.last_name}
      </h1>

      <FormProvider {...methods }>
        <form onSubmit={methods.handleSubmit(onHandleSubmit)}>
          <UserName2 preloadedValues={props.user} />
          <UserContact preloadedValues={props.user} />
          <input type="submit" />
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
  // console.log("state: ",state)
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUserData, editUser })(UserDetails);
