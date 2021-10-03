import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";


function ContactInfo(props) {
  
  
  return (
    <div className="userDetails">
    {console.log("props: ", props)}
      <h3>Contact</h3>
      <p>
        <label>
          Phone
          <input name="user_phone" placeholder="1234567890" />
        </label>
        <label>
          Email
          <input name="user_email" placeholder="Email" />
        </label>
      </p>
      <p>
        <label>
          City
          <input name="user_city" placeholder="City" />
        </label>
        <label>
          State
          <input name="user_state" placeholder="State" />
        </label>
      </p>
    </div>
  );
}

// export default ContactInfo;
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    users: state.users,
  };
};

export default connect(mapStateToProps, {fetchUserData, editUser})(ContactInfo);
