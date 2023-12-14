import { Dispatch, SetStateAction } from "react";

import {
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    Paper,
    Typography,
} from "@mui/material";

import Icons from "../../components/Icons/Icons";
import { setToken } from "../../redux/userReducer";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

type listIndex = {
    selectedIndex: number;
    setSelectedIndex: Dispatch<SetStateAction<number>>;
};

const UserProfileMenuList = ({
    selectedIndex,
    setSelectedIndex,
}: listIndex) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(setToken(null));
        navigate("/");
    };
    return (
        <Paper elevation={12}>
            <List>
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={() => setSelectedIndex(0)}
                >
                    <ListItemIcon>
                        <Icons.Account size="18" />
                    </ListItemIcon>
                    <Typography variant="body2">Profile</Typography>
                </ListItemButton>
                <Divider />
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={() => setSelectedIndex(1)}
                >
                    <ListItemIcon>
                        <Icons.Message size="18" />
                    </ListItemIcon>
                    <Typography variant="body2">Messages</Typography>
                </ListItemButton>
                <Divider />
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={() => setSelectedIndex(2)}
                >
                    <ListItemIcon>
                        <Icons.Key size="18" />
                    </ListItemIcon>
                    <Typography variant="body2">Change password</Typography>
                </ListItemButton>
                <Divider />
                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={() => setSelectedIndex(3)}
                >
                    <ListItemIcon>
                        <Icons.Delete size="18" />
                    </ListItemIcon>
                    <Typography variant="body2">Delete account</Typography>
                </ListItemButton>
                <Divider />
                <ListItemButton
                    selected={selectedIndex === 4}
                    onClick={() => setSelectedIndex(4)}
                >
                    <ListItemIcon>
                        <Icons.SignOut size="18" />
                    </ListItemIcon>
                    <Typography variant="body2" onClick={() => handleSignOut()}>Sign out</Typography>
                </ListItemButton>
            </List>
        </Paper>
    );
};

export default UserProfileMenuList;
