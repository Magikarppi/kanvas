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

    const handleNavigation = (location: string) => {
        navigate(location);
    };

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
            passwordConfirmation: formData.confirmPassword
        };
        try {
            await userRequests.registerUser(userToRegister); 
        } catch (error) {
            console.error(error);
            // Set error notification
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
            return touched[field] && value === "";
        }
    };

    const getErrorText = (field: keyof typeof formData) => {
        const value = formData[field];

        if (touched[field] && value === "") {
            return "Field must be filled out";
        } else if (
            field === "email" &&
            touched[field] &&
            !validEmail(value)
        ) {
            return "Invalid email address";
        } else if (
            field === "password" &&
            touched[field] &&
            !validatePasswordFormat(value)
        ) {
            return "The password should be 8-50 characters long and contain at least one special character and one number";
        } else if (
            field === "confirmPassword" &&
            touched[field] &&
            formData.password !== formData.confirmPassword
        ) {
            return "Passwords do not match";
        } else {
            return null;
        }
    };

    const disableButton =
        formData.firstName === "" ||
        formData.lastName === "" ||
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
                            <InputLabel
                                style={{ fontSize: 14, marginBottom: 2, marginLeft: 6 }}
                                htmlFor="firstName"
                            >
                                First Name *                           
                            </InputLabel>
                            <TextField
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
                                sx={{ "& input": { fontSize: 14 } }}
                                FormHelperTextProps={{ style: { fontSize: 12 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel
                                style={{ fontSize: 14, marginBottom: 2, marginLeft: 6 }}
                                htmlFor="firstName"
                            >
                                Last Name *                           
                            </InputLabel>
                            <TextField
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
                                sx={{ "& input": { fontSize: 14 } }}
                                FormHelperTextProps={{ style: { fontSize: 12 } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel
                                style={{ fontSize: 14, marginBottom: 2, marginLeft: 6 }}
                                htmlFor="firstName"
                            >
                                Email Address *                           
                            </InputLabel>
                            <TextField
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
                                sx={{ "& input": { fontSize: 14 } }}
                                FormHelperTextProps={{ style: { fontSize: 12 } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel
                                style={{ fontSize: 14, marginBottom: 2, marginLeft: 6 }}
                                htmlFor="firstName"
                            >
                                Password *                            
                            </InputLabel>
                            <TextField
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
                                sx={{ "& input": { fontSize: 14 } }}
                                FormHelperTextProps={{ style: { fontSize: 12 } }}
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
                            <InputLabel
                                style={{ fontSize: 14, marginBottom: 2, marginLeft: 6 }}
                                htmlFor="firstName"
                            >
                                Confirm password *                       
                            </InputLabel>
                            <TextField
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
                                sx={{ "& input": { fontSize: 14 } }}
                                FormHelperTextProps={{ style: { fontSize: 12 } }}
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
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3, mb: 2 }}
                        style={{fontSize: 13 }}
                        onClick={handleSubmit}
                        disabled={disableButton}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                style={{ cursor: "pointer", fontSize: 13 }}
                                onClick={() => handleNavigation("/sign-in")}
                            >
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
