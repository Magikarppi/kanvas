import { FC, useRef, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../Column/Column";
import { useDragDrop } from "../DragNDropProvider";
import { ColumnDropshadow, Container } from "./Board.styled";
import Button from "@mui/material/Button";
import { Box, Collapse, TextField } from "@mui/material";

const Board: FC = () => {
    const {
        handleDragEnd,
        handleDragStart,
        handleDragUpdate,
        handleNewColumn,
        colDropshadowProps,
        columns,
    } = useDragDrop();

    const [newColumnName, setNewColumnName] = useState<string>("");
    const [wantsToAddColumn, setWantsToAddColumn] = useState(false);
    const ref = useRef<HTMLInputElement | null>(null);

    const handleAddColumn = () => {
        handleNewColumn(newColumnName);
        setWantsToAddColumn(false);
        setNewColumnName("");
    };

    const handleWantsToAdd = () => {
        setWantsToAddColumn(true);
        setTimeout(() => {
            ref.current!.focus();
        }, 50);
    };

    return (
        <>
            <DragDropContext
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                onDragUpdate={handleDragUpdate}
            >
                <Droppable
                    droppableId="all-columns"
                    direction="horizontal"
                    type="column"
                >
                    {(provided, snapshot) => (
                        <Container
                            id="task-board"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {columns.map((column, columnIndex) => (
                                <Column
                                    key={column.id}
                                    column={column}
                                    columnIndex={columnIndex}
                                />
                            ))}
                            {provided.placeholder}
                            {snapshot.isDraggingOver && (
                                <ColumnDropshadow
                                    $marginLeft={colDropshadowProps.marginLeft}
                                    height={colDropshadowProps.height}
                                />
                            )}
                            <Box
                                display="flex"
                                flexDirection="column"
                                sx={{
                                    borderRadius: 5,
                                    backgroundColor: "#222222",
                                    padding: "20px 35px 5px 35px",
                                    marginTop: "26.797px" // exact height of column title and its margin
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
                                                () =>
                                                    setWantsToAddColumn(false),
                                                150
                                            )
                                        }
                                    />
                                </Collapse>
                                <Button
                                    disabled={
                                        !wantsToAddColumn
                                            ? false
                                            : newColumnName.trim().length ===
                                                  0 || newColumnName.length > 50
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
        </>
    );
};

export default Board;
