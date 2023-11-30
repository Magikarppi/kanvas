import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
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
            if(validEmail(email)){
                await userRequests.newPassword(
                    "user-id-replace-with-actual-user-id",
                    email
                );
                setEmail("");
                setTouched(false);
            }
            else{
                setEmailError("Syöttämäsi sähköpostiosoite ei ole validi. Varmista oikeamuotoisuus.");
            }
            // Set success notification
        } catch (error) {
            console.error(error);
            // Set error notification
        }
    };

    return (
        <Grid container spacing={2} className="userProfilePage">
            <Grid item lg={4}>
                <NavigateBackIcon />
            </Grid>
            <Grid item lg={4}>
                <Paper elevation={1} className="forgotPasswordContainer">
                    <Typography variant="h5" sx={{ marginBottom: "15px" }}>
                        Forgot password
                    </Typography>
                    <Grid container>
                        <Grid item xs={3} md={3} lg={3} />
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    marginBottom: "5px",
                                }}
                            >
                                Enter your email address and we will send you a
                                password reset link.
                            </Typography>
                            <TextField
                                error={isValidInput}
                                required
                                value={email}
                                fullWidth
                                size="small"
                                type="email"
                                label="Email Address"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                helperText={getErrorText}
                                onBlur={() => setTouched(true)}
                                autoComplete="off"
                                sx={{ mt: 1 }}
                            />
                            <Grid style={{ textAlign: "center" }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginTop: "20px" }}
                                    onClick={handleSubmit}
                                    disabled={disableButton}
                                    fullWidth
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3} />
                    </Grid>
                </Paper>
            </Grid>
            <Grid item lg={4} />
        </Grid>
    );
}
