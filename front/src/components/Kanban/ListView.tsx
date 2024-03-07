import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { ICard } from "../../models/cardModels";
import { IProjectColumn, ProjectMember } from "../../models/projectModels";
import { Box, Button, Collapse, TextField } from "@mui/material";
import ListColumn from "./ListColumn";
import { useRef, useState } from "react";
import { AxiosError } from "axios";
import columnsService from "../../services/columnsService";
import { toast } from "react-toastify";

interface Props {
    columns: IProjectColumn[];
    cards: ICard[];
    addNewColumn: (newColumn: IProjectColumn) => void;
    deleteColumn: (columnId: string, orderIndex: number) => void;
    updateCards: (card: ICard) => void;
    updateColumns: (column: IProjectColumn) => void;
    projectId: string;
    token: string;
    members: ProjectMember[];
    setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
}

const ListView = ({
    columns,
    cards,
    addNewColumn,
    updateCards,
    updateColumns,
    projectId,
    token,
    members,
    deleteColumn,
    setCards,
}: Props) => {
    const [newColumnName, setNewColumnName] = useState<string>("");
    const [wantsToAddColumn, setWantsToAddColumn] = useState(false);
    const ref = useRef<HTMLInputElement | null>(null);

    const handleAddColumn = async () => {
        const newColumn: Omit<IProjectColumn, "id"> = {
            columnName: newColumnName,
            projectId: projectId,
            orderIndex: columns.length,
        };

        try {
            const addedColumn: IProjectColumn = await columnsService.addColumn(
                token,
                newColumn
            );
            addNewColumn(addedColumn);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data);
            }
        } finally {
            setWantsToAddColumn(false);
            setNewColumnName("");
        }
    };

    const handleWantsToAdd = () => {
        setWantsToAddColumn(true);
        setTimeout(() => {
            ref.current!.focus();
        }, 50);
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === "column") {
            const column = columns.find((col) => col.id === draggableId);

            if (!column) {
                return;
            }

            const updatedColumn: IProjectColumn = {
                ...column,
                orderIndex: destination.index,
            };

            updateColumns(updatedColumn);
        } else if (type === "card") {
            const card = cards.find((card) => card.id === draggableId);

            if (!card) {
                return;
            }

            const updatedCard: ICard = {
                ...card,
                orderIndex: destination.index,
                inColumn: destination.droppableId,
            };

            updateCards(updatedCard);
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Collapse in={wantsToAddColumn} timeout="auto">
                    <TextField
                        size="small"
                        autoComplete="off"
                        placeholder="Column name *"
                        value={newColumnName}
                        onChange={(e) => setNewColumnName(e.target.value)}
                        inputRef={ref}
                        onBlur={() =>
                            setTimeout(() => setWantsToAddColumn(false), 150)
                        }
                        sx={{
                            width: "300px",
                            alignSelf: "center",
                        }}
                    />
                </Collapse>
                <Button
                    disabled={
                        !wantsToAddColumn
                            ? false
                            : newColumnName.trim().length === 0 ||
                              newColumnName.length > 50
                    }
                    variant="contained"
                    color="secondary"
                    sx={{
                        width: "150px",
                        alignSelf: "center",
                        marginBottom: "30px",
                    }}
                    onClick={
                        wantsToAddColumn ? handleAddColumn : handleWantsToAdd
                    }
                >
                    {wantsToAddColumn ? "Add Column" : "Add a New Column"}
                </Button>
            </Box>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-columns" type="column">
                    {(provided) => (
                        <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            {columns
                                .sort(
                                    (col1, col2) =>
                                        col1.orderIndex - col2.orderIndex
                                )
                                .map((column, index) => (
                                    <ListColumn
                                        key={column.id}
                                        column={column}
                                        cards={cards.filter(
                                            (card) =>
                                                card.inColumn === column.id
                                        )}
                                        index={index}
                                        updateColumns={updateColumns}
                                        members={members}
                                        setCards={setCards}
                                        allCards={cards}
                                        deleteColumn={deleteColumn}
                                    />
                                ))}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default ListView;
