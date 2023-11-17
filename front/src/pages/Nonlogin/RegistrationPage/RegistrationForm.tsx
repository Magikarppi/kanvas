
import React, {useState, ChangeEvent} from "react";
import Box from "@mui/material/Box";
import { 
    Container,
    TextField, 
    Button,
    Grid, 
    Link, 
    Typography, 
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton  } from "@mui/material";
import Icons from "../../../components/Icons/Icons";

interface RegistrationFormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

const RegistrationForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<RegistrationFormState>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const showValues = () => {
        console.log("First name :" + formData.firstName + " Last name : " + formData.lastName + " Email : " + formData.email + " Password : " + formData.password  );
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
 
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
                                required
                                name="firstName"
                                value={formData.firstName}
                                fullWidth
                                id="firstName"
                                onChange={handleInputChange}
                                label="First Name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                label="Last Name"
                                name="lastName"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="password">Password *</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    onChange={handleInputChange}
                                    name="password"
                                    value={formData.password}
                                    fullWidth
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                style={{ cursor: "pointer"}}
                                            >
                                                {showPassword ? <Icons.VisibilityOff /> : <Icons.Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="confirmPassword">Confirm Password *</InputLabel>
                                <OutlinedInput
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    required
                                    onChange={handleInputChange}
                                    fullWidth
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                style={{ cursor: "pointer"}}
                                            >
                                                {showPassword ? <Icons.VisibilityOff /> : <Icons.Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={showValues}
                    >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#">
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