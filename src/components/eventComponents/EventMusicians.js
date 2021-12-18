import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEventData, editEvent } from "../../actions/eventActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

function EventMusicians (props) {
  
  const { watch, control, formState: { errors }} = useFormContext({
    defaultValues: props.event,
  });

  const basePayRate = 300 // temp value
  const [bandCostSummed, setBandCostSummed] = useState(0);
  const [musicianPayRate, setMusicianPayRate] = useState(basePayRate ? basePayRate : 0);
  const [bandSize, setBandSize] = useState(props.event.band_size);
  const [payRate, setPayRate] = useState(0);
  const [invoiceReceived, setInvoiceReceived] = useState(null);

  const handlePayChange = (event) => {
    // console.log({
    //   musician_ID: event.target.name,
    //   musician_pay_rate: parseInt(event.target.value)
    // })
    // setPayRate({
    //   // ...payRate,
    //   [event.target.name]: parseInt(event.target.value)
    // })
  }

  const onChange = (event) => {
    // setInvoiceReceived({ 
    //   [event.target.name]: event.target.value
    // }),
    // console.log(event.target.value)
  }

  function bandSizeFunction(e) {
    // console.log(e)
    // return (e.target.value)
  }


  useEffect(() => {
    setBandSize(bandSizeFunction())
  }, [bandSizeFunction()])
  // useEffect(() => {
  //   setPayRate({ total: calculateTotal(numbers) });
  // }, []);

  // const calculateTotal = (numbers) => {
  //   return Object.entries(numbers).reduce((finalValue, [key, value]) => {
  //     if (value === "") {
  //       // if entered value is empty string "", omits it
  //       return finalValue;
  //     }
  //     return finalValue + value;
  //   }, 0);
  // }

  // going to leave this unfinished. Need to add values to the database first, and THEN read them
  const sendPayRateToBeSummed = (payRate) => {
    let summedCost = []
    // console.log("bandCostSummed: ", bandCostSummed, "payRate: ", payRate)
    summedCost.push(payRate)
    summedCost.reduce((a,b) => a+b)
    setBandCostSummed(summedCost)
    // return setBandCostSummed(summedCost.reduce((a,b) => a+b));
  }
  // console.log(props.event.users)
  // console.log(`${props.event.users[0].first_name} ${props.event.users[0].last_name}, ID: ${props.event.users[0].id}`)
  const musicianCountGenerator = () => {
    
    let musicianCountFromBandSizeArray = [];
    for (let i = 1; i < (parseInt(bandSize)+1 || props.event.band_size+1); i++) {
      musicianCountFromBandSizeArray.push(
        <div key={`musician_${i}_details`}>

          <Controller
            name={`musician_${i}`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                name={`musician_${i}`}
                // { ...console.log(`${props.event.users[i].first_name} ${props.event.users[0].last_name}, ID: ${props.event.users[i].id}`) }
                // key={`musician_${i}`}
                label={`Musician ${i}`}
                variant="outlined"
                size="small"
                
                // value={props.event.users[i] ? (`${props.event.users[i].first_name} ${props.event.users[i].last_name}`) : ""}
                // value={props.event.users[i] ? (`${props.event.users[i].first_name} ${props.event.users[i].last_name}`) : ""}

                // {...console.log("field.value: ",field.value)}
                value={field.value || ''}
                margin="dense"
                sx={{ ml: 0.5 }}
                // onChange={null}
                error={!!errors[`musician_${i}`]}
                helperText={ errors[`musician_${i}`] ? errors[`musician_${i}`].message : "" }
              />
            )}
          />
        {/* {    console.log("props.event.users: ", props.event.users[0].first_name) }
        {props.event.users[0].first_name + " " + props.event.users[0].last_name} */}

          <Controller
            name={`musician_${i}_pay_rate`}
            control={control}
            render={({ field }) => (
              // console.log(`Musician ${i} Pay Rate/field`, field),
              <TextField
                {...field}
                type="number"
                label="Pay (USD)"
                placeholder="Pay"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  onChange={handlePayChange}
                // onChange={(event) => handlePayChange(event.target.value)}
                // onChange={(e) => {sendPayRateToBeSummed(e.target.value)}}
                // defaultValue={musicianPayRate || 0 } // default value IF nothing is provided from database
                // value={musicianPayRate}
                variant="outlined"
                size="small"
                margin="dense"
                sx={{ ml: 0.5, width: 125 }}
                value={field.value || ''}
                error={!!errors[`musician_${i}_pay_rate`]}
                helperText={ errors[`musician_${i}_pay_rate`] ? errors[`musician_${i}_pay_rate`].message : "" }
              />
            )}
          />
{/* 
          <Controller 
            name={`musician_${i}_invoice_received`} 
            control={control} 
            render={({ field }) => (
              <FormControlLabel 
              label="Invoice Received?"
              control={
                <Checkbox
                {...field}
                onChange={null}
                disableRipple
                size="small"
                sx={{ ml: 0.5 }}
                />
              }
              />
              )}/> */}

          {/* <Controller
            name={`musician_${i}_invoice_received`}
            control={control}
            render={({ field }, props) => (
              <Checkbox
                // onChange={(e) => props.onChange(e.target.checked)}
                {...field}
                onChange={null}
                checked={field.value}
                // checked={invoiceReceived}
              />
            )}
          /> */}

          {/* 
          <Controller
            name={`musician_${i}_invoice_received`}
            control={control}
            render={({ field }) => (
              <FormControlLabel
                label="Invoice Received?"
                {...field}
                control={
                  <Checkbox
                  // onBlur={onBlur}
                  // onChange={null}
                  disableRipple
                  onChange={(event) => onChange(event.target.checked)}  
                  checked={invoiceReceived}
                  // checked={field.value}
                  // inputRef={field.ref}
                />
            
                }
              />
            )}
          /> */}

          <Controller
            name={`musician_${i}_invoice_received`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                // onChange={null}
                type="text"
                label="Invoice Received?"
                variant="outlined"
                size="small"
                margin="dense"
                sx={{ ml: 0.5 }}
                value={field.value || ''}
                error={!!errors[`musician_${i}_invoice_received`]}
                helperText={
                  errors[`musician_${i}_invoice_received`]
                    ? errors[`musician_${i}_invoice_received`].message
                    : ""
                }
              />
            )}
          />

          <Controller
            name={`musician_${i}_invoice_paid`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                // onChange={null}
                type="text"
                label="Paid?"
                variant="outlined"
                size="small"
                margin="dense"
                sx={{ ml: 0.5 }}
                value={field.value || ''}
                error={!!errors[`musician_${i}_invoice_paid`]}
                helperText={
                  errors[`musician_${i}_invoice_paid`]
                    ? errors[`musician_${i}_invoice_paid`].message
                    : ""
                }
              />
            )}
          />
        </div>
      );
    }
    return musicianCountFromBandSizeArray;
  }

  const bandTotalCostSummedFromMusicianPayRates = () => {
    let bandCostSummedFromMusicianPayRates = 0
    for (let i = 1; i < (parseInt(bandSize)+1); i++) {
      bandCostSummedFromMusicianPayRates += parseInt(watch(`musician_${i}_pay_rate`))
    }
    return `$${bandCostSummedFromMusicianPayRates}`
  }

  return (
    <div className="eventMusicians">

      <h3>
        Musicians Component
      </h3>
      Band Cost: {parseInt(Object.values(payRate))}

      <Controller 
        name="band_size" 
        control={control} 
        render={({ field }) => (
          <div>
            {/* <FormControl sx={{ ml: 0.5, mt: 0.5, minWidth: 50 }}> */}
            {/* <InputLabel id="band_size">Size</InputLabel> */}
              <TextField
                {...field}
                label="Size"
                id="band_size"
                select
                // onChange={(e) => {setBandSize(e)}} 
                // onChange={(e) => {field.onChange(e)}} 

                onChange={(e) => (field.onChange(e), setBandSize(e.target.value))} // This is working to update the page and save to the database. It's still throwing a "unmount/memory leak in your application" error.
                variant="outlined"
                size="small"
                margin="dense"
                sx={{ ml: 0.5, mt: 0.5, minWidth: 100 }}
              >
              {/* <Select
                {...field}
                onChange={e => setBandSize(e.target.value)}
                // value={() => bandSize} // this works to change the value of the select (and number of musicians), but changes between controlled to uncontrolled. Boo!
                renderValue={bandSize}
                label="Size"
                id="band_size"
                variant="outlined"
                size="small"
                margin="dense"
              > */}

              <MenuItem value="0" disabled><em>Band Size</em></MenuItem>
              {/* should refactor the MenuItems to be generated instead of manually written */}
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="7">7</MenuItem>
              <MenuItem value="8">8</MenuItem>
              <MenuItem value="9">9</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="11">11</MenuItem>
              <MenuItem value="12">12</MenuItem>
              <MenuItem value="13">13</MenuItem>
              <MenuItem value="14">14</MenuItem>
              <MenuItem value="15">15</MenuItem>
            </TextField>
          {/* </FormControl> */}

          {/* <Controller name={'band_cost'} control={control} render={({ field }) => ( */}
            <TextField 
              {...field}
              // type="text"
              label="Band Cost"
              variant="outlined" 
              size="small"
              margin="dense"
              sx={{ m: 0.5, maxWidth: 90 }}
              // sx={{ m: 0.5, width: '12ch' }}
              InputProps={{
                readOnly: true,
                value: bandCostSummed,
                startAdornment: <InputAdornment position="start">$</InputAdornment>,

              }}
              // error={!!errors[`bandCostSummedFromMusicianPayRates`]}
              // // helperText={errors[`bandCostSummedFromMusicianPayRates`] ? errors[`bandCostSummedFromMusicianPayRates`].message : ""}
              />
            {/* // )}/> */}
          {/* {bandTotalCostSummedFromMusicianPayRates()} */}
          </div>
        )}/>



        {/* working on making this a musician selection. later copy this into the musicianCountGenerator */}
      <Controller 
        name="musician_selector" 
        control={control} 
        render={({ field }) => (
        <span>
          <FormControl sx={{ ml: 0.5, mt: 1, minWidth: 200 }}>
            <InputLabel shrink id="musician_selector">Musician Selector</InputLabel>
              <Select
                {...field}
                label="Musician Selector"
                id="musician_selector"
                variant="outlined"
                size="small"
                margin="dense"
              >
              <MenuItem value="0" disabled><em>Musician Selector</em></MenuItem>
              <MenuItem value="true">1. Indoor</MenuItem>
              <MenuItem value="false">2. Outdoor</MenuItem>
            </Select>
          </FormControl>
        </span>
      )}/>

        {musicianCountGenerator()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    // users: state.users,
    event: state.events.event,
  };
};

export default connect(mapStateToProps, { fetchEventData, editEvent })(EventMusicians);