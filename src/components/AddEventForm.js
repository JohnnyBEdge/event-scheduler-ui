import React, {useState} from 'react';
import '../styling/add-event-form.css';


import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { DateTimePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';

const AddEventForm = (props) => {

    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [eventDate, setEventDate] = useState(new Date());
    const [reminder, setReminder] = useState(false)

    const useStyles = makeStyles({
        input: {
          width: '98%',
        },
        button: {
            backgroundColor: "#6772e5",
            color: "#fff",
            width: "100%",
            boxShadow: "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
            height: "60px",
            margin: "0 auto",
            marginTop: "15px"
        }
      });

    const handleDateChange = (date) => {
        setEventDate(date);
    };

    const handleReminder = (event) => {
        setReminder(event.target.checked)
    };

  function addNewEvent(){
      fetch(`${process.env.REACT_APP_API_URL}/api/events`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({eventName, eventType, eventDetails, eventDate, reminder})
      }).then(setEventName(''),setEventType(''),setEventDetails(''),setEventDate(new Date()), setReminder(false))
      .then(props.getEvents)
      .then(props.handleExpandedForm)
  }


  const classes = useStyles();
    return (
        <div id="add_event_form_container">
            <FormControl 
                variant="outlined"
                fullWidth={true}
                required={true}>
                <InputLabel >Event Name</InputLabel>
                <OutlinedInput 
                    className={classes.input}
                    id="component-outlined" 
                    value={eventName} 
                    onChange={({target}) => setEventName(target.value)}
                    label="eventName" 
                    />
            </FormControl>
            <br/>

            <FormControl 
                id="select_event_input" 
                variant="outlined" 
                fullWidth={true}
                >
                <InputLabel id="select_event_label">Event Type</InputLabel>
                <Select
                    className={classes.input}
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

            <FormControl 
                className={classes.input}
                fullWidth={true}
            >
                <TextField
                    fullWidth={true}
                    
                    // 
                    id="outlined-multiline-flexible"
                    label="Details"
                    multiline
                    rowsMax={4}
                    value={eventDetails} 
                    onChange={({target}) => setEventDetails(target.value)}
                    variant="outlined"
                    />
            </FormControl>

            <FormControl 
            className={classes.input}
                
                >
                <DateTimePicker
                    fullWidth={true}
                    label="Event Date"
                    value={eventDate}
                    onChange={handleDateChange}
                    animateYearScrolling
                    disablePast={true}
                    inputVariant="outlined"
                    />
            </FormControl>

            <FormControl component="fieldset" className={classes.formControl}>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={reminder}
                        onChange={handleReminder}
                        name="reminderB"
                        color="primary"
                    />
                    }
                    label="Set Reminder"
                />
            </FormControl>

            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => addNewEvent()}
            >{props.eventMode}
            </Button>
        </div>
    )
};

export default AddEventForm;