import { InputLabel, TextField } from "@mui/material";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    country: string;
    error: string | undefined;
    touched: boolean | undefined;
}

export default function CountryInput({
    handleChange,
    country,
    error,
    touched,
    handleBlur,
}: IProps) {
    return (
        <>
            <InputLabel htmlFor="country">Country</InputLabel>
            <TextField
                data-cy="country-input"
                error={touched && Boolean(error)}
                helperText={touched && error}
                fullWidth
                id="country"
                value={country}
                onChange={handleChange}
                name="country"
                size="small"
                onBlur={handleBlur}
                autoComplete="off"
            />
        </>
    );
}
