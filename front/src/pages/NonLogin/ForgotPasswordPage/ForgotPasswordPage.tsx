import {
    Box,
    Button,
    Container,
    Grid,
    InputLabel,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import userRequests from "../../../services/userService";
import NavigateBackIcon from "../../../components/NavigationButtons/NavigateBackIcon";
import { validEmail } from "../../../utils/inputChecks";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState<string>("");
    const [touched, setTouched] = useState(false);

    const isValidEmail = emailRegex.test(email);
    const isValidInput = touched && !isValidEmail;

    const getErrorText = touched && !isValidEmail && "Invalid email address";
    const disableButton = email === "" || !isValidEmail;

    const [emailError, setEmailError] = useState("");

    const handleSubmit = async () => {
        try {
            if (validEmail(email)) {
                await userRequests.forgotPassword(
                    "user-id-replace-with-actual-user-id",
                    email
                );
                setEmail("");
                setEmailError("");
                setTouched(false);
            } else {
                setEmailError(
                    "The email address you entered is not valid. ensure correctness."
                );
            }
            // Set success notification
        } catch (error) {
            console.error(error);
            // Set error notification
        }
    };

    return (
        <div className="pageContainer">
            <NavigateBackIcon />
            <Grid container>
                <Grid item md={2} />
                <Grid item md={8}>
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
                                <Box component="form">
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
                                            <InputLabel>
                                                Email Address *
                                            </InputLabel>
                                            <TextField
                                                error={isValidInput}
                                                required
                                                value={email}
                                                fullWidth
                                                size="small"
                                                type="email"
                                                id="email"
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                name="email"
                                                helperText={getErrorText}
                                                onBlur={() => setTouched(true)}
                                                autoComplete="off"
                                            />
                                            <Grid
                                                style={{ textAlign: "center" }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={handleSubmit}
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
                <Grid item md={2} />
            </Grid>
        </div>
    );
}
