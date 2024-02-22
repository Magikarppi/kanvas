import { TextField, InputAdornment } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    title: string;
    error: string | undefined;
    touched: boolean | undefined;
}

export default function CardTitleInput({
    handleChange,
    title,
    error,
    touched,
    handleBlur,
}: IProps) {
    return (
        <>
            <TextField
                onChange={handleChange}
                name="title"
                value={title}
                error={touched && Boolean(error)}
                helperText={touched && error}
                onBlur={handleBlur}
                required
                fullWidth
                style={{cursor: "default"}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <EditIcon fontSize="large"/>
                        </InputAdornment>
                    ),
                }}
                inputProps={{
                    maxLength: 100,
                }}
            />
        </>
    );
}