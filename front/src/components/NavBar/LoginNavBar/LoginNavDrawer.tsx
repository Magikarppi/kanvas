import {
    Button,
    Divider,
    IconButton,
    SwipeableDrawer,
    Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import LoginNavList from "./LoginNavList";
import Icons from "../../Icons/Icons";

import { TOpen } from "../../../models/themeModels";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../../redux/userReducer";

const LoginNavDrawer = ({ open, setOpen }: TOpen) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const drawerWidth = 240;


    const handleSignOut = () => {
        dispatch(setToken(null));
        navigate("/"); 
    };
    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        justifyContent: "space-between",
        flexDirection: "row",
        minHeight: "48px",
    }));

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <SwipeableDrawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
        >
            <DrawerHeader>
                <Typography
                    variant="h5"
                    color="inherit"
                    component="div"
                    style={{ alignContent: "flex-start" }}
                >
                    Kanvas
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                        <Icons.ArrowBack />
                    ) : (
                        <Icons.ArrowForward />
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <LoginNavList />
            <Button
                variant="outlined"
                fullWidth
                className="loginNavSignOutButton"
                style={{
                    position: "absolute",
                    bottom: "10px",
                    margin: "0 -20px 0px 20px",
                    width: "200px",
                }}
                onClick={() => handleSignOut()}
            >
                Sign out
            </Button>
        </SwipeableDrawer>
    );
};

export default LoginNavDrawer;
