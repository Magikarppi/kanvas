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
            <Link to="/projects">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icons.Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"></ListItemText>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Divider />
            <Link to="/projects">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icons.Projects />
                        </ListItemIcon>
                        <ListItemText primary="Projects" />
                    </ListItemButton>
                </ListItem>
            </Link>
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
            <Link to="/profile">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icons.Account />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </ListItem>
            </Link>
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
