import { Grid } from "@mui/material";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserChangePassword from "../../components/UserProfile/UserChangePassword";
import { selectToken, selectUser } from "../../redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
    const user = selectUser();
    const token = selectToken();

    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !user) {
            navigate("/");
        }
    }, [token, user]);

    return !token && !user ? null : (
        <Grid
            container
            spacing={2}
            className="pageContainer"
            display="flex"
            justifyContent="center"
        >
            <Grid item xs={11} md={9} lg={9} xl={6}>
                <UserProfile token={token} user={user} />
                <UserChangePassword token={token} user={user} />
            </Grid>
        </Grid>
    );
};

export default UserProfilePage;
