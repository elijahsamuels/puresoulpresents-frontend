import * as yup from "yup";

export const schema = yup.object().shape({
  first_name: yup
    .string()
    .required("First name is required"),
  last_name: yup
    .string()
    .required("Last name is required"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  address1: yup
    .string()
    .optional("Please provide a valid address")
    .notRequired()
    .nullable(),
  address2: yup
    .string()
    .optional()
    .notRequired()
    .nullable(),
  city: yup
    .string()
    .required("City is required"),
  state: yup
    .string()
    .required("State is required")
    .length(2)
    .matches(/^[A-Z]+$/, "Must be capitalized state code (ex. CA, FL, ME)"),
  zip_code: yup
    .string()
    .required("Zip code is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
  account_name: yup
    .string()
    .optional("Please provide a valid account name")
    .notRequired()
    .nullable(),
  ach_number: yup
    .string()
    .optional()
    .notRequired()
    .nullable(),
  ach_routing_number: yup
    .string()
    .optional()
    .notRequired()
    .nullable(),
    // .when("account_name", {
    //   is: (value) => value.length,
    //   then: (rule) => rule.min(3),
    // }),
  tax_city: yup
    .string()
    .optional()
    .notRequired()
    .nullable(),
  tax_state: yup
    .string()
    .optional()
    .notRequired()
    .nullable(),
  tax_zip: yup
    .string()
    .optional()
    .notRequired()
    .nullable(),
  taxID: yup
    .string()
    .optional()
    .notRequired()
    .nullable(),
  bio: yup
    .string()
    .optional()
    .notRequired()
    .nullable(),
  nick_name: yup
    .string()
    .optional()
    .notRequired()
    .nullable(),
  staff_notes: yup
    .string()
    .optional()
    .notRequired()
    .nullable(),
  user_staff_rating: yup
    .string()
    .optional()
    .notRequired()
    .nullable(),
  user_staff_rating_label: yup
    .string()
    .optional()
    .notRequired()
    .nullable(),
  photo: yup
    .string()
    .optional()
    .notRequired()
    .nullable(),
});
