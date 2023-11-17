import { Box, Divider, Grid, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box className="homePageFooter" component="footer">
            <Grid container spacing={2}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Typography variant="body1">Kanvas</Typography>
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
            </Grid>
        </Box>
    );
};

export default Footer;
