import React, {useState} from 'react';
import { DatePicker } from "@material-ui/pickers";

const Calendar = () => {

    const [date, setDate] = useState(new Date());

    const handleDateChange = (date) => {
      setDate(date);
    };

    return (
        <div>
            <DatePicker
            label="Event Date"
            value={date}
            onChange={handleDateChange}
            animateYearScrolling
            disablePast={true}
            inputVariant="outlined"
            
            />
      </div>
      )
}

export default Calendar;
