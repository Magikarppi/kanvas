import styled from "styled-components";
import { ICard } from "../../models/cardModels";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    border: 1px solid black;
    padding: 8px;
    margin-bottom: 10px;
`;

interface Props {
    card: ICard;
    index: number;
}

export default function BoardCard({ card, index }: Props) {
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {card.title}
                </Container>
            )}
        </Draggable>
    );
}
