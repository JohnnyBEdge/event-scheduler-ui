import React, {useState} from 'react';
import '../styling/date-view.css'

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const DateView = (props) => {
    const views = ['Today', 'This Week', 'This Month', 'All Events'];

    // const [current, setCurrent] = useState(0)

    const handleNext = () => {
        if(props.current === views.length-1){
            props.setCurrent(0)
        } else {
            props.setCurrent(props.current + 1)
        };
    };
    const handlePrev = () => {
        if(props.current === 0){
            props.setCurrent(views.length - 1)
        } else {
            props.setCurrent(props.current - 1)
        };
    };


    return(
        < >
            <div id="date_view">
                <NavigateBeforeIcon id="before" onClick={() => handlePrev()} />
                {views[props.current]}
                <NavigateNextIcon id="next" onClick={() => handleNext()}/>
            </div>
        </>
    )
};

export default DateView;