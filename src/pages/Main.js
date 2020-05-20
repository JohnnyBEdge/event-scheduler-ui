import React, {useState, useEffect} from 'react';
import DateView from '../components/DateView';
// import AddEvent from '../components/AddEvent';
import AddEventForm from '../components/AddEventForm';
import '../styling/main.css'


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const Main = () => {

    const [events, setEvents] = useState([]);
    const [error, setError] = useState(false);
    const [expanded, setExpanded] = useState(false);

    async function fetchData(){
        const res = await fetch("http://localhost:5005/api/events");
            res.json()
            .then(res => setEvents(res))
            .catch(err => setError(err)); 
    };

    const handleChange = (id) => (event, isExpanded) => {
        setExpanded(isExpanded ? id : false);
      };

    useEffect(() => {
        fetchData();
    },[]);

    const displayEvent = events.map((event) => {
        return  <ExpansionPanel expanded={expanded == event._id} onChange={handleChange(event._id)}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <TableRow key={event.id}>
                        <Typography>{event.eventName}</Typography>
                        <Typography>{event.eventDate}</Typography>

                        </TableRow>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>

                            {event.eventTime} <br/>
                            {event.eventDetails}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

    })

    return (
        <div id="main_container">

            <DateView />

            <TableContainer>
                <Table>
                    {/* <TableHead>
                        <TableRow>
                            <TableCell> Event </TableCell>
                            <TableCell> Date </TableCell>
                        </TableRow>
                    </TableHead> */}

                    <TableBody>
                        {displayEvent}
                    </TableBody>
                </Table>
            </TableContainer>

            <ExpansionPanel >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="add_event_panel_summary"
                    >
                        <TableRow>
                        <Typography>+ Add Event</Typography>
                        </TableRow>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <AddEventForm />
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            {/* <AddEvent /> */}
        </div>
    )
};

export default Main;