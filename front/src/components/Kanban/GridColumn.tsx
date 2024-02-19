import styled from "styled-components";
import { IProjectColumn } from "../../models/projectModels";
import { ICard } from "../../models/cardModels";
import { Draggable, Droppable } from "react-beautiful-dnd";
import BoardCard from "./BoardCard";
import ColumnTitle from "./ColumnTitle";

const Container = styled.div`
    margin: 0px 10px 0px 10px;
    width: 270px;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, #535353 0%, #434343 28%, #272727 100%);
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
    columnDragDisabled: boolean;
    cardDragDisabled: boolean;
}

export default function GridColumn({
    column,
    cards,
    index,
    updateColumns,
    columnDragDisabled,
    cardDragDisabled,
}: Props) {
    return (
        <Draggable
            draggableId={column.id}
            index={index}
            isDragDisabled={columnDragDisabled}
        >
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                        maxHeight:
                            cards.length === 0
                                ? "224px"
                                : `${cards.length * 154 + 70}px`,
                        background: snapshot.isDragging
                            ? "linear-gradient(180deg, #7c4fc8 0%, #5E00FF 100%)"
                            : "linear-gradient(180deg, #535353 0%, #434343 28%, #272727 100%)",
                        ...provided.draggableProps.style,
                    }}
                >
                    <ColumnTitle
                        columnInfo={column}
                        updateColumns={updateColumns}
                    />

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
                                            cardDragDisabled={cardDragDisabled}
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
