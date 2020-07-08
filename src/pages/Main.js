import React, {useState, useEffect} from 'react';
import DateView from '../components/DateView';
import DeleteEvent from '../components/DeleteEvent';
import AddEventForm from '../components/AddEventForm';
import EditEventModal from '../components/EditEventModal';
import '../styling/main.css';

import moment from 'moment';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

const Main = () => {

    const [events, setEvents] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [expandForm, setExpandForm] = useState(false);
    const [current, setCurrent] = useState(0);
    const [eventMode] = useState("Add Event");
    const [selected] = useState("");

    async function getEvents(){
         const res = await fetch(`${process.env.REACT_APP_API_URL}/api/events`);
            res.json()
            .then(res => localStorage.setItem('events', JSON.stringify(res)))
            .then(setEvents(JSON.parse(localStorage.getItem('events'))))
            // .then(handleAlerts())
    };

    console.log("events", events)

    const handleChange = (id) => (event, isExpanded) => {
        setExpanded(isExpanded ? id : false);
      };

    const handleExpandedForm = () => {
        setExpandForm(expandForm ? false : true);
    };
    

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

    // function handleAlerts(){
    //     events.forEach(event => {
    //         if(event.alert === true && moment(event.eventDate).format() <= moment().format()){
    //             alert("Dont forget! ", event.eventName)
    //             };
    //     }) 
    // };


    useEffect(() => {
        getEvents();
        // handleAlerts();
    }, []);


    function isToday(date){
      return moment(date).day() === moment().day() && moment(date).year() === moment().year();
    };
    function isWeek(date){
      return moment(date).week() === moment().isoWeek() && moment(date).year() === moment().year();
    };
    function isMonth(date){
      return moment(date).month() === moment().month() && moment(date).year() === moment().year();
    };
    function isPast(date){
        return moment(date).format() < moment().format();
      };
  

    const filtered = () => {
        if(current === 0){
            return events.filter(date => isToday(date.eventDate));
          } else if(current === 1){
            return events.filter(date => isWeek(date.eventDate));
          } else if(current === 2){
            return events.filter(date => isMonth(date.eventDate));
          } else if(current === 3){
              return events.filter(date => isPast(date.eventDate));
          } else {
              return events;
          };
    };
    
    const sorted = filtered().sort((a,b) => new Date(a.eventDate) - new Date(b.eventDate));

    const displayEvent = sorted.map((event) => {
        return  <ExpansionPanel 
                    expanded={expanded === event._id} 
                    onChange={handleChange(event._id)}
                    key={event._id}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        
                        <div key={event.id} className="expansion-panel-summary">
                            <p className="event-name">{event.eventName}</p>
                            <p className={"event-date"}> {formatDate(event.eventDate)}</p>
                        </div>
                        {event.reminder === true ? <AlarmOnIcon className="alarm"/> : ""}

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails >

                        <div className="expansion-panel-details">
                            <div className="event-info">
                                <p className="event-details" >{event.eventDetails}</p>
                            </div>
                            <div className="event-functions">
                                <EditEventModal 
                                    event={event}
                                    refresh={getEvents}
                                    handleChange={handleChange} 
                                />
                                <DeleteEvent 
                                    id={event._id} 
                                    refresh={getEvents}
                                    handleChange={handleChange}
                                />
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
                        <div >
                            <p id="add_event_btn">+Add Event</p>
                        </div>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <AddEventForm getEvents={getEvents} eventMode={eventMode} selected={selected} handleExpandedForm={handleExpandedForm}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
        </div>
    )
};

export default Main;