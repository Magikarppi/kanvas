import { InputLabel, TextField, Typography } from "@mui/material";
import { projectDescriptionMaxLength } from "../../utils/consts";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    description: string;
    error: string | undefined;
    touched: boolean | undefined;
}

export default function ProjectDescriptionInput({
    handleChange,
    description,
    error,
    touched,
    handleBlur,
}: IProps) {
    return (
        <>
            <InputLabel htmlFor="description">Description</InputLabel>
            <TextField
                fullWidth
                value={description}
                onChange={handleChange}
                type="text"
                id="description"
                error={touched && Boolean(error)}
                helperText={touched && error}
                onBlur={handleBlur}
                name="description"
                autoComplete="off"
                multiline
                rows={4}
            />
            <Typography variant="caption" sx={{ ml: 2 }}>
                {description.length}/{projectDescriptionMaxLength}
            </Typography>
        </>
    );
}
