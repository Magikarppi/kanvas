import React from "react";
import { Button, Grid, Typography } from "@mui/material";

const HomePage = () => {
    return (
        <div>
            <Grid container spacing={1} className="homeContainer1">
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <div className="homePageCard">
                        <Typography variant="h3" className="homeTitle">
                            Kanvas
                        </Typography>
                        <Typography variant="body1" className="homeBodyText">
                            Sign up for your account today...
                        </Typography>
                        <Button variant="contained" color="secondary">
                            Sign up
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </div>
    );
};

export default HomePage;
