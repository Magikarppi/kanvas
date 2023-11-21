
import React, {useState, ChangeEvent} from "react";
import Box from "@mui/material/Box";
import { 
    Container,
    TextField, 
    Button,
    Grid, 
    Link, 
    Typography, 
    InputAdornment,
    IconButton  } from "@mui/material";
import Icons from "../../../components/Icons/Icons";

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
        confirmPassword: false
    });

    const handleClickShowPassword = (field: keyof typeof showPassword) => {
        setShowPassword((prevField) => ({ ...prevField, [field]: !prevField[field] }));
    };
    const showValues = () => {
        console.log("First name :" + formData.firstName + " Last name : " + formData.lastName + " Email : " + formData.email + " Password : " + formData.password  );
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const handleInputBlur = (field: keyof typeof formData) => {
        setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
    };
    
    const passWordRegex = /^(?=.*[a-z]).{8,40}$/; // Minimum eight characters, at least one letter
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const validateInputs = (field: keyof typeof formData) => {
        const value = formData[field];
      
        if (field === "email") {
            return touched[field] && !emailRegex.test(value);
        }
        else if (field === "password") {
            return touched[field] && !passWordRegex.test(value);
        } else if (field === "confirmPassword" && formData.password !== formData.confirmPassword) {
            return touched[field];
        }
        else {
            return touched[field] && value === "";
        }
    };

    const getErrorText = (field: keyof typeof formData) => {
        const value = formData[field];
        
        if (touched[field] && value === "") {
            return "Field must be filled out";
        }
        else if (field === "email" && touched[field] && !emailRegex.test(value)) {
            return "Invalid email address";
        } else if (field === "password" && touched[field] && !passWordRegex.test(value)) {
            return "Invalid password";
        } else if (field === "confirmPassword" && touched[field] && formData.password !== formData.confirmPassword) {
            return "Password not match";
        } else {
            return null;
        }
    };

    const disableButton = formData.firstName === "" || formData.lastName === "" || formData.password === ""
    || formData.confirmPassword === "" || formData.password !== formData.confirmPassword  || formData.email === "" || !emailRegex.test(formData.email) || !passWordRegex.test(formData.password);

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
                <Typography variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={validateInputs("firstName")}
                                required
                                name="firstName"
                                value={formData.firstName}
                                fullWidth
                                id="firstName"
                                onChange={handleInputChange}
                                label="First Name"
                                onBlur={() => handleInputBlur("firstName")}
                                helperText={getErrorText("firstName")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={validateInputs("lastName")}
                                required
                                fullWidth
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                label="Last Name"
                                name="lastName"
                                onBlur={() => handleInputBlur("lastName")}
                                helperText={getErrorText("lastName")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={validateInputs("email")}
                                required
                                fullWidth
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                label="Email Address"
                                name="email"
                                onBlur={() => handleInputBlur("email")}
                                helperText={getErrorText("email")} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={validateInputs("password")}
                                required
                                fullWidth
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                label="Password"
                                name="password"
                                onBlur={() => handleInputBlur("password")}
                                helperText={getErrorText("password")}
                                type={showPassword.password ? "text" : "password"}
                                InputProps={{ 
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleClickShowPassword("password")}
                                            >
                                                {showPassword.password ? <Icons.Visibility /> : <Icons.VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={validateInputs("confirmPassword")}
                                required
                                fullWidth
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                label="Confirm password"
                                name="confirmPassword"
                                onBlur={() => handleInputBlur("confirmPassword")}
                                helperText={getErrorText("confirmPassword")}
                                type={showPassword.confirmPassword ? "text" : "password"}
                                InputProps={{ 
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleClickShowPassword("confirmPassword")}
                                            >
                                                {showPassword.confirmPassword ? <Icons.Visibility /> : <Icons.VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={showValues}
                        disabled={disableButton}
                    >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="http://localhost:3000/sign-in">
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