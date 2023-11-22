import {
    AppBar,
    Avatar,
    Badge,
    Box,
    IconButton,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";

import LoginNavDrawer from "./LoginNavDrawer";
import LoginNavBarSearch from "./LoginNavBarSearch";
import Icons from "../../Icons/Icons";

import { TOpen } from "../../../models/themeModels";

const LoginNavBar = ({ open, setOpen }: TOpen) => {
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <div className="navBarContainer">
            <Box sx={{ display: "flex" }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ ...(open && { display: "none" }) }}
                        >
                            <Icons.Menu />
                        </IconButton>
                        <Typography
                            variant="h5"
                            color="inherit"
                            component="div"
                        >
                            Kanvas
                        </Typography>
                        <div className="navbarButtonContainer">
                            <Stack direction="row" spacing={1}>
                                <LoginNavBarSearch />
                                <IconButton>
                                    <Badge color="secondary" badgeContent={4}>
                                        <Icons.Notifications size="18" />
                                    </Badge>
                                </IconButton>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{
                                        height: "28px",
                                        width: "28px",
                                        alignSelf: "center",
                                    }}
                                />
                            </Stack>
                        </div>
                    </Toolbar>
                </AppBar>
                <LoginNavDrawer open={open} setOpen={setOpen} />
            </Box>
        </div>
    );
};

export default LoginNavBar;
