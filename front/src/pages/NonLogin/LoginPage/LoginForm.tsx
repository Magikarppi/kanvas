import { useState, ChangeEvent } from "react";
import {
    Container,
    TextField,
    Button,
    Grid,
    Link,
    Typography,
    Box,
    InputAdornment,
    IconButton,
    InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icons from "../../../components/Icons/Icons";
import userRequests from "../../../services/userService";
import { ILoginBody, IUser } from "../../../models/userModels";
import { validEmail } from "../../../utils/inputChecks";
import { setToken, setUserInfo } from "../../../redux/userReducer";
import { useAppDispatch } from "../../../redux/hooks";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { invalidEmailHelperText } from "../../../utils/helperMessages";

interface UserLoginState {
    email: string;
    password: string;
}

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState({
        password: false,
    });

    const [formData, setFormData] = useState<UserLoginState>({
        email: "",
        password: "",
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false,
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
            return touched[field] && !emailRegex.test(value);
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
            !emailRegex.test(value)
        ) {
            return invalidEmailHelperText;
        } else {
            return null;
        }
    };

    const handleSubmit = async () => {
        const userToLogin: ILoginBody = {
            email: formData.email,
            password: formData.password,
        };

        try {
            if (validEmail(userToLogin.email)) {
                const userData = await userRequests.loginUser(userToLogin);
                if (userData.token) {
                    dispatch(setToken(userData.token as string));
                }

                if (userData.user) {
                    dispatch(setUserInfo(userData.user as IUser));
                }
                navigate("/projects");
                toast.success("Welcome!");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data);
            }
        }
    };

    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const disableButton =
        formData.password === "" ||
        formData.email === "" ||
        !emailRegex.test(formData.email);

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
                <Typography variant="h4">Sign in</Typography>
                <Box component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="firstName">
                                Email Address *
                            </InputLabel>
                            <TextField
                                data-cy="email-login-input"
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
                                data-cy="password-login-input"
                                error={validateInputs("password")}
                                required
                                fullWidth
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                name="password"
                                size="small"
                                autoComplete="off"
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
                        <Grid
                            container
                            justifyContent="flex-end"
                            sx={{ mt: 1 }}
                        >
                            <Grid item>
                                <Link
                                    onClick={() =>
                                        handleNavigation("/forgot-password")
                                    }
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box textAlign="center">
                        <Button
                            data-cy="login-button"
                            variant="contained"
                            color="secondary"
                            disabled={disableButton}
                            onClick={handleSubmit}
                        >
                            Sign in
                        </Button>
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={() => handleNavigation("/sign-up")}>
                                Dont have an account yet? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;
