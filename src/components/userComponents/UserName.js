import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserData } from "../../actions/userActions";

const UserName = (props) => {
  
  useEffect(() => {
    setLocalUser(props.user);

  }, []);

  const [localUser, setLocalUser] = useState({
    first_name: props.user.first_name,
    last_name: props.user.last_name,
  });

  const handleChange = (event) => {
    // console.log(event.target.name,": ", event.target.value)
    setLocalUser({
      ...localUser,
      [event.target.name]: event.target.value,
    });
  };
  // console.log("localUser: ", localUser)

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
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("UserName state: ", state)
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUserData })(UserName);