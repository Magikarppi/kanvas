/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputLabel, TextField } from "@mui/material";
import DatePicker from "../DatePicker/Datepicker";
import { FormikErrors } from "formik";

interface IProps {
    endDate: Date;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) =>
        | Promise<void>
        | Promise<
              FormikErrors<{
                  name: string;
                  description: string;
                  endDate: Date;
                  theme: string;
                  isPublic: boolean;
              }>
          >;
}

export default function ProjectEndDateInput({
    setFieldValue,
    endDate,
}: IProps) {
    return (
        <>
            <InputLabel htmlFor="endDate">End date</InputLabel>
            <DatePicker
                id="endDate"
                selected={(endDate && new Date(endDate)) || null}
                onChange={(date: Date) => {
                    setFieldValue("endDate", date);
                }}
                dateFormat="dd/MM/yyyy"
                customInput={
                    <TextField name="endDate" value={endDate} fullWidth />
                }
            />
        </>
    );
}
