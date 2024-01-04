import { useState, MouseEvent, ChangeEvent } from "react";

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
import { IUpdatePasswordBody } from "../../models/userModels";
import { validatePasswordFormat } from "../../utils/inputChecks";
import { toast } from "react-toastify";
import { selectToken, selectUser } from "../../redux/hooks";
import DefaultToastContainer from "../Toast/DefaultToastContainer";
import {
    passwordsNoMatchHelperText,
    validPasswordHelperText,
} from "../../utils/helperMessages";

interface IChangePasswordState {
    password: string;
    newPassword: string;
    newPasswordConfirm: string;
}

const UserChangePassword = () => {
    const user = selectUser();
    const token = selectToken();

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
        <Paper elevation={1} className="userEditProfileContainer">
            <DefaultToastContainer />
            <Typography
                variant="h4"
                style={{ marginTop: "40px", marginBottom: "30px" }}
            >
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
                    <Box
                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "center",
                        }}
                    >
                        <InputLabel
                            style={{
                                fontSize: 14,
                                marginBottom: 3,
                                marginLeft: 6,
                            }}
                            htmlFor="firstName"
                        >
                            Current password *
                        </InputLabel>
                        <TextField
                            required
                            fullWidth
                            autoComplete="off"
                            size="small"
                            name="password"
                            type={showPasswords.password ? "text" : "password"}
                            id="outlined-required-originalPassword"
                            error={validateInput("password")}
                            helperText={getErrorText("password")}
                            value={formData.password}
                            onChange={handleInputChange}
                            onBlur={() => handleInputBlur("password")}
                            sx={{ "& input": { fontSize: 14 } }}
                            FormHelperTextProps={{ style: { fontSize: 12 } }}
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
                        <InputLabel
                            style={{
                                fontSize: 14,
                                marginBottom: 4,
                                marginLeft: 6,
                                marginTop: 8,
                            }}
                            htmlFor="newPassword"
                        >
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
                            id="outlined-required-newPassword1"
                            error={validateInput("newPassword")}
                            helperText={getErrorText("newPassword")}
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            onBlur={() => handleInputBlur("newPassword")}
                            sx={{ "& input": { fontSize: 14 } }}
                            FormHelperTextProps={{ style: { fontSize: 12 } }}
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
                        <InputLabel
                            style={{
                                fontSize: 14,
                                marginBottom: 4,
                                marginLeft: 6,
                                marginTop: 8,
                            }}
                            htmlFor="newPasswordConfirm"
                        >
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
                            id="outlined-required-newPassword2"
                            error={validateInput("newPasswordConfirm")}
                            helperText={getErrorText("newPasswordConfirm")}
                            value={formData.newPasswordConfirm}
                            onChange={handleInputChange}
                            onBlur={() => handleInputBlur("newPasswordConfirm")}
                            sx={{ "& input": { fontSize: 14 } }}
                            FormHelperTextProps={{ style: { fontSize: 12 } }}
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
                    </Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{
                            marginTop: "20px",
                            fontSize: 13,
                            width: "140px",
                        }}
                        onClick={handleSubmit}
                        size="large"
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
