import { InputLabel, TextField } from "@mui/material";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    lastName: string;
    error: string | undefined;
    touched: boolean | undefined;
}

export default function LastNameInput({
    handleChange,
    lastName,
    error,
    touched,
    handleBlur,
}: IProps) {
    return (
        <>
            <InputLabel htmlFor="lastName">Last Name *</InputLabel>
            <TextField
                data-cy="last-name-input"
                error={touched && Boolean(error)}
                helperText={touched && error}
                required
                fullWidth
                id="lastName"
                value={lastName}
                onChange={handleChange}
                name="lastName"
                size="small"
                onBlur={handleBlur}
                autoComplete="off"
            />
        </>
    );
}
