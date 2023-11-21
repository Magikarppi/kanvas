import { useNavigate } from "react-router-dom";
import { Box, Divider, Grid, Link, Typography } from "@mui/material";

const Footer = () => {
    const navigate = useNavigate();

    const handleNavigation = (location: string) => {
        if (window.location.pathname !== location) {
            navigate(location);
        }
    };

    return (
        <Box className="homePageFooter" component="footer">
            <Grid container spacing={2}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Link
                        component="button"
                        color="inherit"
                        underline="none"
                        onClick={() => handleNavigation("/")}
                    >
                        <Typography variant="body1">Kanvas</Typography>
                    </Link>
                </Grid>
                <Grid item xs={1} />

                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Divider />
                </Grid>
                <Grid item xs={1} />

                <Grid item xs={1} />
                <Grid item xs={3.33}>
                    <Typography variant="body1">Info</Typography>
                </Grid>
                <Grid item xs={3.33}>
                    <Typography variant="body1">Careers</Typography>
                </Grid>
                <Grid item xs={3.33}>
                    <Typography variant="body1">Privacy</Typography>
                </Grid>
                <Grid item xs={1} />

                <Grid item xs={1} />
                <Grid item xs={5}>
                    <Link
                        component="button"
                        color="inherit"
                        underline="none"
                        onClick={() => handleNavigation("/sign-up")}
                    >
                        <Typography variant="body1">Sign up</Typography>
                    </Link>
                </Grid>
                <Grid item xs={5}>
                    <Link
                        component="button"
                        color="inherit"
                        underline="none"
                        onClick={() => handleNavigation("/sign-in")}
                    >
                        <Typography variant="body1">Sign in</Typography>
                    </Link>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </Box>
    );
};

export default Footer;
