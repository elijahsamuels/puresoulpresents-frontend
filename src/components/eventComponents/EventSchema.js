import * as yup from "yup";

export const schema = yup.object().shape({
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
});
