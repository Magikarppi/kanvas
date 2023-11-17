import { useState, MouseEvent } from "react";

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

const UserChangePassword = () => {
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showNewPasswordConfirm, setShowNewPasswordConfirm] =
        useState<boolean>(false);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
                            fullWidth
                            autoComplete="off"
                            size="small"
                            type={showPassword ? "text" : "password"}
                            id="outlined-required-originalPassword"
                            label="Current password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setShowPassword((show) => !show)
                                            }
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
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
                            type={showNewPassword ? "text" : "password"}
                            id="outlined-required-newPassword1"
                            label="New password"
                            value={newPassword}
                            onChange={({ target }) =>
                                setNewPassword(target.value)
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setShowNewPassword(
                                                    (show) => !show
                                                )
                                            }
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showNewPassword ? (
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
                            type={showNewPasswordConfirm ? "text" : "password"}
                            id="outlined-required-newPassword2"
                            label="Confirm new password"
                            value={newPasswordConfirm}
                            onChange={({ target }) =>
                                setNewPasswordConfirm(target.value)
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setShowNewPasswordConfirm(
                                                    (show) => !show
                                                )
                                            }
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showNewPasswordConfirm ? (
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
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserChangePassword;
