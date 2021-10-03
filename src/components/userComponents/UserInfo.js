import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { editUser, fetchUserData } from "../../../src/actions/userActions";

const UserInfo = () => {
  // console.log("localUser: ", localUser)
  const [localUser, setLocalUser] = useState({
    // first_name: localUser.first_name,
    // last_name: localUser.last_name,
    // email: localUser.email,
    // phone: localUser.phone,
  });

  const handleChange = (event) => {
    // setLocalUser({
    //   ...localUser,
    //   [event.target.name]: event.target.value,
    // });
  };

  useEffect((props) => {

    // setLocalUser(props)
    // ************** setLocalUsers NEEDS AN ARRAY OF OBJECTS
    // setLocalUser({
    //   first_name: "John",
    //   last_name: "Doe",
    //   phone: "1234567890",
    //   email: "john@doe.com",
    //   city: "London",
    // })
  }, []);

  return (
    <div className="userDetails">
      {/* {console.log("localUser: ", localUser)} */}
      {/* {localUser && localUser} */}

      <h3>User Information</h3>
      <p>
        <label>
          First Name
          <input
            name="first_name"
            placeholder="First Name"
            value={localUser.first_name}
            onChange={handleChange}
          />
        </label>

        <label>
          Last Name
          <input
            name="last_name"
            placeholder="Last Name"
            value={localUser.last_name}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <button href="userGigList">User Gig List</button>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("state: ", state);
  return {
    loading: state.loading,
    localUser: state.user,
  };
};

// connects to reducer
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // fetchUsersList: (data) => dispatch({type: 'SET_USERS', data})
//   }
// }

const mapDispatchToProps = (dispatch) => ({
  fetchUserDataHandler: (data) => dispatch(fetchUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

// export default connect(mapStateToProps, {fetchUserData})(UserInfo);
