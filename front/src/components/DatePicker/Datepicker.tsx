import { TextField, Box, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IDatePicker {
  handleCallBack: (date: Date) => void;
  date: Date;
}

export const DatePickerComponent = (props:IDatePicker) => {
    const input =  <TextField
        name="endDate"
        placeholder="MM/DD/YYYY"
        value={props.date}
        fullWidth
    />;

    return(
        <DatePicker customInput={input} selected={props.date} onChange={(date: Date) => props.handleCallBack(date)} dateFormat="dd/MM/yyyy"/>
    );
};

export default DatePicker;