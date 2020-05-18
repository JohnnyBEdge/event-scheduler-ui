import React, {useState, useEffect} from 'react';

const Main = () => {

    const [events, setEvents] = useState([]);
    const [error, setError] = useState(false);

    async function fetchData(){
        const res = await fetch("http://localhost:5005/api/events");
            res.json()
            .then(res => setEvents(res))
            .catch(err => setError(err)); 
    };

    useEffect(() => {
        fetchData();
    },[]);

        


    console.log(events)

    const displayEvent = events.map((event) => {
        return <ul key={event.id}>
                    <li>{event.name}</li>
                    <li>{event.date}</li>
                </ul>
    })

    return (
        <div id="main_container">
            <ul>
                {displayEvent}
            </ul>
            
        </div>
    )
};

export default Main;