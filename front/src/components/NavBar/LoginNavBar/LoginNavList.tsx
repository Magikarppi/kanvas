import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import Icons from "../../Icons/Icons";
import { Link } from "react-router-dom";

const LoginNavList = () => {
    return (
        <List disablePadding>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Icons.Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Icons.Projects />
                    </ListItemIcon>
                    <ListItemText primary="Projects" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Icons.Team />
                    </ListItemIcon>
                    <ListItemText primary="Teams" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <Link to="/profile">
                    <ListItemButton>
                        <ListItemIcon>
                            <Icons.Account />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </Link>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Icons.Message />
                    </ListItemIcon>
                    <ListItemText primary="Messages" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Icons.Notifications />
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                </ListItemButton>
            </ListItem>
            <Divider />
        </List>
    );
};

export default LoginNavList;
