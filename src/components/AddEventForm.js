import React, {useState} from 'react';
import '../styling/add-event-form.css';


import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { DateTimePicker } from "@material-ui/pickers";
import styled from 'styled-components';

const AddEventForm = (props) => {

    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [eventDate, setEventDate] = useState(new Date());

    const StyledButton = styled(Button)`
        background-color: #6772e5;
        color: #fff;
        width: 100%;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        height: 60px;
        margin: 0 auto;
        margin-top: 15px;
        &:hover {
            background-color: #5469d4;
    }`;

    const handleDateChange = (date) => {
        setEventDate(date);
    };

    // function validate(){
    //     if(eventName === ''){
    //         alert("Please add an event name.")
    //     }
    // }

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
            fullWidth={true}
            required={true}>
                <InputLabel >Event Name</InputLabel>
                <OutlinedInput 
                    id="component-outlined" 
                    value={eventName} 
                    onChange={({target}) => setEventName(target.value)}
                    label="eventName" 
                    helperText="Incorrect entry."
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

            <StyledButton
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => addNewEvent()}
            >Add Event
            </StyledButton>
        </div>
    )
};

export default AddEventForm;