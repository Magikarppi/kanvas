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
import React, { useState } from "react";
import userRequests from "../../../services/userService";
import NavigateBackIcon from "../../../components/NavigationButtons/NavigateBackIcon";
import { validEmail } from "../../../utils/inputChecks";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState<string>("");
    const [touched, setTouched] = useState(false);

    const isValidEmail = validEmail(email);
    const isValidInput = touched && !isValidEmail;

    const getErrorText = touched && !isValidEmail && "Invalid email address";
    const disableButton = email === "" || !isValidEmail;

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await userRequests.forgotPassword(email);
            setEmail("");
            setTouched(false);
            toast.success(response.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data);
            }
        }
    };

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
                                            <InputLabel htmlFor="email">
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
