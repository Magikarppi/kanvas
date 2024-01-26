import { MoreHoriz } from "@mui/icons-material";
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
import React, { FormEvent, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TColumn } from "../../../models/kanbanModels";
import { useDragDrop } from "../DragNDropProvider";
import { IProjectColumn } from "../../../models/projectModels";
import columnsService from "../../../services/columnsService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const ColumnTitle = ({
    columnInfo,
    orderIndex,
}: {
    columnInfo: TColumn;
    orderIndex: number;
}) => {
    const { setColumns, token, projectId } = useDragDrop();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const [columnTitle, setColumnTitle] = useState(columnInfo.title);
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

        // ToDo: some unnecessaary code here but needed for rendering local changes
        // Change after we have figured out the data formats in ProjectPage
        try {
            const editedColumn: IProjectColumn = {
                id: columnInfo.id,
                projectId: projectId,
                columnName: columnTitle,
                orderIndex: orderIndex,
            };

            const formattedColumns = await columnsService.editColumn(
                token,
                editedColumn
            );

            
            // ToDo: setColumns to ... formattedColumns that we get above
            const returnedColumn =
                formattedColumns[formattedColumns.length - 1];
            setColumns((prevColumns) => {
                const newLocalColumn = {
                    id: returnedColumn.id,
                    projectId: returnedColumn.projectId,
                    title: returnedColumn.columnName,
                    orderIndex: returnedColumn.orderIndex,
                    tasks: [],
                };

                const newColumns = [...prevColumns];

                newColumns[returnedColumn.orderIndex] = newLocalColumn;
                return newColumns;
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data);
            }
        }
        setWantsToRename(false);
    };

    return (
        <>
            {!wantsToRename ? (
                <Typography variant="h5">
                    {columnInfo.title || "Unnamed"}
                </Typography>
            ) : (
                <Box component="form" onSubmit={handleSubmit}>
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
                                        <EditIcon />
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
                    <MoreHoriz />
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
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText>Add a New Card</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleWantsToRename}>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText>Rename Column</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DeleteForeverIcon />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{ color: "#FF3A3A" }}
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
