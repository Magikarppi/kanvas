import React, { FormEvent, useRef, useState } from "react";
import {
    Box,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import Icons from "../Icons/Icons";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IProjectColumn } from "../../models/projectModels";
import columnsService from "../../services/columnsService";
import { selectToken } from "../../redux/hooks";
import ColumnDotMenu from "./ColumnDotMenu";

import { IOnSaveAddCardModalObject } from "../../models/cardModels";
import DeleteConfirmation from "../Confirmations/DeleteColumnConfirmation";

interface Props {
    columnInfo: IProjectColumn;
    updateColumns: (column: IProjectColumn) => void;
    onSaveAddCardModal?: (object: IOnSaveAddCardModalObject) => void;
    wantsToAddCard?: () => void;
    deleteColumn: (columnId: string, orderIndex: number) => void;
}

const ColumnTitle = ({
    columnInfo,
    deleteColumn,
    updateColumns,
    wantsToAddCard,
}: Props) => {
    const token = selectToken() as string;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
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

    const handleWantsToAdd = () => {
        setAnchorEl(null);
        wantsToAddCard ? wantsToAddCard() : null;
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
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "270px",
                border: "none",
                backgroundColor: "transparent",
                marginBottom: "10px",
                userSelect: "none",
            }}
        >
            {!wantsToRename ? (
                <Typography
                    variant="h5"
                    marginLeft="3%"
                    fontWeight="bold"
                    overflow="hidden"
                    textOverflow="ellipsis"
                >
                    {columnInfo.columnName}
                </Typography>
            ) : (
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ marginLeft: "3%", marginTop: "2.5%" }}
                >
                    <TextField
                        data-cy="rename-column-input"
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
                                    <IconButton
                                        onClick={handleSubmit}
                                        data-cy="rename-column-input-submit-button"
                                    >
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
                <IconButton
                    onClick={handleMenuClick}
                    data-cy="column-menu-button"
                >
                    <Icons.MoreHoriz size="22px" />
                </IconButton>
            )}
            <DeleteConfirmation
                name={columnInfo.columnName}
                onDelete={() =>
                    deleteColumn(columnInfo.id, columnInfo.orderIndex)
                }
                open={deleteConfirmationOpen}
                close={() => setDeleteConfirmationOpen(false)}
            />
            <ColumnDotMenu
                wantsToRename={handleWantsToRename}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                wantsToAddCard={handleWantsToAdd}
                wantsToDeleteColumn={() => setDeleteConfirmationOpen(true)}
            />
        </Box>
    );
};

export default ColumnTitle;
