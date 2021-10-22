import React from "react";
import { connect } from "react-redux";
import userSamplePhoto from "../../images/userSamplePhoto.png";
import { fetchUserData, editUser } from "../../actions/userActions";
import { useForm, Controller, useFormContext } from "react-hook-form";
// import { TextField } from "@material-ui/core";
import TextField from '@mui/material/TextField';

export function UserPhoto() {
	return (
		<div className="userPhoto">
			<h3>User Photo</h3>
			<img src={userSamplePhoto} alt="User" width="200" />
		</div>
	);
}


const mapStateToProps = (state) => {
  // console.log("UserPhoto state: ", state);
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUserData, editUser })(UserPhoto);