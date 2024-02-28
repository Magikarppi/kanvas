import {
    InputLabel,
    TextField,
    InputAdornment,
    Typography,
} from "@mui/material";
import { jobPitchMaxLength } from "../../utils/consts";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    jobPitch: string;
    error: string | undefined;
    touched: boolean | undefined;
}

export default function jobPitchInput({
    handleChange,
    jobPitch,
    error,
    touched,
    handleBlur,
}: IProps) {
    return (
        <>
            <InputLabel htmlFor="jobPitch">Job pitch</InputLabel>
            <TextField
                data-cy="job-pitch-input"
                onChange={handleChange}
                name="jobPitch"
                value={jobPitch}
                error={touched && Boolean(error)}
                helperText={touched && error}
                onBlur={handleBlur}
                fullWidth
                InputProps={{
                    style: { fontSize: 14 },
                    endAdornment: (
                        <InputAdornment position="end">
                            <Typography variant="caption">
                                {jobPitch.length}/{jobPitchMaxLength}
                            </Typography>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    );
}
