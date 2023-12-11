import { useState, MouseEvent, ChangeEvent } from "react";

import {
    Button,
    Grid,
    InputAdornment,
    IconButton,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import Icons from "../Icons/Icons";
import userRequests from "../../services/userService";
import { IUpdatePasswordBody } from "../../models/userModels";
import { validatePasswordFormat } from "../../utils/inputChecks";

interface IChangePasswordState {
    password: string;
    newPassword: string;
    newPasswordConfirm: string;
}

const UserChangePassword = () => {
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

    const handleSubmit = async () => {
        try {
            const changePasswordBody: IUpdatePasswordBody = {
                id: "insert-valid-user-id-here",
                oldPassword: formData.password,
                newPassword: formData.newPassword,
                newPasswordConfirmation: formData.newPasswordConfirm,
            };

            await userRequests.updatePassword(
                "insert-valid-user-token-here",
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
        } catch (error) {
            console.error(error);
            // TODO: set error notification
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
            return "The password should be 8-50 characters long and contain at least one special character and one number";
        } else if (
            touchedFields[field] &&
            field === "newPasswordConfirm" &&
            formData.newPassword !== formData.newPasswordConfirm
        ) {
            return "Passwords do not match";
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
        <Paper elevation={1} className="userEditProfileContainer">
            <Typography variant="h5" style={{ margin: "30px 0 30px 0" }}>
                Change your password
            </Typography>
            <Grid container style={{ marginBottom: "40px" }}>
                <Grid item xs={1} md={1.5} lg={3.5} />
                <Grid
                    item
                    xs={10}
                    md={9}
                    lg={5}
                    style={{ textAlign: "center" }}
                >
                    <form>
                        <TextField
                            required
                            sx={{ mb: 2 }}
                            fullWidth
                            autoComplete="off"
                            size="small"
                            name="password"
                            type={showPasswords.password ? "text" : "password"}
                            id="outlined-required-originalPassword"
                            label="Current password"
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
                        <TextField
                            required
                            sx={{ mb: 2 }}
                            fullWidth
                            autoComplete="off"
                            size="small"
                            name="newPassword"
                            type={
                                showPasswords.newPassword ? "text" : "password"
                            }
                            id="outlined-required-newPassword1"
                            label="New password"
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
                            id="outlined-required-newPassword2"
                            label="Confirm new password"
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
                    </form>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: "20px" }}
                        onClick={handleSubmit}
                        disabled={isSubmitDisabled}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserChangePassword;
