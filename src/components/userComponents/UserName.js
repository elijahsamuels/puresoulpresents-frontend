import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";

const UserName = (props) => {
  useEffect(() => {
    setLocalUser(props.user);
  }, []);

  const [localUser, setLocalUser] = useState({
    // ...props.user,
    // first_name: props.user.first_name,
    // last_name: props.user.last_name,
  });

  const handleChange = (event) => {
    // console.log(event.target.name,": ", event.target.value)
    setLocalUser({
      ...localUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("localUser: ", localUser);
    props.editUser(localUser);

  };

  // console.log("localUser: ", localUser)

  return (
    <div className="userDetails">
      <h3>User Information</h3>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <label>First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="First Name"
          value={localUser.first_name || ""}
          onChange={handleChange}
          // onSubmit={handleSubmit(localUser.first_name)}
        />{" "}
        <label>Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Last Name"
          value={localUser.last_name || ""}
          onChange={handleChange}
          // onSubmit={handleSubmit(localUser.last_name)}
        />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("UserName state: ", state);
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUserData, editUser })(UserName);
