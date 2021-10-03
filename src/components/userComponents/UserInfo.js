import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { editUser, fetchUserData } from "../../../src/actions/userActions";

const UserInfo = (props) => {
  // console.log("props: ", props)

  const handleChange = (event) => {
    // setLocalUser({
    //   ...localUser,
    //   [event.target.name]: event.target.value,
    // });
  };
  const [localUser, setLocalUser] = useState(null);

  props.fetchUserData()
  console.log("fetchUserData props: ", props)

  useEffect(() => {
    // console.log("props.user: ", props.user)

    setLocalUser(props.fetchUserData())

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

      <h3>User Information</h3>
      <p>
        <label>
          First Name
          <input
            name="first_name"
            placeholder="First Name"
            value={props.first_name}
            onChange={handleChange}
          />
        </label>

        <label>
          Last Name
          <input
            name="last_name"
            placeholder="Last Name"
            value={props.last_name}
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
  // console.log("state: ", state);
  return {
    loading: state.loading,
    user: state.user,
  };
};

// connects to reducer
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // fetchUsersList: (data) => dispatch({type: 'SET_USERS', data})
//   }
// }

// const mapDispatchToProps = (dispatch) => ({
//   fetchUserDataHandler: (data) => dispatch(fetchUserData(data)),
// });

export default connect(mapStateToProps, { fetchUserData })(UserInfo);

// export default connect(mapStateToProps, {fetchUserData})(UserInfo);
