import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { fetchMusicianData } from "../actions/userActions";
import Mailer from "../components/mailerEmailJS";

function Contact() {
    return (
        <div className="userDetails">
            <Mailer />
        </div>
    );
}



const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      users: state.users,
  };
};


export default connect(mapStateToProps, {fetchMusicianData})( Contact);
