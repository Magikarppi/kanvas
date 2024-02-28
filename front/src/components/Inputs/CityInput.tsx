import { InputLabel, TextField } from "@mui/material";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    city: string;
    error: string | undefined;
    touched: boolean | undefined;
}

export default function CityInput({
    handleChange,
    city,
    error,
    touched,
    handleBlur,
}: IProps) {
    return (
        <>
            <InputLabel htmlFor="city">City</InputLabel>
            <TextField
                data-cy="city-input"
                error={touched && Boolean(error)}
                helperText={touched && error}
                fullWidth
                id="city"
                value={city}
                onChange={handleChange}
                name="city"
                size="small"
                onBlur={handleBlur}
                autoComplete="off"
            />
        </>
    );
}
