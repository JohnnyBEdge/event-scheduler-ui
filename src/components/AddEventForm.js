import React from 'react';
import '../styling/add-event-form.css';
import Calendar from './Calendar';
import TimePicker from './TimePicker';

import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const AddEventForm = () => {

    return (
        <div id="add_event_form_container">
            <FormControl 
            variant="outlined"
            fullWidth={true}>
                <InputLabel >Event Name</InputLabel>
                <OutlinedInput 
                    id="component-outlined" 
                    // value={eventName} 
                    // onChange={handleChange} 
                    // label="eventName" 
                    />
            </FormControl>
            <br/>

            <FormControl id="select_event_input" variant="outlined" fullWidth={true}>
                <InputLabel id="select_event_label">Event Type</InputLabel>
                <Select
                    labelId="select_event_label"
                    id="select_event"
                    // value={age}
                    // onChange={handleChange}
                    label="eventType"
                    >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value="event">Event</MenuItem>
                <MenuItem value="appointment">Appointment</MenuItem>
                <MenuItem value="reminder">Reminder</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth={true}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Details"
                    multiline
                    rowsMax={4}
                    // value={value}
                    // onChange={handleChange}
                    variant="outlined"
                    />
            </FormControl>

            <FormControl fullWidth={true}>
                <Calendar />
            </FormControl>
            
            <FormControl fullWidth={true}>
                <TimePicker />
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                // onClick={() => {handleOpen()}}
            >
            Add Event
            </Button>
        </div>
    )
};

export default AddEventForm;