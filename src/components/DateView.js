import React, {useState} from 'react';

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
        <TableRow>
            <TableCell>
                <NavigateBeforeIcon onClick={() => handlePrev()}/>
                {views[current]}
                <NavigateNextIcon onClick={() => handleNext()}/>
            </TableCell>
        </TableRow>
    )
};

export default DateView;