import React, {useState, useEffect} from 'react';
import DateView from '../components/DateView';
import DeleteEvent from '../components/DeleteEvent';
import AddEventForm from '../components/AddEventForm';

import '../styling/main.css';


import moment from 'moment';
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
    const [expandForm, setExpandForm] = useState(false);
    const [current, setCurrent] = useState(0);
    const [eventMode, setMode] = useState("Add Event");



    async function getEvents(){
        const res = await fetch("http://localhost:5005/api/events");
            res.json()
            .then(res => setEvents(res))
            .catch(err => setError(err)); 
    };


    const handleChange = (id) => (event, isExpanded) => {
        setExpanded(isExpanded ? id : false);
      };

    const handleExpandedForm = () => {
        setExpandForm(expandForm ? false : true);
        // setMode("Update Event");
    }

    function formatDate(eDate){
        let date = new Date(eDate);
        
        let localDateString = date.toLocaleDateString(undefined, {  
            day : 'numeric',
            month : 'short',
            year : 'numeric'
        });
        
        let localTimeString = date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
    return localDateString +" "+ localTimeString;
    
    };


    useEffect(() => {
        getEvents();
    },[]);


    function isToday(date){
      return moment(date).day() === moment().day() && moment(date).year() === moment().year();
    };
    function isWeek(date){
      return moment(date).week() === moment().isoWeek() && moment(date).year() === moment().year();
    };
    function isMonth(date){
      return moment(date).month() === moment().month() && moment(date).year() === moment().year();
    };

    const filtered = () => {
        if(current === 0){
            return events.filter(date => isToday(date.eventDate))
          } else if(current === 1){
            return events.filter(date => isWeek(date.eventDate))
          } else if(current === 2){
            return events.filter(date => isMonth(date.eventDate))
          } else {
              return events;
          }
    };
    
    const sorted = filtered().sort((a,b) => new Date(a.eventDate) - new Date(b.eventDate))

    const displayEvent = sorted.map((event) => {
        return  <ExpansionPanel 
                    expanded={expanded == event._id} 
                    onChange={handleChange(event._id)}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div key={event.id} className="expansion-panel-summary">
                            <p>{event.eventName}</p>
                            <p className={"event-date"}> {formatDate(event.eventDate)}</p>
                        </div>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails >

                        <div className="expansion-panel-details">
                            <div className="event-info">
                                <p>{event.eventDetails}</p>
                            </div>
                            <div className="event-functions">
                                <EditOutlinedIcon color="action" onClick={handleExpandedForm}/>
                                <DeleteEvent id={event._id} refresh={getEvents}/>
                            </div>
                        </div>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
  
    })

    return (
        
        <div id="main_container">
            <DateView 
                setCurrent={setCurrent}
                current={current}
                />

            {displayEvent}


            <ExpansionPanel expanded={expandForm}>
                    <ExpansionPanelSummary
                        onClick={handleExpandedForm}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="add_event_panel_summary"
                        >
                        <div id="add_event_btn">+{eventMode}</div>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <AddEventForm getEvents={getEvents} eventMode={eventMode}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
        </div>
    )
};

export default Main;