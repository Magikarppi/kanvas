import { useState } from "react";
import { Button, Grid, Paper, Typography, Box } from "@mui/material";
import userRequests from "../../services/userService";
import { IUpdatePasswordBody, IUser } from "../../models/userModels";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../schemas";
import PasswordInput from "../Inputs/PasswordInput";

interface ShowPassword {
    password: boolean;
    newPassword: boolean;
    newPasswordConfirmation: boolean;
}

const UserChangePassword = ({
    token,
    user,
}: {
    token: string | null | undefined;
    user: IUser | null | undefined;
}) => {
    const [showPassword, setShowPassword] = useState<ShowPassword>({
        password: false,
        newPassword: false,
        newPasswordConfirmation: false,
    });

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
            password: "",
            newPassword: "",
            newPasswordConfirmation: "",
        },
        validationSchema: changePasswordSchema,
        async onSubmit(values) {
            try {
                const changePasswordBody: IUpdatePasswordBody = {
                    id: user?.id || "",
                    oldPassword: values.password,
                    newPassword: values.newPassword,
                    newPasswordConfirmation: values.newPasswordConfirmation,
                };

                await userRequests.updatePassword(
                    token as string,
                    changePasswordBody
                );
                resetForm();
                toast.success("Password successfully updated");
            } catch (error) {
                toast.error("An error occurred while updating the password");
            }
        },
    });

    const disableButton =
        Object.keys(touched).length === 0 ||
        !isValid ||
        Object.keys(errors).length > 0;

    return (
        <Paper elevation={2} className="elevatedSection">
            <Typography
                variant="h4"
                style={{ marginTop: "40px", marginBottom: "30px" }}
            >
                Change your password
            </Typography>
            <Grid
                container
                style={{ marginBottom: "20px" }}
                display="flex"
                justifyContent="center"
            >
                <Grid item xs={10} md={8}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "center",
                        }}
                    >
                        <PasswordInput
                            dataCy="password-input"
                            valueName="password"
                            disableValidation={true}
                            label="Current password"
                            error={errors.password}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            password={values.password}
                            touched={touched.password}
                            showPassword={showPassword.password}
                            handleClickShowPassword={() =>
                                handleClickShowPassword("password")
                            }
                        />
                        <PasswordInput
                            dataCy="new-password-input"
                            valueName="newPassword"
                            disableValidation={false}
                            label="New password *"
                            error={errors.newPassword}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            password={values.newPassword}
                            touched={touched.newPassword}
                            showPassword={showPassword.newPassword}
                            handleClickShowPassword={() =>
                                handleClickShowPassword("newPassword")
                            }
                        />
                        <PasswordInput
                            dataCy="new-password-confirmation-input"
                            valueName="newPasswordConfirmation"
                            disableValidation={false}
                            label="Confirm new password *"
                            error={errors.newPasswordConfirmation}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            password={values.newPasswordConfirmation}
                            touched={touched.newPasswordConfirmation}
                            showPassword={showPassword.newPasswordConfirmation}
                            handleClickShowPassword={() =>
                                handleClickShowPassword(
                                    "newPasswordConfirmation"
                                )
                            }
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={disableButton}
                            sx={{ mt: 5, alignSelf: "center" }}
                        >
                            Change Password
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserChangePassword;
