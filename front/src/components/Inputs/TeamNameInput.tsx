import { InputLabel, TextField, Box, InputAdornment } from "@mui/material";
import { teamNameMaxLength } from "../../utils/consts";
import Icons from "../Icons/Icons";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    teamName: string;
    error: string | undefined;
    touched: boolean | undefined;
}

export default function TeamNameInput({
    handleChange,
    teamName,
    error,
    touched,
    handleBlur,
}: IProps) {
    return (
        <>
            <InputLabel sx={{ fontSize: "1.7rem" }}>Team name *</InputLabel>
            <TextField
                onChange={handleChange}
                error={touched && Boolean(error)}
                helperText={touched && error}
                name="teamName"
                value={teamName}
                fullWidth
                id="teamName"
                onBlur={handleBlur}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Icons.Groups size="x-large" />
                        </InputAdornment>
                    ),
                }}
                inputProps={{
                    maxLength: 100,
                }}
            />
            <Box sx={{ marginLeft: "10px" }}>
                <h4>
                    {teamName.length} / {teamNameMaxLength}
                </h4>
            </Box>
        </>
    );
}
