import { InputLabel, TextField } from "@mui/material";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    email: string;
    error: string | undefined;
    touched: boolean | undefined;
}

export default function EmailInput({
    handleChange,
    email,
    error,
    touched,
    handleBlur,
}: IProps) {
    return (
        <>
            <InputLabel htmlFor="email">Email *</InputLabel>
            <TextField
                data-cy="email-input"
                error={touched && Boolean(error)}
                helperText={touched && error}
                required
                name="email"
                value={email}
                fullWidth
                id="email"
                size="small"
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
            />
        </>
    );
}
