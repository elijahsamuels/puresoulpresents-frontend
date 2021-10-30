import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchEventData, editEvent } from "../../actions/eventActions";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

function EventMusicians (props) {
// console.log("EventContact/props.event: ", props.event)
  const { control, formState: { errors }} = useFormContext({
    defaultValues: props.event,
  });

  const [bandSize, setBandSize] = useState();
  
  useEffect(() => {
    setBandSize(props.event.band_size);
  }, [props.event.band_size]);

  
  const musicianCountGenerator = () => {
    
    let musicianCountFromBandSizeArray = [];
    for (let i = 1; i < props.event.band_size+1; i++) {
            musicianCountFromBandSizeArray.push(
            
            <div>
            <Controller name={`musician_0${i}`} control={control} render={({ field }) => (
              <TextField 
                {...field}
                type="text"
                label={`Musician 0${i}`}
                variant="outlined" 
                size="small"
                margin="dense"
                // error={!!errors.musician0.concat(i)}
                // helperText={errors.musician0.concat(i) ? errors.musician0.concat(i).message : ""}
            />
          )}/>
          </div>
      );
      // console.log("musicianCountFromBandSizeArray: ", "musician_0".concat(i));
    }
    // console.log("musicianCountFromBandSizeArray: ", musicianCountFromBandSizeArray)
    return musicianCountFromBandSizeArray;
  }

  return (
    <div className="eventMusicians">

      <h3>
        Musicians Component
      </h3>

      <Controller name="band_size" control={control} render={({ field }) => (
        <span>
          <InputLabel id="band_size">Rating</InputLabel>
          <Select
          {...field}
          label="Band Size"
          id="band_size"
          variant="outlined"
          size="small"
          margin="dense"
          sx={{ minWidth: 120 }}
          >
          <MenuItem value="" disabled><em>Band Size</em></MenuItem>
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
        </Select>
        </span>
        )}/>

        {musicianCountGenerator()}

      {/*
      <Controller name="musician01" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 01" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician01}
        helperText={errors.musician01 ? errors.musician01.message : ""}
        />
      )}/>

      <Controller name="musician02" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 02" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician02}
        helperText={errors.musician02 ? errors.musician02.message : ""}
        />
      )}/>

      <Controller name="musician03" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 03" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician03}
        helperText={errors.musician03 ? errors.musician03.message : ""}
        />
      )}/>

      <Controller name="musician04" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 04" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician04}
        helperText={errors.musician04 ? errors.musician04.message : ""}
        />
      )}/>

      <Controller name="musician05" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 05" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician05}
        helperText={errors.musician05 ? errors.musician05.message : ""}
        />
      )}/>

      <Controller name="musician06" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 06" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician06}
        helperText={errors.musician06 ? errors.musician06.message : ""}
        />
      )}/>

      <Controller name="musician07" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 07" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician07}
        helperText={errors.musician07 ? errors.musician07.message : ""}
        />
      )}/>

      <Controller name="musician08" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 08" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician08}
        helperText={errors.musician08 ? errors.musician08.message : ""}
        />
      )}/>

      <Controller name="musician09" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 09" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician09}
        helperText={errors.musician09 ? errors.musician09.message : ""}
        />
      )}/>

      <Controller name="musician10" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 10" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician10}
        helperText={errors.musician10 ? errors.musician10.message : ""}
        />
      )}/>

      <Controller name="musician11" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 11" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician11}
        helperText={errors.musician11 ? errors.musician11.message : ""}
        />
      )}/>

      <Controller name="musician12" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 12" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician12}
        helperText={errors.musician12 ? errors.musician12.message : ""}
        />
      )}/>

      <Controller name="musician13" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 13" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician13}
        helperText={errors.musician13 ? errors.musician13.message : ""}
        />
      )}/>

      <Controller name="musician14" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 01" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician14}
        helperText={errors.musician14 ? errors.musician14.message : ""}
        />
      )}/>

      <Controller name="musician15" control={control} render={({ field }) => (
        <TextField 
        {...field}
        type="text"
        label="Musician 15" 
        variant="outlined" 
        size="small"
        margin="dense"
        error={!!errors.musician15}
        helperText={errors.musician15 ? errors.musician15.message : ""}
        />
      )}/>
*/}

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