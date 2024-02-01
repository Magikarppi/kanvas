import React, { FormEvent, useRef, useState } from "react";
import {
    Box,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    TextField,
    Typography,
} from "@mui/material";
import Icons from "../Icons/Icons";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IProjectColumn } from "../../models/projectModels";
import columnsService from "../../services/columnsService";
import { selectToken } from "../../redux/hooks";

interface Props {
    columnInfo: IProjectColumn;
    updateColumns: (column: IProjectColumn) => void;
}

const ColumnTitle = ({ columnInfo, updateColumns }: Props) => {
    const token = selectToken() as string;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const [columnTitle, setColumnTitle] = useState(columnInfo.columnName);
    const [wantsToRename, setWantsToRename] = useState(false);
    const ref = useRef<HTMLInputElement | null>(null);

    const handleWantsToRename = () => {
        setWantsToRename(true);
        setAnchorEl(null);
        setTimeout(() => {
            ref.current!.focus();
        }, 200);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setWantsToRename(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const editedColumn: IProjectColumn = {
                id: columnInfo.id,
                projectId: columnInfo.projectId,
                columnName: columnTitle,
                orderIndex: columnInfo.orderIndex,
            };

            const updatedColumns = await columnsService.editColumn(
                token,
                editedColumn
            );
            const columnToUpdate = updatedColumns[editedColumn.orderIndex];
            updateColumns(columnToUpdate);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data);
            }
        } finally {
            setWantsToRename(false);
        }
    };

    return (
        <>
            {!wantsToRename ? (
                <Typography variant="h5" marginLeft="3%" fontWeight="bold">
                    {columnInfo.columnName}
                </Typography>
            ) : (
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ marginLeft: "3%", marginTop: "2.5%" }}
                >
                    <TextField
                        fullWidth
                        helperText="Press Enter to Save Changes"
                        autoComplete="off"
                        margin="dense"
                        variant="standard"
                        value={columnTitle}
                        onKeyDown={handleKeyDown}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSubmit}>
                                        <Icons.Edit />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{
                            style: {
                                fontSize: "16.7922px",
                                backgroundColor: "#4F4F4F",
                                borderRadius: "5px",
                                paddingLeft: "9px",
                            },
                        }}
                        onChange={(e) => setColumnTitle(e.target.value)}
                        sx={{
                            padding: 0,
                            margin: 0,
                        }}
                        onBlur={() => setWantsToRename(false)}
                        inputRef={ref}
                    />
                </Box>
            )}

            {!wantsToRename && (
                <IconButton onClick={handleMenuClick}>
                    <Icons.MoreHoriz size="22px" />
                </IconButton>
            )}
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
                        <ListItemButton>
                            <ListItemIcon>
                                <Icons.Add />
                            </ListItemIcon>
                            <ListItemText>Add a New Card</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleWantsToRename}>
                            <ListItemIcon>
                                <Icons.Edit />
                            </ListItemIcon>
                            <ListItemText>Rename Column</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
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
        </>
    );
};

export default ColumnTitle;
