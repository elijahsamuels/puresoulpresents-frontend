import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import UserPhoto from "../components/UserPhoto";
import StaffInfo from "../components/userComponents/StaffInfo";
import ContactInfo from "../components/userComponents/ContactInfo";
import TaxInfo from "../components/userComponents/TaxInfo";
import UserInfo from "../components/userComponents/UserInfo";
import PaymentInfo from "../components/userComponents/PaymentInfo";
import { fetchUserData } from "../actions/userActions";

function UserDetails() {
    return (
        <div className="userDetails">

            <h1>User Details: </h1>
            {/* <UserPhoto /> */}
            <UserInfo />
            {/* <ContactInfo /> */}
            {/* <TaxInfo />
            <StaffInfo />
            <PaymentInfo /> */}
            {/* {fetchUsersList()} */}
        </div>
    );
}

// *** include upload field for W9. ***

// export default UserDetails;


const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
    fetchUserDataHandler: data => dispatch(fetchUserData(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
