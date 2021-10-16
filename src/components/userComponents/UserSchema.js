import React from 'react'
import * as yup from 'yup';

export const schema = yup.object().shape({
  first_name: yup.string()
    .required("First name is required"),
  last_name: yup.string()
    .required("Last name is required"),
  email: yup.string()
    .email("Must be a valid email address")
    .required("Email is required"),
  phone: yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits'),
  address1: yup.string()
    .optional("Please provide a valid address"),
  address2: yup.string()
    .optional(),
  city: yup.string()
    .required("City is required"),
  state: yup.string()
    .required("State is required")
    .length(2)
    .matches(/^[A-Z]+$/, "Must be capitalized state code (ex. CA, FL, ME)"),
  zip_code: yup.string()
    .required("Zip code is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, 'Must be exactly 5 digits')
    .max(5, 'Must be exactly 5 digits'),
})


// function UserSchema() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default UserSchema
