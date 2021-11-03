import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEventData, editEvent } from "../../actions/eventActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

function EventTimes (props) {
// console.log("EventTimes/props.event: ", props.event)
  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.event,
  });

  return (
    <div className="eventTimes">

      <h3>
        Finances Component
      </h3>
      
      <Controller name="total_amount" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Total" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.total_amount}
        helperText={errors.total_amount ? errors.total_amount.message : ""}
        />
      )}/>

      <Controller name="deposit_amount" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Deposit" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.deposit_amount}
        helperText={errors.deposit_amount ? errors.deposit_amount.message : ""}
        />
      )}/>

      <Controller name="balance_amount" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Balance" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.balance_amount}
        helperText={errors.balance_amount ? errors.balance_amount.message : ""}
        />
      )}/>

      <Controller name="invoice_sent" control={control} render={({ field }) => (
        <Checkbox 
        {...field}
        label="Invoice Sent"
        disableRipple="true"
        // variant="outlined" 
        size="small"
        // margin="dense"
        // error={!!errors.invoice_sent}
        // helperText={errors.invoice_sent ? errors.invoice_sent.message : ""}
        />
      )}/>

      <Controller name="invoice_paid" control={control} render={({ field }) => (
        <Checkbox 
        {...field}
        label="Invoice Paid"
        variant="outlined"
        size="small"
        // margin="dense"
        disableRipple="true"
        error={!!errors.invoice_paid}
        helperText={errors.invoice_paid ? errors.invoice_paid.message : ""}
        />
      )}/>

      <Controller name="invoice_file" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Invoice File" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.invoice_file}
        helperText={errors.invoice_file ? errors.invoice_file.message : ""}
        />
      )}/>

      <Controller name="hire_order_recevied" control={control} render={({ field }) => (
        <Checkbox 
        {...field}
        // type="text"
        label="Total" 
        // variant="outlined" 
        // size="small"
        // margin="dense"
        error={!!errors.hire_order_recevied}
        helperText={errors.hire_order_recevied ? errors.hire_order_recevied.message : ""}
        />
      )}/>

      <Controller name="hire_order_file" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Hire Order File" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.hire_order_file}
        helperText={errors.hire_order_file ? errors.hire_order_file.message : ""}
        />
      )}/>

      {/* <Controller name="musician_invoices_sent" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician Invoices Sent" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician_invoices_sent}
        helperText={errors.musician_invoices_sent ? errors.musician_invoices_sent.message : ""}
        />
      )}/> */}

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    users: state.users,
    event: state.events.event,
  };
};

export default connect(mapStateToProps, { fetchEventData, editEvent })(EventTimes);