import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
} from "@mui/material";
import Icons from "../Icons/Icons";

type Props = {
    anchorEl: null | HTMLElement;
    setAnchorEl: (target: null) => void;
    wantsToRename: () => void;
    wantsToAddCard?: () => void;
    wantsToDeleteColumn: () => void;
};

const ColumnDotMenu = ({
    anchorEl,
    setAnchorEl,
    wantsToRename,
    wantsToAddCard,
    wantsToDeleteColumn,
}: Props) => {
    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    return (
        <Popover
            disableScrollLock={true}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            sx={{ ".MuiPopover-paper": { padding: 0 } }}
        >
            <List sx={{ padding: 0 }}>
                <ListItem disablePadding>
                    <ListItemButton
                        data-cy="open-add-card-modal-button"
                        onClick={() =>
                            wantsToAddCard ? wantsToAddCard() : null
                        }
                    >
                        <ListItemIcon>
                            <Icons.Add />
                        </ListItemIcon>
                        <ListItemText>Add a New Card</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => wantsToRename()}
                        data-cy="rename-column-button"
                    >
                        <ListItemIcon>
                            <Icons.Edit />
                        </ListItemIcon>
                        <ListItemText>Rename Column</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => wantsToDeleteColumn()}
                        data-cy="delete-column-button"
                    >
                        <ListItemIcon>
                            <Icons.DeleteForever />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{ color: "error" }}
                        >
                            Delete Column
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Popover>
    );
};

export default ColumnDotMenu;
