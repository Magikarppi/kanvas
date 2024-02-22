/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, InputAdornment } from "@mui/material";
import DatePicker from "../DatePicker/Datepicker";
import { FormikErrors } from "formik";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface IProps {
    dueDate: Date;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) =>
        | Promise<void>
        | Promise<
              FormikErrors<{
                title: string;
                subTitle: string;
                description: string;
                status: string;
                dueDate: Date;
              }>
          >;
}

export default function ProjectEndDateInput({
    setFieldValue,
    dueDate,
}: IProps) {
    return (
        <>
            <DatePicker
                id="dueDate"
                selected={(dueDate && new Date(dueDate)) || null}
                onChange={(date: Date) => {
                    setFieldValue("dueDate", date);
                }}
                dateFormat="dd/MM/yyyy"
                customInput={
                    <TextField name="dueDate" value={dueDate} InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <CalendarMonthIcon fontSize="large"/>
                            </InputAdornment>
                        ),
                    }}/>
                }
            />
        </>
    );
}