import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import UserPhoto from "../components/UserPhoto";
import StaffInfo from "../components/userComponents/StaffInfo";
import ContactInfo from "../components/userComponents/ContactInfo";
import TaxInfo from "../components/userComponents/TaxInfo";
import UserInfo from "../components/userComponents/UserInfo";
import PaymentInfo from "../components/userComponents/PaymentInfo";
import { fetchUserData } from "../actions/userActions";

function UserDetails(props) {

    const [localUser, setLocalUser] = useState(null);

    console.log("props.user: ", props.user)

    useEffect(() => { 
        // console.log("props in UserDetails: ", props.user.id)
        setLocalUser(props.fetchUserData(props.match.params.id))
        // setLocalUser(props.fetchUserData())
    }, [])


        // console.log("props.fetchUserData():", props.fetchUserData())
        // console.log("UserDetails useEffect has run successfully")

        //     // {
        //     //     id: 123,
        //     //     first_name: "JohnTEST",
        //     //     last_name: "DoeTEST",
        //     //     phone: "1234567890",
        //     //     email: "johndoe@TEST.com",
        //     //     city: "LondonTEST",
        //     //   },

    return (
        <div className="userDetails">

            <h1>User Details: </h1>
            {/* User name: {props.user.first_name} */}
            {/* {console.log("In UserDetails, props.user: ", props.user)} */}
            {/* {console.log("In UserDetails, props.user: ", props.user.first_name)} */}
            
            {/* <UserPhoto /> */}
            <UserInfo user={props.user} />
            {console.log(props)}
            {/* {console.log("UserDetails props.user: ", props.user)} */}
            {/* <ContactInfo /> */}
            {/* <TaxInfo />
            <StaffInfo />
            <PaymentInfo /> */}
            {/* {fetchUsersList()} */}
        </div>
    );
}

// *** include upload field for W9. ***

const mapStateToProps = (state) => {
    console.log("state: ", state)
  return {
      loading: state.loading,
      users: state.users,
      user: state.user,
};
};

export default connect(mapStateToProps, { fetchUserData })(UserDetails);
