import React, {useState} from 'react';
import '../styling/date-view.css'

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const DateView = () => {
    const views = ['Day', 'Week', 'Month'];

    const [current, setCurrent] = useState(0)

    const handleNext = () => {
        if(current === views.length-1){
            setCurrent(0)
        } else {
            setCurrent(current + 1)
        };
    };
    const handlePrev = () => {
        if(current === 0){
            setCurrent(views.length - 1)
        } else {
            setCurrent(current - 1)
        };
    };


    return(
        <TableRow >
            <div id="date_view">
                <NavigateBeforeIcon id="before" onClick={() => handlePrev()}/>
                {views[current]}
                <NavigateNextIcon id="next" onClick={() => handleNext()}/>
            </div>
        </TableRow>
    )
};

export default DateView;