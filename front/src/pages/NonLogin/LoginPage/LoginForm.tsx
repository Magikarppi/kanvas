import { useState } from "react";
import { Container, Button, Grid, Link, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import userRequests from "../../../services/userService";
import { IUser } from "../../../models/userModels";
import { setToken, setUserInfo } from "../../../redux/userReducer";
import { useAppDispatch } from "../../../redux/hooks";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginSchema } from "../../../schemas";
import EmailInput from "../../../components/Inputs/EmailInput";
import PasswordInput from "../../../components/Inputs/PasswordInput";

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const {
        values,
        errors,
        handleBlur,
        handleChange,
        touched,
        isValid,
        resetForm,
        handleSubmit,
    } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        async onSubmit(values) {
            try {
                const userData = await userRequests.loginUser(values);
                if (userData.token) {
                    dispatch(setToken(userData.token as string));
                }

                if (userData.user) {
                    dispatch(setUserInfo(userData.user as IUser));
                }
                resetForm();
                navigate("/dashboard");
                toast.success("Welcome!");
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data);
                }
            }
        },
    });

    const disableButton =
        Object.keys(touched).length === 0 ||
        !isValid ||
        Object.keys(errors).length > 0;

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
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <EmailInput
                                email={values.email}
                                error={errors.email}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordInput
                                dataCy="password-input"
                                valueName="password"
                                password={values.password}
                                error={errors.password}
                                touched={touched.password}
                                showPassword={showPassword}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                handleClickShowPassword={() =>
                                    setShowPassword((prev) => !prev)
                                }
                            />
                        </Grid>
                        <Grid
                            container
                            justifyContent="flex-end"
                            sx={{ mt: 1 }}
                        >
                            <Grid item>
                                <Link
                                    onClick={() => navigate("/forgot-password")}
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box textAlign="center">
                        <Button
                            data-cy="login-button"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={disableButton}
                        >
                            Sign in
                        </Button>
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={() => navigate("/sign-up")}>
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
