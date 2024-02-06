import { useState } from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import userRequests from "../../../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import PasswordInput from "../../../components/Inputs/PasswordInput";
import { newPasswordSchema } from "../../../schemas";

const NewPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [showPasswords, setShowPasswords] = useState({
        newPassword: false,
        newPasswordConfirmation: false,
    });

    const handleClickShowPassword = (field: keyof typeof showPasswords) => {
        setShowPasswords((prevField) => ({
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
            newPassword: "",
            newPasswordConfirmation: "",
        },
        validationSchema: newPasswordSchema,
        async onSubmit(values) {
            if (token) {
                try {
                    const response = await userRequests.newPassword(
                        token,
                        values
                    );
                    resetForm();
                    toast.success(response);
                    navigate("/sign-in");
                } catch (error) {
                    if (error instanceof AxiosError) {
                        toast.error(error.response?.data);
                    }
                }
            }
        },
    });

    const disableButton =
        Object.keys(touched).length === 0 ||
        !isValid ||
        Object.keys(errors).length > 0;

    return (
        <div className="pageContainer">
            <Grid container justifyContent="center">
                <Grid item xl={6} md={8} xs={12}>
                    <Paper elevation={1} className="elevatedSection">
                        <Container maxWidth="xs">
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{ marginBottom: "15px" }}
                                >
                                    Reset Your Password
                                </Typography>
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    display="flex"
                                    justifyContent="center"
                                    flexDirection="column"
                                >
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <PasswordInput
                                                dataCy="password-input"
                                                valueName="newPassword"
                                                password={values.newPassword}
                                                error={errors.newPassword}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                touched={touched.newPassword}
                                                handleClickShowPassword={() =>
                                                    handleClickShowPassword(
                                                        "newPassword"
                                                    )
                                                }
                                                showPassword={
                                                    showPasswords.newPassword
                                                }
                                                label="New Password *"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <PasswordInput
                                                dataCy="new-password-input"
                                                valueName="newPasswordConfirmation"
                                                password={
                                                    values.newPasswordConfirmation
                                                }
                                                error={
                                                    errors.newPasswordConfirmation
                                                }
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                touched={
                                                    touched.newPasswordConfirmation
                                                }
                                                handleClickShowPassword={() =>
                                                    handleClickShowPassword(
                                                        "newPasswordConfirmation"
                                                    )
                                                }
                                                showPassword={
                                                    showPasswords.newPasswordConfirmation
                                                }
                                                label="Confirm New Password *"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        sx={{ mt: 5, alignSelf: "center" }}
                                        disabled={disableButton}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default NewPasswordPage;
