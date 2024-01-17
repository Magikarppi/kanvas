import { ChangeEvent, useState } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { validatePasswordFormat } from "../../../utils/inputChecks";
import {
    passwordsNoMatchHelperText,
    validPasswordHelperText,
} from "../../../utils/helperMessages";
import Icons from "../../../components/Icons/Icons";
import userRequests from "../../../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const NewPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [newPasswordData, setNewPasswordData] = useState({
        newPassword: "",
        newPasswordConfirmation: "",
    });
    const [touchedFields, setTouchedFields] = useState({
        newPassword: false,
        newPasswordConfirmation: false,
    });

    const [showPasswords, setShowPasswords] = useState({
        newPassword: false,
        newPasswordConfirmation: false,
    });

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPasswordData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (token) {
            try {
                const response = await userRequests.newPassword(
                    token,
                    newPasswordData
                );
                toast.success(response);
                navigate("/sign-in");
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data);
                }
            }
        }
    };

    const validateInputs = (field: keyof typeof newPasswordData) => {
        const value = newPasswordData[field];

        if (field === "newPassword") {
            return touchedFields[field] && !validatePasswordFormat(value);
        }

        if (
            field === "newPasswordConfirmation" &&
            newPasswordData.newPassword !==
                newPasswordData.newPasswordConfirmation
        ) {
            return touchedFields[field];
        } else {
            return touchedFields[field] && value === "";
        }
    };

    const getErrorText = (field: keyof typeof newPasswordData) => {
        const value = newPasswordData[field];

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
            field === "newPasswordConfirmation" &&
            newPasswordData.newPassword !==
                newPasswordData.newPasswordConfirmation
        ) {
            return passwordsNoMatchHelperText;
        } else {
            return null;
        }
    };

    const handleInputBlur = (field: keyof typeof newPasswordData) => {
        setTouchedFields((prevTouchedFields) => ({
            ...prevTouchedFields,
            [field]: true,
        }));
    };

    const handleClickShowPassword = (field: keyof typeof showPasswords) => {
        setShowPasswords((prevFields) => ({
            ...prevFields,
            [field]: !prevFields[field],
        }));
    };

    const isSubmitDisabled =
        !validatePasswordFormat(newPasswordData.newPassword) ||
        newPasswordData.newPassword !== newPasswordData.newPasswordConfirmation;

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
                                            <InputLabel htmlFor="newPassword">
                                                New Password *
                                            </InputLabel>
                                            <TextField
                                                error={validateInputs(
                                                    "newPassword"
                                                )}
                                                required
                                                value={
                                                    newPasswordData.newPassword
                                                }
                                                fullWidth
                                                size="small"
                                                type={
                                                    showPasswords.newPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                id="newPassword"
                                                onChange={handleChange}
                                                name="newPassword"
                                                helperText={getErrorText(
                                                    "newPassword"
                                                )}
                                                onBlur={() =>
                                                    handleInputBlur(
                                                        "newPassword"
                                                    )
                                                }
                                                autoComplete="off"
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
                                                                onMouseDown={(
                                                                    e
                                                                ) =>
                                                                    e.preventDefault()
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
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputLabel htmlFor="newPasswordConfirmation">
                                                Confirm New Password *
                                            </InputLabel>
                                            <TextField
                                                error={validateInputs(
                                                    "newPasswordConfirmation"
                                                )}
                                                required
                                                value={
                                                    newPasswordData.newPasswordConfirmation
                                                }
                                                fullWidth
                                                size="small"
                                                type={
                                                    showPasswords.newPasswordConfirmation
                                                        ? "text"
                                                        : "password"
                                                }
                                                id="newPasswordConfirmation"
                                                onChange={handleChange}
                                                name="newPasswordConfirmation"
                                                helperText={getErrorText(
                                                    "newPasswordConfirmation"
                                                )}
                                                onBlur={() =>
                                                    handleInputBlur(
                                                        "newPasswordConfirmation"
                                                    )
                                                }
                                                autoComplete="off"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() =>
                                                                    handleClickShowPassword(
                                                                        "newPasswordConfirmation"
                                                                    )
                                                                }
                                                                onMouseDown={(
                                                                    e
                                                                ) =>
                                                                    e.preventDefault()
                                                                }
                                                                edge="end"
                                                            >
                                                                {showPasswords.newPasswordConfirmation ? (
                                                                    <Icons.VisibilityOff />
                                                                ) : (
                                                                    <Icons.Visibility />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        sx={{ mt: 5, alignSelf: "center" }}
                                        disabled={isSubmitDisabled}
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
