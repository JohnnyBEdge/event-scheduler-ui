import React, {useState} from 'react';
import '../styling/add-event-form.css';


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
// import { DatePicker } from "@material-ui/pickers";
// import { KeyboardTimePicker } from "@material-ui/pickers";
import { DateTimePicker } from "@material-ui/pickers";

const AddEventForm = (props) => {

    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [eventDate, setEventDate] = useState(new Date());
    // const [eventTime, setEventTime] = useState(new Date());

    const handleDateChange = (date) => {
        setEventDate(date);
    };

  function addNewEvent(){
      fetch(`http://localhost:5005/api/events`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({eventName, eventType, eventDetails, eventDate})
      }).then(setEventName(''),setEventType(''),setEventDetails(''),setEventDate(new Date()))
      .then(props.refresh)
  }

    return (
        <div id="add_event_form_container">
            <FormControl 
            variant="outlined"
            fullWidth={true}>
                <InputLabel >Event Name</InputLabel>
                <OutlinedInput 
                    id="component-outlined" 
                    value={eventName} 
                    onChange={({target}) => setEventName(target.value)}
                    label="eventName" 
                    />
            </FormControl>
            <br/>

            <FormControl id="select_event_input" variant="outlined" fullWidth={true}>
                <InputLabel id="select_event_label">Event Type</InputLabel>
                <Select
                    labelId="select_event_label"
                    id="select_event"
                    value={eventType} 
                    onChange={({target}) => setEventType(target.value)}
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
                    value={eventDetails} 
                    onChange={({target}) => setEventDetails(target.value)}
                    variant="outlined"
                    />
            </FormControl>

            <FormControl fullWidth={true}>
                <DateTimePicker
                    label="Event Date"
                    value={eventDate}
                    onChange={handleDateChange}
                    animateYearScrolling
                    disablePast={true}
                    inputVariant="outlined"
                    />
            </FormControl>

            {/* <FormControl fullWidth={true}>
                <DatePicker
                    label="Event Date"
                    value={eventDate}
                    onChange={handleDateChange}
                    animateYearScrolling
                    disablePast={true}
                    inputVariant="outlined"
                    />
            </FormControl>
            
            <FormControl fullWidth={true}>
                <KeyboardTimePicker
                    label="Event time"
                    placeholder="08:00 AM"
                    mask="__:__ _M"
                    value={eventTime}
                    onChange={date => setEventTime(date)}
                    inputVariant="outlined"
                    />
            </FormControl> */}

            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => addNewEvent()}
            >
            Add Event
            </Button>
        </div>
    )
};

export default AddEventForm;