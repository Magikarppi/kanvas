import { InputLabel, TextField } from "@mui/material";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    phoneNumber: string;
    error: string | undefined;
    touched: boolean | undefined;
}

export default function PhoneNumberInput({
    handleChange,
    phoneNumber,
    error,
    touched,
    handleBlur,
}: IProps) {
    return (
        <>
            <InputLabel htmlFor="phoneNumber">Phone number</InputLabel>
            <TextField
                data-cy="phone-number-input"
                error={touched && Boolean(error)}
                helperText={touched && error}
                required
                fullWidth
                id="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
                size="small"
                onBlur={handleBlur}
                autoComplete="off"
            />
        </>
    );
}
