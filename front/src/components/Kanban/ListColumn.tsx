import { FormEvent, useRef, useState } from "react";
import {
    Box,
    Toolbar,
    Typography,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    InputAdornment,
    TextField,
} from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Icons from "../Icons/Icons";
import { ICard } from "../../models/cardModels";
import { IProjectColumn } from "../../models/projectModels";
import ColumnDotMenu from "./ColumnDotMenu";
import columnsService from "../../services/columnsService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { selectToken } from "../../redux/hooks";
import ListCard from "./ListCard";

interface Props {
    column: IProjectColumn;
    cards: ICard[];
    index: number;
    updateColumns: (column: IProjectColumn) => void;
}

const ListColumn = ({ column, cards, index, updateColumns }: Props) => {
    const token = selectToken() as string;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const [columnTitle, setColumnTitle] = useState(column.columnName);
    const [wantsToRename, setWantsToRename] = useState<boolean>(false);
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
                id: column.id,
                projectId: column.projectId,
                columnName: columnTitle,
                orderIndex: column.orderIndex,
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
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <Box
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    key={column.id}
                    sx={{
                        border: "1.5px solid white",
                        borderRadius: "5px",
                        marginBottom: "30px",
                        width: {
                            xs: "97%",
                            sm: "85%",
                            md: "75%",
                            lg: "60%",
                            xl: "55%",
                        },
                        alignSelf: "center",
                        boxShadow: "3px 3px 1.25px gray",
                        backgroundColor: "#262626",
                    }}
                >
                    <Toolbar sx={{ backgroundColor: "#262626" }}>
                        {!wantsToRename ? (
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                sx={{ flex: "1 1 100%" }}
                            >
                                {column.columnName}
                            </Typography>
                        ) : (
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    flex: "1 1 100%",
                                }}
                            >
                                <TextField
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
                                    onChange={(e) =>
                                        setColumnTitle(e.target.value)
                                    }
                                    sx={{
                                        padding: 0,
                                        margin: 0,
                                        width: "50%",
                                    }}
                                    onBlur={() => setWantsToRename(false)}
                                    inputRef={ref}
                                />
                            </Box>
                        )}
                        <IconButton onClick={handleMenuClick}>
                            <Icons.MoreHoriz size="24px" />
                        </IconButton>
                        <ColumnDotMenu
                            wantsToRename={handleWantsToRename}
                            anchorEl={anchorEl}
                            setAnchorEl={setAnchorEl}
                        />
                    </Toolbar>
                    <Table
                        aria-label="simple table"
                        key={column.id}
                        sx={{
                            marginBottom: "20px",
                            backgroundColor: "#262626",
                        }}
                        size="small"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "10%" }}></TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "16px",
                                        width: "18%",
                                    }}
                                    align="center"
                                >
                                    Card Title
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "16px",
                                        width: "18%",
                                    }}
                                    align="center"
                                >
                                    Sub Title
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "16px",
                                        width: "18%",
                                    }}
                                    align="center"
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "16px",
                                        width: "18%",
                                    }}
                                    align="center"
                                >
                                    Description
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "16px",
                                        width: "18%",
                                    }}
                                    align="center"
                                >
                                    Due Date
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <Droppable droppableId={column.id} type="card">
                            {(provided) => (
                                <TableBody
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {cards.map((card, index) => (
                                        <ListCard
                                            key={card.id}
                                            card={card}
                                            index={index}
                                        />
                                    ))}
                                    {cards.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                align="center"
                                                sx={{
                                                    fontSize: "14px",
                                                }}
                                            >
                                                No cards in this column. Drag
                                                and drop to add one.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {provided.placeholder}
                                </TableBody>
                            )}
                        </Droppable>
                    </Table>
                </Box>
            )}
        </Draggable>
    );
};

export default ListColumn;
