import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserData, editUser } from "../../actions/userActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  first_name: yup
    .string()
    .matches(/^([0-9]*)$/, "First name should not contain numbers")
    .required("First name is required"),
  last_name: yup
    .string()
    .matches(/^([0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is required"),
});

function UserName3(props) {
  console.log("UserName3 props.user:", props.user);

  const { register, handleSubmit, formState: { errors }
} = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: { props },
  });
  const onSubmit = (data) => {
    // what to do with the data
    console.log("data:", data);
  };

  return (
    <div className="userName">
      <h2>User Name</h2>
      <form>
        <input
          ref={register}
          name="first_name"
          type="text"
          placeholder="First Name"
          {...register("first_name")}
          error={!!errors.first_name}
          helperText={errors.first_name.message}
        />
        <input
          ref={register}
          name="last_name"
          type="text"
          placeholder="Last Name"
          {...register("last_name")}
        />
        <button type="submit" onSubmit={handleSubmit(onSubmit)}>
          Next
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log("state:", state);
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUserData, editUser })(UserName3);
