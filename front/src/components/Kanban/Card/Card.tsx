import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import Container from "./Card.style";
import { TTask } from "../../../models/kanbanModels";

type Props = {
    task: TTask;
    index: number;
};

const Row: React.FC<Props> = ({ task, index }) => (
    <Draggable draggableId={task.id} index={index}>
        {(provided: DraggableProvided, snapshot) => (
            <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                $isDragging={snapshot.isDragging}
            >
                {task.title}
            </Container>
        )}
    </Draggable>
);

export default Row;
