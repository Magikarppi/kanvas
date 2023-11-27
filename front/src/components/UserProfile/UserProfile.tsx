import {
    Avatar,
    Button,
    Checkbox,
    Grid,
    Paper,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { IUpdateUserBodyWithoutPassword } from "../../models/userModels";
import userRequests from "../../services/userService";

const UserProfile = () => {
    const handleSubmit = async () => {
        const updatedUser: IUpdateUserBodyWithoutPassword = {
            // get values from form when it is implemented
            first_name: "formValues.firstName",
            last_name: "formValues.lastName",
            email: "formValues.email",
            phone_number: "formValues.phoneNumber" || null,
            country: "formValues.country" || null,
            city: "formValues.city" || null,
            linkedin_username: "formValues.linkedInUsername" || null,
            id: "Get this id from state / store",
            is_open_to_work: false /* formValues.isOpenToWork */,
            job_pitch: "formValues.jobPitch",
            picture: "formValues.picture?",
        };

        try {
            await userRequests.updateUser(
                "user-token-replace-with-actual-token",
                updatedUser
            );
        } catch (error) {
            console.error(error);
            // Set error notification
        }
    };

    return (
        <Paper elevation={1} className="userEditProfileContainer">
            <Tooltip title="Change your picture" arrow placement="right">
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 100, height: 100, margin: "20px 0 20px 0" }}
                />
            </Tooltip>

            <Typography variant="h5" style={{ marginBottom: "30px" }}>
                Users profile
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
                    <TextField
                        required
                        fullWidth
                        size="small"
                        id="outlined-required-firstName"
                        label="First Name"
                    />
                    <TextField
                        required
                        fullWidth
                        size="small"
                        id="outlined-required-lastName"
                        label="Last Name"
                    />
                    <TextField
                        required
                        fullWidth
                        size="small"
                        id="outlined-required-email"
                        type="email"
                        label="Email address"
                    />
                    <TextField
                        fullWidth
                        size="small"
                        id="outlined-required-phone"
                        type="tel"
                        label="Phone number"
                    />
                    <TextField
                        fullWidth
                        size="small"
                        id="outlined-country"
                        type="text"
                        label="Country"
                    />
                    <TextField
                        fullWidth
                        size="small"
                        id="outlined-city"
                        type="text"
                        label="City"
                    />
                    <TextField
                        fullWidth
                        size="small"
                        id="outlined-linkedin"
                        type="text"
                        label="LinkedIn Username"
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        size="small"
                        id="outlined-about"
                        type="text"
                        label="About you"
                    />
                    <div>
                        <Checkbox /> Are you open to finding work?
                    </div>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: "20px" }}
                        onClick={handleSubmit}
                    >
                        Submit changes
                    </Button>
                    <Grid item xs={1} md={1.5} lg={3.5} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserProfile;
