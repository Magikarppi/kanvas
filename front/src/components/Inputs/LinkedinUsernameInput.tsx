import { InputLabel, TextField } from "@mui/material";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    linkedinUsername: string;
    error: string | undefined;
    touched: boolean | undefined;
}

export default function LinkedinUsernameInput({
    handleChange,
    linkedinUsername,
    error,
    touched,
    handleBlur,
}: IProps) {
    return (
        <>
            <InputLabel htmlFor="linkedinUsername">
                LinkedIn username
            </InputLabel>
            <TextField
                data-cy="linkedin-input"
                onChange={handleChange}
                name="linkedinUsername"
                value={linkedinUsername}
                error={touched && Boolean(error)}
                helperText={touched && error}
                onBlur={handleBlur}
                fullWidth
            />
        </>
    );
}
