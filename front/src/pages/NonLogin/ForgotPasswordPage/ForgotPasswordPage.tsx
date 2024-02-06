import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import userRequests from "../../../services/userService";
import NavigateBackIcon from "../../../components/NavigationButtons/NavigateBackIcon";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import EmailInput from "../../../components/Inputs/EmailInput";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "../../../schemas";

export default function ForgotPasswordPage() {
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
        },
        validationSchema: forgotPasswordSchema,
        async onSubmit(values) {
            try {
                const response = await userRequests.forgotPassword(
                    values.email
                );
                toast.success(response.data);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data);
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
        <div className="pageContainer">
            <NavigateBackIcon />
            <Grid container display="flex" justifyContent="center">
                <Grid item xs={10} md={6} xl={5}>
                    <Paper elevation={1} className="elevatedSection">
                        <Container maxWidth="xs">
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{ marginBottom: "15px" }}
                                >
                                    Forgot password
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                Enter your email address and we
                                                will send you a password reset
                                                link.
                                            </Typography>
                                            <EmailInput
                                                email={values.email}
                                                error={errors.email}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                touched={touched.email}
                                            />
                                            <Grid
                                                style={{ textAlign: "center" }}
                                            >
                                                <Button
                                                    sx={{ mt: 4 }}
                                                    variant="contained"
                                                    color="secondary"
                                                    type="submit"
                                                    disabled={disableButton}
                                                >
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
