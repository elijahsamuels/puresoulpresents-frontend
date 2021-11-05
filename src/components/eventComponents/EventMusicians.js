import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEventData, editEvent } from "../../actions/eventActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

function EventMusicians (props) {
  // console.log("typeof (props.event.band_size)", typeof (props.event.band_size))
  // console.log("EventContact/props.event: ", props.event)
  
  const { watch, control, formState: { errors }} = useFormContext({
    defaultValues: props.event,
  });

  const basePayRate = 300 // temp value
  const [bandCostSummed, setBandCostSummed] = useState(0);
  const [musicianPayRate, setMusicianPayRate] = useState(basePayRate ? basePayRate : 0);
  const [bandSize, setBandSize] = useState(props.event.band_size);

  // useEffect(() => {
  //   return () => {
  //     console.log(props.event.band_size);
  //   };
  // }, [setBandSize]);






  // going to leave this unfinished. Need to add values to the database first, and THEN read them
  const sendPayRateToBeSummed = (payRate) => {
    let summedCost = []
    // console.log("bandCostSummed: ", bandCostSummed, "payRate: ", payRate)
    summedCost.push(payRate)
    summedCost.reduce((a,b) => a+b)
    setBandCostSummed(summedCost)
    // console.log(setBandCostSummed(summedCost.reduce((a,b) => a+b)));
    // return setBandCostSummed(summedCost.reduce((a,b) => a+b));
  }

  // useEffect(() => {
  //   setBandCostSummed();
  // }, [bandCostSummed]);


  const musicianCountGenerator = () => {
    
    let musicianCountFromBandSizeArray = [];
    for (let i = 1; i < (parseInt(bandSize)+1 || props.event.band_size+1); i++) {
      musicianCountFromBandSizeArray.push(
        <div key={`musician_${i}_details`}>
          <Controller name={`musician_${i}`} control={control} render={({ field }) => (
            <TextField 
              {...field}
              type="text"
              key={`musician_${i}_text`}
              label={`Musician ${i}`}
              variant="outlined" 
              size="small"
              margin="dense"
              sx={{ ml: 0.5}}
              error={!!errors[`musician_${i}`]}
              helperText={errors[`musician_${i}`] ? errors[`musician_${i}`].message : ""}
              />
            )}/>

          <Controller name={`musician_${i}_pay_rate`} control={control} startAdornment={<InputAdornment position="start">$</InputAdornment>} render={({ field }) => (
            // console.log(`Musician ${i} Pay Rate/field`, field),
            <TextField 
              {...field}
              type="number"
              key={`musician_${i}_pay_rate_text`}
              label="Pay (USD)"
              placeholder="Pay (USD)"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              onChange={(e) => {sendPayRateToBeSummed(e.target.value)}}
              defaultValue={musicianPayRate || 0 } // default value IF nothing is provided from database
              // value={musicianPayRate}
              variant="outlined" 
              size="small"
              margin="dense"
              sx={{ ml: 0.5 }} 
              error={!!errors[`musician_${i}_pay_rate`]}
              helperText={errors[`musician_${i}_pay_rate`] ? errors[`musician_${i}_pay_rate`].message : ""}
              />
            )}/>

          <Controller name={`musician_${i}_invoice_received`} control={control} render={({ field }) => (
            <TextField 
            {...field}
            type="text"
            label="Invoice Received?" 
            variant="outlined" 
            size="small"
            margin="dense"
            sx={{ ml: 0.5 }} 
            error={!!errors[`musician_${i}_invoice_received`]}
            helperText={errors[`musician_${i}_invoice_received`] ? errors[`musician_${i}_invoice_received`].message : ""}
            />
          )}/>

          <Controller name={`musician_${i}_invoice_paid`} control={control} render={({ field }) => (
            <TextField 
            {...field}
            type="text"
            label="Paid?" 
            variant="outlined" 
            size="small"
            margin="dense"
            sx={{ ml: 0.5 }} 
            error={!!errors[`musician_${i}_invoice_paid`]}
            helperText={errors[`musician_${i}_invoice_paid`] ? errors[`musician_${i}_invoice_paid`].message : ""}
            />
          )}/>
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
                onChange={(e) => {field.onChange(e), setBandSize(e.target.value)}} // This is working to update the page and save to the database. It's still throwing a "unmount/memory leak in your application" error.
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
            {/* // console.log(`bandCostSummedFromMusicianPayRates`, field), */}
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
        {musicianCountGenerator()}
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

export default connect(mapStateToProps, { fetchEventData, editEvent })(EventMusicians);