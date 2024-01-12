import { Grid } from "@mui/material";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserChangePassword from "../../components/UserProfile/UserChangePassword";

const UserProfilePage = () => {

    return (
        <Grid container spacing={2} className="pageContainer" display="flex" justifyContent="center">
            <Grid item xs={11} md={9} lg={9} xl={7}>
                <UserProfile />
                <UserChangePassword />
            </Grid>
        </Grid>
    );
};



export default UserProfilePage;
