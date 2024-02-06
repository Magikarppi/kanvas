import { InputLabel, TextField } from "@mui/material";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    firstName: string;
    error: string | undefined;
    touched: boolean | undefined;
}

export default function FirstNameInput({
    handleChange,
    firstName,
    error,
    touched,
    handleBlur,
}: IProps) {
    return (
        <>
            <InputLabel htmlFor="firstName">First Name *</InputLabel>
            <TextField
                data-cy="first-name-input"
                error={touched && Boolean(error)}
                helperText={touched && error}
                required
                name="firstName"
                value={firstName}
                fullWidth
                id="firstName"
                size="small"
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
            />
        </>
    );
}
