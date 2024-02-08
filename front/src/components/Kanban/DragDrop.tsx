import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { IProjectColumn } from "../../models/projectModels";
import { ICard } from "../../models/cardModels";
import GridColumn from "./GridColumn";
import styled from "styled-components";
import { useRef, useState } from "react";
import { Box, Button, Collapse, TextField } from "@mui/material";
import columnsService from "../../services/columnsService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface Props {
    columns: IProjectColumn[];
    cards: ICard[];
    addNewColumn: (newColumn:IProjectColumn) => void;
    updateCards: (card: ICard) => void;
    updateColumns: (column: IProjectColumn) => void;
    projectId: string;
    token: string;
}

const Container = styled.div`
    display: flex;
`;

export default function DragDrop({
    columns,
    cards,
    addNewColumn,
    updateCards,
    updateColumns,
    projectId,
    token,
}: Props) {
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
            const addedColumn: IProjectColumn = await columnsService.addColumn(token, newColumn);
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
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column"
            >
                {(provided) => (
                    <Container
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {columns
                            .sort((a, b) => a.orderIndex - b.orderIndex)
                            .map((col, index) => (
                                <GridColumn
                                    key={col.id}
                                    column={col}
                                    cards={cards.filter(
                                        (card) => card.inColumn === col.id
                                    )}
                                    index={index}
                                    updateColumns={updateColumns}
                                />
                            ))}
                        {provided.placeholder}
                        <Box
                            display="flex"
                            flexDirection="column"
                            sx={{
                                borderRadius: 5,
                                backgroundColor: "#222222",
                                padding: "20px 35px 5px 35px",
                                height: wantsToAddColumn ? "150px" : "80px",
                                transition: "height 0.2s margin-left 0s",
                                marginLeft: columns.length === 0 ? "1.5%" : 0
                            }}
                        >
                            <Collapse in={wantsToAddColumn} timeout="auto">
                                <TextField
                                    size="small"
                                    autoComplete="off"
                                    placeholder="Column name *"
                                    value={newColumnName}
                                    onChange={(e) =>
                                        setNewColumnName(e.target.value)
                                    }
                                    inputRef={ref}
                                    onBlur={() =>
                                        setTimeout(
                                            () => setWantsToAddColumn(false),
                                            150
                                        )
                                    }
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
                                    mt: wantsToAddColumn ? 3 : 0,
                                    padding: "5",
                                }}
                                onClick={
                                    wantsToAddColumn
                                        ? handleAddColumn
                                        : handleWantsToAdd
                                }
                            >
                                {wantsToAddColumn
                                    ? "Add Column"
                                    : "Add a New Column"}
                            </Button>
                        </Box>
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    );
}
