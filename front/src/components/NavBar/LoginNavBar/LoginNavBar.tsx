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
        <>
            <Box sx={{ display: "flex", height: "65px" }}>
                <AppBar sx={{ paddingLeft: "0px" }}>
                    <Toolbar
                        variant="dense"
                        sx={{ boxShadow: "0px 5px 5px #3d3d3d" }}
                    >
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
                            variant="h4"
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
        </>
    );
};

export default LoginNavBar;
