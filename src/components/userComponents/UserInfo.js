import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import Button from "@material-ui/core/Button";
import { fetchUserData } from "../../../src/actions/userActions";

const UserInfo = (props) => {
  
  useEffect(() => {
    setLocalUser(props.user);
  }, [props.user]);

  const [localUser, setLocalUser] = useState({
    first_name: props.user.first_name,
    last_name: props.user.last_name,
  });

  const handleChange = (event) => {
    setLocalUser({
      ...localUser,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="userDetails">

      <h3>User Information</h3>
      <p>
        <label>
          First Name
          <input
            name="first_name"
            id="first_name"
            placeholder="First Name"
            value={localUser.first_name || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          Last Name
          <input
            name="last_name"
            id="last_name"
            placeholder="Last Name"
            value={localUser.last_name || ""}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <button href="userGigList">User Gig List</button>
        <button href="userSaveEdits">Save</button>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUserData })(UserInfo);