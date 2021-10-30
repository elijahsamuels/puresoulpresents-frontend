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

function EventMusicians (props) {
  console.log("typeof (props.event.band_size)", typeof (props.event.band_size))
  // console.log("EventContact/props.event: ", props.event)
  const { watch, control, formState: { errors }} = useFormContext({
    defaultValues: props.event,
  });

  const [bandCostSummed, setBandCostSummed] = useState([]);

  const sendPayRateToBeSummed = (payRate) => {
    return setBandCostSummed(bandCostSummed + payRate);
    console.log("bandCostSummed: ", bandCostSummed, "payRate: ", payRate)
  }

  // useEffect(() => {
  //   setBandCostSummed();
  // }, [bandCostSummed]);

  const [bandSize, setBandSize] = useState(props.event.band_size);
  const musicianPayRate = 300 // temp value

  // useEffect(() => {
  //   // console.log("props.event", props.event)
  //   setBandSize(props.event.band_size)
  // }, [bandSize]);

  const musicianCountGenerator = () => {
    // console.log("bandSize", bandSize)
    // console.log("watch('band_size')", watch("band_size"))
    
    let musicianCountFromBandSizeArray = [];
    for (let i = 1; i < (parseInt(bandSize)+1); i++) {
      musicianCountFromBandSizeArray.push(
        <div>
          <Controller key={`musician_${i}`} name={`musician_${i}`} control={control} render={({ field }) => (
            console.log(`Musician ${i}/field`, field),
            <TextField 
              {...field}
              type="text"
              label={`Musician ${i}`}
              variant="outlined" 
              size="small"
              margin="dense"
              error={!!errors[`musician_${i}`]}
              helperText={errors[`musician_${i}`] ? errors[`musician_${i}`].message : ""}
              />
            )}/>

          <Controller key={`musician_${i}_pay_rate`} name={`musician_${i}_pay_rate`} control={control} startAdornment={<InputAdornment position="start">$</InputAdornment>} render={({ field }) => (
            console.log(`Musician ${i} Pay Rate/field`, field),
            <TextField 
              {...field}
              type="number"
              label={`Pay (USD)`}
              placeholder={`Pay (USD)`}
              // onChange={(e) => {sendPayRateToBeSummed(e.target.value)}}
              // defaultValue={musicianPayRate}
              value={musicianPayRate}
              variant="outlined" 
              size="small"
              margin="dense"
              error={!!errors[`musician_${i}_pay_rate`]}
              helperText={errors[`musician_${i}_pay_rate`] ? errors[`musician_${i}_pay_rate`].message : ""}
              />
            )}/>
        </div>
      );
    }
    return musicianCountFromBandSizeArray;
  }

  const bandTotalCostSummedFromMusicianPayRates = () => {
    let bandCostSummedFromMusicianPayRates = 0
    // for (let i = 1; i < bandSize; i++) {
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

      <Controller name="band_size" control={control} render={({ field }) => (
        <span>
          <InputLabel id="band_size">Size</InputLabel>
          <Select
            {...field}
            onChange={e => setBandSize(e.target.value)}
            // value={bandSize} // this works to change the value of the select (and number of musicians), but changes between controlled to uncontrolled. Boo!
            renderValue={() => bandSize}
            label="Band Size"
            labelId="band_size_label"
            id="band_size"
            variant="outlined"
            size="small"
            margin="dense"
            sx={{ m: 0.5, minWidth: 50 }}
          >
          <MenuItem value="0" disabled><em>Band Size</em></MenuItem>
          {/* should refactor the MenuItems to be generated instead of manually written */}
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={13}>13</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={15}>15</MenuItem>
        </Select>
        
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
              value: bandTotalCostSummedFromMusicianPayRates(),
            }}
            // error={!!errors[`bandCostSummedFromMusicianPayRates`]}
            // // helperText={errors[`bandCostSummedFromMusicianPayRates`] ? errors[`bandCostSummedFromMusicianPayRates`].message : ""}
            />
          {/* // )}/> */}
          {/*  */}

        {/* {bandTotalCostSummedFromMusicianPayRates()} */}

        </span>
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