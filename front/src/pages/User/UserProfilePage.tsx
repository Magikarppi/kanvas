import { useState } from "react";
import { Grid } from "@mui/material";
import UserProfile from "../../components/UserProfile/UserProfile";

const UserProfilePage = () => {

    return (
        <Grid container spacing={2} className="pageContainer">
            <Grid item xs={1} />
            <Grid item xs={10} md={3.5} lg={2} xl={1.5}>
            </Grid>
            <Grid item xs={10} md={6.5} lg={8} xl={8.5}>
                <UserProfile />
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
};

export default UserProfilePage;
