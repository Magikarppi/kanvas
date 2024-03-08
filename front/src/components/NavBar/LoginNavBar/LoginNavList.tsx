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
            <Link to="/dashboard">
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
        </List>
    );
};

export default LoginNavList;
