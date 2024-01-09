import { useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import Icons from "../Icons/Icons";

const NonLoginNavBar = () => {
    const navigate = useNavigate();

    const handleSignInNavigation = () => {
        if (window.location.pathname !== "/sign-in") {
            navigate("/sign-in");
        }
    };

    return (
        <div className="navBarContainer">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h4" color="inherit" component="div">
                        Kanvas
                    </Typography>
                    <div className="navbarButtonContainer">
                        <Button
                            color="inherit"
                            sx={{ mt: 1 }}
                            startIcon={<Icons.User />}
                            onClick={handleSignInNavigation}
                        >
                            Sign in
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NonLoginNavBar;
