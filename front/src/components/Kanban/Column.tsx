import styled from "styled-components";
import { IProjectColumn } from "../../models/projectModels";
import { ICard } from "../../models/cardModels";
import { Draggable, Droppable } from "react-beautiful-dnd";
import BoardCard from "./BoardCard";

const Container = styled.div`
    margin: 10px;
    border: 1px solid lightgray;
    width: 250px;

    display: flex;
    flex-direction: column;
    background-color: black;
`;
const Name = styled.h3``;
const CardList = styled.div`
    padding: 10px;
    flex-grow: 1;
    min-height: 200px;
`;

interface Props {
    column: IProjectColumn;
    cards: ICard[];
    index: number;
}

export default function Column({ column, cards, index }: Props) {
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Name>{column.columnName}</Name>
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
