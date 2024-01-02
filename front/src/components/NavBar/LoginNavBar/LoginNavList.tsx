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
                        <ListItemText primaryTypographyProps= { { fontSize: "14px" }} primary="Dashboard"></ListItemText>
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
                        <ListItemText primaryTypographyProps= { { fontSize: "14px" }}  primary="Projects" />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Divider />
            <Link to="/teams">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icons.Team />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps= { { fontSize: "14px" }}  primary="Teams" />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Divider />
            <Link to="/profile">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icons.Account />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps= { { fontSize: "14px" }}  primary="Profile" />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Divider />
            <Link to="/messages">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icons.Message />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps= { { fontSize: "14px" }}  primary="Messages" />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Divider />
            <Link to="/notifications">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icons.Notifications />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps= { { fontSize: "14px" }}  primary="Notifications" />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Divider />
        </List>
    );
};

export default LoginNavList;
