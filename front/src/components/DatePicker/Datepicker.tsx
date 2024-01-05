import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
interface IDatePicker {
  handleCallBack: (date: Date) => void;
  date: Date;
}

export const DatePickerComponent = (props:IDatePicker) => {
  
    return(
        <DatePicker selected={props.date} onChange={(date: Date) => props.handleCallBack(date)} />
    );
};

export default DatePicker;