import React, { useState, ChangeEvent } from "react";
import {
    Box,
    Container,
    TextField,
    Button,
    Grid,
    Link,
    Typography,
    InputAdornment,
    IconButton,
    InputLabel,
} from "@mui/material";
import Icons from "../../../components/Icons/Icons";
import { useNavigate } from "react-router-dom";
import { validEmail, validatePasswordFormat } from "../../../utils/inputChecks";
import userRequests from "../../../services/userService";
import { INewUserBody } from "../../../models/userModels";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
    emptyFieldHelperText,
    invalidEmailHelperText,
    passwordsNoMatchHelperText,
    validPasswordHelperText,
} from "../../../utils/helperMessages";

interface UserRegistrationState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegistrationForm = () => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const [formData, setFormData] = useState<UserRegistrationState>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const navigate = useNavigate();

    const handleClickShowPassword = (field: keyof typeof showPassword) => {
        setShowPassword((prevField) => ({
            ...prevField,
            [field]: !prevField[field],
        }));
    };

    const handleSubmit = async () => {
        const userToRegister: INewUserBody = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            passwordConfirmation: formData.confirmPassword,
        };
        try {
            await userRequests.registerUser(userToRegister);
            toast.success("User registered! Please sign in.");
            navigate("/sign-in");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data);
            }
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleInputBlur = (field: keyof typeof formData) => {
        setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
    };

    const validateInputs = (field: keyof typeof formData) => {
        const value = formData[field];

        if (field === "email") {
            return touched[field] && !validEmail(value);
        } else if (field === "password") {
            return touched[field] && !validatePasswordFormat(value);
        } else if (
            field === "confirmPassword" &&
            formData.password !== formData.confirmPassword
        ) {
            return touched[field];
        } else {
            return touched[field] && value.trim() === "";
        }
    };

    const getErrorText = (field: keyof typeof formData) => {
        const value = formData[field];

        if (touched[field] && value.trim() === "") {
            return emptyFieldHelperText;
        } else if (field === "email" && touched[field] && !validEmail(value)) {
            return invalidEmailHelperText;
        } else if (
            field === "password" &&
            touched[field] &&
            !validatePasswordFormat(value)
        ) {
            return validPasswordHelperText;
        } else if (
            field === "confirmPassword" &&
            touched[field] &&
            formData.password !== formData.confirmPassword
        ) {
            return passwordsNoMatchHelperText;
        } else {
            return null;
        }
    };

    const disableButton =
        formData.firstName.trim() === "" ||
        formData.lastName.trim() === "" ||
        formData.password === "" ||
        formData.confirmPassword === "" ||
        formData.password !== formData.confirmPassword ||
        formData.email === "" ||
        !validEmail(formData.email) ||
        !validatePasswordFormat(formData.password);

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4">Sign up</Typography>
                <Box component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="firstName">
                                First Name *
                            </InputLabel>
                            <TextField
                                data-cy="first-name-input"
                                error={validateInputs("firstName")}
                                required
                                name="firstName"
                                value={formData.firstName}
                                fullWidth
                                id="firstName"
                                size="small"
                                onChange={handleInputChange}
                                onBlur={() => handleInputBlur("firstName")}
                                helperText={getErrorText("firstName")}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="firstName">
                                Last Name *
                            </InputLabel>
                            <TextField
                                data-cy="last-name-input"
                                error={validateInputs("lastName")}
                                required
                                fullWidth
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                name="lastName"
                                size="small"
                                onBlur={() => handleInputBlur("lastName")}
                                helperText={getErrorText("lastName")}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="firstName">
                                Email Address *
                            </InputLabel>
                            <TextField
                                data-cy="email-input"
                                error={validateInputs("email")}
                                required
                                fullWidth
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                name="email"
                                size="small"
                                onBlur={() => handleInputBlur("email")}
                                helperText={getErrorText("email")}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="firstName">
                                Password *
                            </InputLabel>
                            <TextField
                                data-cy="password-input"
                                error={validateInputs("password")}
                                required
                                fullWidth
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                name="password"
                                autoComplete="off"
                                size="small"
                                onBlur={() => handleInputBlur("password")}
                                helperText={getErrorText("password")}
                                type={
                                    showPassword.password ? "text" : "password"
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    handleClickShowPassword(
                                                        "password"
                                                    )
                                                }
                                            >
                                                {showPassword.password ? (
                                                    <Icons.Visibility />
                                                ) : (
                                                    <Icons.VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="firstName">
                                Confirm password *
                            </InputLabel>
                            <TextField
                                data-cy="confirm-password-input"
                                error={validateInputs("confirmPassword")}
                                required
                                fullWidth
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                name="confirmPassword"
                                size="small"
                                autoComplete="off"
                                onBlur={() =>
                                    handleInputBlur("confirmPassword")
                                }
                                helperText={getErrorText("confirmPassword")}
                                type={
                                    showPassword.confirmPassword
                                        ? "text"
                                        : "password"
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    handleClickShowPassword(
                                                        "confirmPassword"
                                                    )
                                                }
                                            >
                                                {showPassword.confirmPassword ? (
                                                    <Icons.Visibility />
                                                ) : (
                                                    <Icons.VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box textAlign="center">
                        <Button
                            data-cy="signup-submit"
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmit}
                            disabled={disableButton}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={() => navigate("/sign-in")}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default RegistrationForm;
