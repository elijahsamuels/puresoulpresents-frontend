import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { useForm, Controller } from "react-hook-form";
import FormControl from '@mui/material/FormControl';

export default function Example() {
  const { control, handleSubmit } = useForm();
  const [submittedDate, setSubmittedDate] = useState();

  const onSubmit = ({ date }) => {
    console.log(JSON.stringify(date))
    console.log( Date(JSON.stringify(date)));
    setSubmittedDate(date);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="date"
          rules={{ required: true }} //optional
          render={({
            field: { onChange, name, value },
            fieldState: { invalid, isDirty }, //optional
            formState: { errors }, //optional, but necessary if you want to show an error message
          }) => (
            <>
              <DatePicker
                value={value || ""}
                onChange={(date) => {
                  onChange(date?.isValid ? date : "");
                }}
                format={navigator.language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
              />
              {errors && errors[name] && errors[name].type === "required" && (
                //if you want to show an error message
                <span>your error message !</span>
              )}
            </>
          )}
        />
        <input type="submit" />
      </form>
      <p>Submitted Date:  {submittedDate?.format?.("MMMM D YYYY")}</p>
    </>
  )
}
