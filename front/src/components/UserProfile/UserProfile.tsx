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

const UserProfile = () => {
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
                User's profile
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