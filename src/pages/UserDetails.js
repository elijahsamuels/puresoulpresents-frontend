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
import Button from "@material-ui/core/Button";


function UserDetails(props) {

    const [localUser, setLocalUser] = useState(null);

    useEffect(() => { 
        setLocalUser(props.fetchUserData(props.match.params.id))
    }, [])

    return (
             (!!props.loading ?
                    
                // If the state is still loading
                <div className="loading">
                    UGH! WE'RE LOADING!
                </div>

            : // If the state is not loading

                <div className="userDetails">
                <h1>Details for {props.user.first_name} {props.user.last_name}</h1>
                {/* <UserPhoto user={props.user} /> */}
                <UserInfo user={props.user} />
                {/* <ContactInfo user={props.user} /> */}
                {/* <TaxInfo user={props.user} /> */}
                {/* <StaffInfo user={props.user} /> */}
                {/* <PaymentInfo user={props.user} /> */}
                <div>
                    <Button
                        variant="contained"
                        size="small"
                        disableElevation
                        href="userGigList"
                        // onClick={() => {
                        //   handleClick(userData.id);
                        // }}
                    >
                        User Gig List
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        disableElevation
                        href={"Save"}
                        // onClick={() => {
                        //   handleClick(userData.id);
                        // }}
                    >
                        Save
                    </Button>

                </div>

                </div>

             )
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
