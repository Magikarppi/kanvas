import React, { useState, MouseEvent, ChangeEvent, FormEvent } from "react";
import {
    Button,
    Grid,
    InputAdornment,
    IconButton,
    Paper,
    TextField,
    Typography,
    Box,
    InputLabel,
} from "@mui/material";
import Icons from "../Icons/Icons";
import userRequests from "../../services/userService";
import { IUpdatePasswordBody, IUser } from "../../models/userModels";
import { validatePasswordFormat } from "../../utils/inputChecks";
import { toast } from "react-toastify";
import {
    passwordsNoMatchHelperText,
    validPasswordHelperText,
} from "../../utils/helperMessages";

interface IChangePasswordState {
    password: string;
    newPassword: string;
    newPasswordConfirm: string;
}

const UserChangePassword = ({
    token,
    user,
}: {
    token: string | null | undefined;
    user: IUser | null | undefined;
}) => {
    const [formData, setFormData] = useState<IChangePasswordState>({
        password: "",
        newPassword: "",
        newPasswordConfirm: "",
    });

    const [showPasswords, setShowPasswords] = useState({
        password: false,
        newPassword: false,
        newPasswordConfirm: false,
    });

    const [touchedFields, setTouchedFields] = useState({
        password: false,
        newPassword: false,
        newPasswordConfirm: false,
    });

    const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const changePasswordBody: IUpdatePasswordBody = {
                id: user?.id || "",
                oldPassword: formData.password,
                newPassword: formData.newPassword,
                newPasswordConfirmation: formData.newPasswordConfirm,
            };

            await userRequests.updatePassword(
                token as string,
                changePasswordBody
            );
            setFormData({
                password: "",
                newPassword: "",
                newPasswordConfirm: "",
            });
            setTouchedFields({
                password: false,
                newPassword: false,
                newPasswordConfirm: false,
            });
            toast.success("Password successfully updated");
        } catch (error) {
            toast.error("An error occurred while updating the password");
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleClickShowPassword = (field: keyof typeof showPasswords) => {
        setShowPasswords((prevFields) => ({
            ...prevFields,
            [field]: !prevFields[field],
        }));
    };

    const handleInputBlur = (field: keyof typeof formData) => {
        setTouchedFields((prevTouched) => ({ ...prevTouched, [field]: true }));
    };

    const validateInput = (field: keyof typeof formData) => {
        const value = formData[field];
        if (field === "newPassword") {
            return touchedFields[field] && !validatePasswordFormat(value);
        } else if (
            field === "newPasswordConfirm" &&
            formData.newPassword !== formData.newPasswordConfirm
        ) {
            return touchedFields[field];
        } else {
            return touchedFields[field] && value === "";
        }
    };

    const getErrorText = (field: keyof typeof formData) => {
        const value = formData[field];
        if (touchedFields[field] && value === "") {
            return "The field must be filled out";
        } else if (
            touchedFields[field] &&
            field === "newPassword" &&
            !validatePasswordFormat(value)
        ) {
            return validPasswordHelperText;
        } else if (
            touchedFields[field] &&
            field === "newPasswordConfirm" &&
            formData.newPassword !== formData.newPasswordConfirm
        ) {
            return passwordsNoMatchHelperText;
        } else {
            return null;
        }
    };

    const isSubmitDisabled =
        formData.password === "" ||
        formData.newPassword === "" ||
        formData.newPasswordConfirm === "" ||
        formData.newPassword !== formData.newPasswordConfirm ||
        !validatePasswordFormat(formData.newPassword);

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
                        <InputLabel htmlFor="password">
                            Current password *
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            autoComplete="off"
                            size="small"
                            name="password"
                            type={showPasswords.password ? "text" : "password"}
                            id="password"
                            error={validateInput("password")}
                            helperText={getErrorText("password")}
                            value={formData.password}
                            onChange={handleInputChange}
                            onBlur={() => handleInputBlur("password")}
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
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPasswords.password ? (
                                                <Icons.VisibilityOff />
                                            ) : (
                                                <Icons.Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <InputLabel htmlFor="newPassword" sx={{ mt: 2 }}>
                            New password *
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            autoComplete="off"
                            size="small"
                            name="newPassword"
                            type={
                                showPasswords.newPassword ? "text" : "password"
                            }
                            id="newPassword"
                            error={validateInput("newPassword")}
                            helperText={getErrorText("newPassword")}
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            onBlur={() => handleInputBlur("newPassword")}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                handleClickShowPassword(
                                                    "newPassword"
                                                )
                                            }
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPasswords.newPassword ? (
                                                <Icons.VisibilityOff />
                                            ) : (
                                                <Icons.Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <InputLabel htmlFor="newPasswordConfirm" sx={{ mt: 2 }}>
                            Confirm new password *
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            autoComplete="off"
                            size="small"
                            name="newPasswordConfirm"
                            type={
                                showPasswords.newPasswordConfirm
                                    ? "text"
                                    : "password"
                            }
                            id="newPasswordConfirm"
                            error={validateInput("newPasswordConfirm")}
                            helperText={getErrorText("newPasswordConfirm")}
                            value={formData.newPasswordConfirm}
                            onChange={handleInputChange}
                            onBlur={() => handleInputBlur("newPasswordConfirm")}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                handleClickShowPassword(
                                                    "newPasswordConfirm"
                                                )
                                            }
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPasswords.newPasswordConfirm ? (
                                                <Icons.VisibilityOff />
                                            ) : (
                                                <Icons.Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={isSubmitDisabled}
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
