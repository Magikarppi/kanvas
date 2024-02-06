import {
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
} from "@mui/material";
import Icons from "../Icons/Icons";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    password: string;
    showPassword: boolean;
    error: string | undefined;
    touched: boolean | undefined;
    handleClickShowPassword: () => void;
    valueName: string;
    dataCy?: string;
    disableValidation?: boolean;
    label?: string;
}

export default function PasswordInput({
    dataCy,
    disableValidation,
    valueName,
    handleChange,
    password,
    error,
    touched,
    handleBlur,
    label,
    showPassword,
    handleClickShowPassword,
}: IProps) {
    return (
        <>
            <InputLabel htmlFor="password">
                {label ? label : "Password *"}
            </InputLabel>
            {disableValidation ? (
                <TextField
                    data-cy={dataCy}
                    required
                    name={valueName}
                    value={password}
                    fullWidth
                    id={valueName}
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? (
                                        <Icons.Visibility />
                                    ) : (
                                        <Icons.VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            ) : (
                <TextField
                    data-cy={dataCy}
                    error={touched && Boolean(error)}
                    helperText={touched && error}
                    required
                    name={valueName}
                    value={password}
                    fullWidth
                    id={valueName}
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? (
                                        <Icons.Visibility />
                                    ) : (
                                        <Icons.VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        </>
    );
}
