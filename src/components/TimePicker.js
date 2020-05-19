import React, { useState } from "react";
import { KeyboardTimePicker } from "@material-ui/pickers";

const TimePicker = () => {

  const [time, setTime] = useState(new Date());

  return (
    <KeyboardTimePicker
      label="Masked timepicker"
      placeholder="08:00 AM"
      mask="__:__ _M"
      value={time}
      onChange={date => setTime(date)}
    />
  );
}

export default TimePicker;