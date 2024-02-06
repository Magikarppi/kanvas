import { useState } from "react";
import { Box, Container, Button, Grid, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import userRequests from "../../../services/userService";
import { INewUserBody } from "../../../models/userModels";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { signUpSchema } from "../../../schemas";
import FirstNameInput from "../../../components/Inputs/FirstNameInput";
import LastNameInput from "../../../components/Inputs/LastNameInput";
import EmailInput from "../../../components/Inputs/EmailInput";
import PasswordInput from "../../../components/Inputs/PasswordInput";

export interface ShowPassword {
    password: boolean;
    confirmPassword: boolean;
}

const RegistrationForm = () => {
    const [showPassword, setShowPassword] = useState<ShowPassword>({
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
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: signUpSchema,
        async onSubmit(values) {
            const userToRegister: INewUserBody = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                passwordConfirmation: values.confirmPassword,
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
            resetForm();
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
                <Typography variant="h4">Sign up</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <FirstNameInput
                                firstName={values.firstName}
                                error={errors.firstName}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LastNameInput
                                lastName={values.lastName}
                                error={errors.lastName}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched.lastName}
                            />
                        </Grid>
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
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched.password}
                                handleClickShowPassword={() =>
                                    handleClickShowPassword("password")
                                }
                                showPassword={showPassword.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordInput
                                dataCy="confirm-password-input"
                                label="Confirm password"
                                valueName="confirmPassword"
                                password={values.confirmPassword}
                                error={errors.confirmPassword}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                touched={touched.confirmPassword}
                                handleClickShowPassword={() =>
                                    handleClickShowPassword("confirmPassword")
                                }
                                showPassword={showPassword.confirmPassword}
                            />
                        </Grid>
                    </Grid>
                    <Box textAlign="center">
                        <Button
                            data-cy="signup-submit"
                            variant="contained"
                            color="secondary"
                            disabled={disableButton}
                            type="submit"
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
