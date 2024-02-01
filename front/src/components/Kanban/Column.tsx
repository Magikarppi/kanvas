import styled from "styled-components";
import { IProjectColumn } from "../../models/projectModels";
import { ICard } from "../../models/cardModels";
import { Draggable, Droppable } from "react-beautiful-dnd";
import BoardCard from "./BoardCard";
import ColumnTitle from "./ColumnTitle";
import { Box } from "@mui/material";

const Container = styled.div`
    margin: 10px;
    width: 270px;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    background-color: rgba(217, 217, 217, 0.1);
`;
const CardList = styled.div`
    padding: 10px;
    flex-grow: 1;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

interface Props {
    column: IProjectColumn;
    cards: ICard[];
    index: number;
    updateColumns: (column: IProjectColumn) => void;
}

export default function Column({ column, cards, index, updateColumns }: Props) {
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            border: "none",
                            backgroundColor: "transparent",
                            marginBottom: "10px",
                        }}
                    >
                        <ColumnTitle
                            columnInfo={column}
                            updateColumns={updateColumns}
                        />
                    </Box>
                    <Droppable droppableId={column.id} type="card">
                        {(provided) => (
                            <CardList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {cards
                                    .sort((a, b) => a.orderIndex - b.orderIndex)
                                    .map((card, index) => (
                                        <BoardCard
                                            key={card.id}
                                            card={card}
                                            index={index}
                                        />
                                    ))}
                                {provided.placeholder}
                            </CardList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    );
}
