import { useState } from "react";
import { Grid } from "@mui/material";

import UserProfileMenuList from "../../components/UserProfile/UserProfileMenuList";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserChangePassword from "../../components/UserProfile/UserChangePassword";

const UserProfilePage = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    return (
        <Grid container spacing={2} className="pageContainer">
            <Grid item xs={1} />

            <Grid item xs={10} md={3.5} lg={2} xl={1.5}>
                <UserProfileMenuList
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                />
            </Grid>
            <Grid item xs={1} display={{ xs: "visible", md: "none" }} />
            <Grid item xs={1} display={{ xs: "visible", md: "none" }} />
            <Grid item xs={10} md={6.5} lg={8} xl={8.5}>
                {selectedIndex === 0 ? (
                    <UserProfile />
                ) : selectedIndex === 2 ? (
                    <UserChangePassword />
                ) : (
                    <></>
                )}
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
};

export default UserProfilePage;
