import React, {useState} from 'react';

import Modal from '@material-ui/core/Modal';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from "@material-ui/pickers";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const EditModal = (props) => {
    const [open, setOpen] = useState(false);    
    const [eventName, setEventName] = useState(props.event.eventName);
    const [eventType, setEventType] = useState(props.event.eventType);
    const [eventDetails, setEventDetails] = useState(props.event.eventDetails);
    const [eventDate, setEventDate] = useState(props.event.eventDate);
    const [reminder, setReminder] = useState(props.event.reminder);

    const handleReminder = (event) => {
        setReminder(event.target.checked)
    };

    const editEvent = () => {
        fetch(`https://events-scheduler.herokuapp.com/api/events/${props.event._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({eventName, eventType, eventDetails, eventDate, reminder})
        })
        .then((res) => res.json())
        .then(
            resData => resData.modifiedCount === 1 ? 
            props.handleEdit(props.event._id, {eventName, eventType, eventDetails, eventDate, reminder})
            : console.log("could not edit"))
        .then(() => toggleModal())
        .then(props.handleChange())
    };

    // Delete this fx after presentation, just for show
    const editViaPut = () => {
        fetch(`https://events-scheduler.herokuapp.com/api/events/${props.event._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({eventName, eventType, eventDetails, eventDate, reminder})
        })
        .then((res) => res.json())
        .then(
            resData => resData.modifiedCount === 1 ? 
            props.handleEdit(props.event._id, {eventName, eventType, eventDetails, eventDate, reminder})
            : console.log("could not edit"))
        .then(() => toggleModal())
        .then(props.handleChange())
    };

    const handleDateChange = (date) => {
        setEventDate(date);
    };

    const toggleModal = () => {
        if(open){
            setOpen(false);
        } else {
            setOpen(true)
        };
    };

      
    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          top: 100,
          left: '37%',
        },
        button: {
            margin: theme.spacing(2, 0, 2),
          },
        input: {
            margin: theme.spacing(1,0,1),
            width: "98%"
        },
        modal: {
            marginTop: "-40px"
        },
        editButton: {
            backgroundColor: "#6772e5",
            color: "#fff",
            width: "100%",
            boxShadow: "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
            height: "60px",
            margin: "0 auto",
            marginTop: "15px"
            // & :hover {
            //     background-color: "#5469d4"
        } 
      }));

    const classes = useStyles();


    return (
        <div id="edit_modal_container">
            <EditOutlinedIcon onClick={toggleModal} />
            <Modal
                open={open}
                onClose={toggleModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
                >

                <div className={classes.paper} id="edit_modal">
                    <h2 id="simple-modal-title">Edit Event</h2>
                    <FormControl 
                        variant="outlined"
                        fullWidth={true}
                        required={true}>
                        <InputLabel>Event Name</InputLabel>
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
                            id="outlined-multiline-flexible"
                            label="Details"
                            multiline
                            rowsMax={4}
                            value={eventDetails} 
                            onChange={({target}) => setEventDetails(target.value)}
                            variant="outlined"
                            />
                    </FormControl>

                    <FormControl className={classes.input}>
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
                    className={classes.editButton}
                    variant="contained"
                    color="primary"
                    startIcon={<EditOutlinedIcon /> }
                    onClick={() => editEvent()}
                >Update via PATCH
                </Button> 

{/* remove this button after presentation and remove "via PATCH" above */}
                <Button
                    className={classes.editButton}
                    variant="contained"
                    color="primary"
                    startIcon={<EditOutlinedIcon /> }
                    onClick={() => editViaPut()}
                >Update via PUT
                </Button>                                                   
                </div>


            </Modal>
        </div>
    )
};

export default EditModal;