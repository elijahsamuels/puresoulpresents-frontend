import React from "react";
import { connect } from "react-redux";
import userSamplePhoto from "../../images/userSamplePhoto.png";
import { fetchUserData, editUser } from "../../actions/userActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';


function UserPhoto(props) {
  
  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.users.user
  });
  
  const returnUserPhotoOrDefault = () => {
    // console.log("props.users.user:", props.users.user)
  //   if (!!props.users.user.photo) {
  //     return props.users.user.photo
  //   } else {
  //     return userSamplePhoto
  //   }
  }
  
	return (
		<div className="userPhoto">
			<h3>User Photo: {props.users.user.first_name}</h3>
			<img src={returnUserPhotoOrDefault()} alt="UserPhoto" width="200" />

			<Controller name="photo" control={control} render={({ field }) => (
          <TextField 
            {...field} 
            label="Photo URL"
            variant="outlined" 
            size="small"
            margin="dense"
            error={!!errors.photo}
            helperText={errors.photo ? errors.photo.message : ""}
            />
        )}/>
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