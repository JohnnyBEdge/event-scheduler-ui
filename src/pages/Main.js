import React, {useState, useEffect} from 'react';
import DateView from '../components/DateView';
import DeleteEvent from '../components/DeleteEvent';
import AddEventForm from '../components/AddEventForm';

import '../styling/main.css';



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

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';



const Main = () => {

    const [events, setEvents] = useState([]);
    const [error, setError] = useState(false);
    const [expanded, setExpanded] = useState(false);

    async function getEvents(){
        const res = await fetch("http://localhost:5005/api/events");
            res.json()
            .then(res => setEvents(res))
            .catch(err => setError(err)); 
    };

    const handleChange = (id) => (event, isExpanded) => {
        setExpanded(isExpanded ? id : false);
      };

      function formatDate(eDate){
        let date = new Date(eDate)
      
        let localDateString = date.toLocaleDateString(undefined, {  
          day : 'numeric',
          month : 'short',
          year : 'numeric'
      })
      
      let localTimeString = date.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
      })
      
      return localDateString +" "+ localTimeString
      
      }

    useEffect(() => {
        getEvents();
    },[]);

    const displayEvent = events.map((event) => {
        return  <ExpansionPanel expanded={expanded == event._id} onChange={handleChange(event._id)}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div key={event.id} className="expansion-panel-summary">
                        <Typography><p className="event-name">{event.eventName}</p></Typography>
                        <Typography><p className="event-date">{formatDate(event.eventDate)}</p></Typography>
                        </div>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails >
                        <Typography>

                            <div className="expansion-panel-details">
                                <div className="event-info">
                                    {event.eventTime} 
                                    {event.eventDetails}
                                </div>
                                <div className="event-functions">
                                    <EditOutlinedIcon />
                                    <DeleteEvent id={event._id} refresh={getEvents}/>
                                </div>
                            </div>


                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

    })

    return (
        <div id="main_container">

            <DateView />

            {displayEvent}


            <ExpansionPanel >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="add_event_panel_summary"
                        >
                        <Typography id="add_event_btn">+ Add Event</Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <Typography>
                            <AddEventForm refresh={getEvents}/>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
        </div>
    )
};

export default Main;