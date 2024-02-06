import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IDatePicker {
    date: Date;
    onChange: (date: Date | null) => void;
    customInput: React.ReactNode;
}

export const DatePickerComponent = (props: IDatePicker) => {
    const handleCallBackDatePicker = (date: Date) => {
        const days = date.getDate();
        const months = date.getMonth();
        const years = date.getFullYear();
        const totalFormat: string = days + "/" + (months + 1) + "/" + years;
        props.onChange(new Date(totalFormat));
    };

    return (
        <DatePicker
            customInput={props.customInput}
            selected={props.date}
            onChange={(date: Date) => handleCallBackDatePicker(date)}
        />
    );
};

export default DatePicker;
