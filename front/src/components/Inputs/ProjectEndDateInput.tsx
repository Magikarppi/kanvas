/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputLabel, TextField, InputAdornment } from "@mui/material";
import DatePicker from "../DatePicker/Datepicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { FormikErrors } from "formik";

interface IProps {
    endDate: Date | null;
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
                  endDate: Date | null;
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
                    setFieldValue(
                        "endDate",
                        date ? date.toLocaleDateString() : null
                    );
                }}
                dateFormat="dd/MM/yyyy"
                customInput={
                    <TextField
                        name="endDate"
                        value={endDate}
                        id="endDateTextField"
                        fullWidth
                        data-cy="project-end-date-input"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CalendarMonthIcon fontSize="large" />
                                </InputAdornment>
                            ),
                        }}
                    />
                }
            />
        </>
    );
}
