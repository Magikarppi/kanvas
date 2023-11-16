import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import Icons from "../Icons/Icons";

const NonLoginNavBar = () => {
    return (
        <div className="navBarContainer">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h5" color="inherit" component="div">
                        Kanvas
                    </Typography>
                    <div className="navbarButtonContainer">
                        <Button color="inherit" startIcon={<Icons.User />}>
                            Sign in
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NonLoginNavBar;
