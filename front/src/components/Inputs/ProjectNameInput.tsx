import { InputLabel, TextField, Typography } from "@mui/material";
import { projectNameMaxLength } from "../../utils/consts";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    name: string;
    error: string | undefined;
    touched: boolean | undefined;
}

export default function NameInput({
    handleChange,
    name,
    error,
    touched,
    handleBlur,
}: IProps) {
    return (
        <>
            <InputLabel htmlFor="projectName">Name *</InputLabel>
            <TextField
                data-cy="project-name-input"
                onChange={handleChange}
                name="name"
                value={name}
                error={!name && touched && Boolean(error)}
                helperText={touched && error}
                onBlur={handleBlur}
                required
                fullWidth
            />
            <Typography variant="caption" sx={{ ml: 2 }}>
                {name.length}/{projectNameMaxLength}
            </Typography>
        </>
    );
}
