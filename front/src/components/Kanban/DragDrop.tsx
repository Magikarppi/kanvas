import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { IProjectColumn } from "../../models/projectModels";
import { ICard } from "../../models/cardModels";
import Column from "./Column";
import styled from "styled-components";

interface Props {
    columns: IProjectColumn[];
    cards: ICard[];
    updateCards: (card: ICard) => void;
    updateColumns: (column: IProjectColumn) => void;
}

const Container = styled.div`
    display: flex;
`;

export default function DragDrop({
    columns,
    cards,
    updateCards,
    updateColumns,
}: Props) {
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
                                <Column
                                    key={col.id}
                                    column={col}
                                    cards={cards.filter(
                                        (card) => card.inColumn === col.id
                                    )}
                                    index={index}
                                />
                            ))}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    );
}
