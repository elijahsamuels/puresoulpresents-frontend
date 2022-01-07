import React, { useState } from "react";
// import DatePicker from "react-multi-date-picker";
import { Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function BasicDatePicker() {
  // const [value, setValue] = useState();

  return (
    <Controller
      name="event_date"
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Event Date"
            value={field.value}
            onChange={(e) => {field.onChange(e);}}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                margin="dense"
                sx={{ ml: 0.5, mt: 0.5, minWidth: 100 }}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}
