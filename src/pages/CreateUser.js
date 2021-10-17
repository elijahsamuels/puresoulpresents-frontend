import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { fetchUsersList } from "../actions/userActions";
import Mailer from "../components/mailerEmailJS";

function Contact() {
    return (
        <div className="createUser">
            make me new!
        </div>
    );
}



const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      users: state.users,
  };
};


export default connect(mapStateToProps, {fetchUsersList})( Contact);
