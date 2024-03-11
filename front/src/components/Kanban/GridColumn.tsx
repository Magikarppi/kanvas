import styled from "styled-components";
import { IProjectColumn } from "../../models/projectModels";
import {
    ICard,
    IOnSaveAddCardModalObject,
    IResponsiblePerson,
} from "../../models/cardModels";
import { Draggable, Droppable } from "react-beautiful-dnd";
import BoardCard from "./BoardCard";
import ColumnTitle from "./ColumnTitle";
import { ProjectMember } from "../../models/projectModels";
import { AddCardModal } from "../cards/addCardModal";
import { useState } from "react";
import cardsService from "../../services/cardsService";
import { selectToken } from "../../redux/hooks";
import { v4 as uuid } from "uuid";

const Container = styled.div`
    margin: 0px 10px 0px 10px;
    width: 270px;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
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
    projectMembers: ProjectMember[];
    updateCards: (card: ICard) => void;
    allCards: ICard[];
    setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
    deleteColumn: (columnId: string, orderIndex: number) => void;
}

export default function GridColumn({
    column,
    cards,
    index,
    updateColumns,
    columnDragDisabled,
    cardDragDisabled,
    projectMembers,
    updateCards,
    allCards,
    setCards,
    deleteColumn,
}: Props) {
    const [isAddCardModalOpen, setIsAddCardModalOpen] =
        useState<boolean>(false);
    const token = selectToken() as string;

    const addCard = async (object: IOnSaveAddCardModalObject) => {
        const { title, desc, files, status, dueDate, responsiblePersonId } =
            object;
        const subtitle = "Subtitle"; // Mistä?
        const inColumn = column.id;
        const orderIndex = cards.length;
        const projectMember = projectMembers?.find(
            (value: ProjectMember) => value.id === responsiblePersonId
        );
        const savingCard: Omit<ICard, "creationDate" | "id"> = {
            title: title,
            description: desc,
            attachments: files ? files[0] : null,
            status: status,
            dueDate: dueDate,
            projectId: column.projectId,
            subTitle: subtitle,
            inColumn: inColumn.toString(),
            orderIndex: orderIndex,
        };
        const card = await cardsService.addCard(token, savingCard);
        if (projectMember) {
            const responsiblePerson: IResponsiblePerson = {
                id: uuid(),
                cardId: card.id,
                userId: projectMember?.id,
            };
            await cardsService.addResponsiblePerson(token, responsiblePerson);
        }
        const newArray: ICard[] = allCards.concat([card]);
        setCards(newArray);
        onCloseAddCardModal();
    };

    const onCloseAddCardModal = () => {
        setIsAddCardModalOpen(false);
    };

    const wantsToAddCard = () => {
        setIsAddCardModalOpen(true);
    };

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
                                ? "214.5px"
                                : `${cards.length * 144.5 + 70}px`,
                        background: snapshot.isDragging
                            ? "linear-gradient(180deg, #7c4fc8 0%, #5E00FF 100%)"
                            : "linear-gradient(180deg, #535353 0%, #434343 28%, #272727 100%)",
                        ...provided.draggableProps.style,
                    }}
                >
                    <ColumnTitle
                        columnInfo={column}
                        updateColumns={updateColumns}
                        onSaveAddCardModal={addCard}
                        wantsToAddCard={wantsToAddCard}
                        deleteColumn={deleteColumn}
                    />

                    <Droppable droppableId={column.id} type="card">
                        {(provided) => (
                            <CardList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {cards
                                    .sort((a, b) => a.orderIndex - b.orderIndex)
                                    .map((card, index) => {
                                        return (
                                            card && (
                                                <BoardCard
                                                    key={card.id}
                                                    card={card}
                                                    index={index}
                                                    projectMembers={
                                                        projectMembers
                                                    }
                                                    updateCards={updateCards}
                                                    cardDragDisabled={
                                                        cardDragDisabled
                                                    }
                                                    allCards={allCards}
                                                    setCards={setCards}
                                                />
                                            )
                                        );
                                    })}
                                {provided.placeholder}
                            </CardList>
                        )}
                    </Droppable>
                    <AddCardModal
                        onCloseAddCardModal={onCloseAddCardModal}
                        isAddCardModalOpen={isAddCardModalOpen}
                        onSaveAddCardModal={addCard}
                        members={projectMembers}
                    />
                </Container>
            )}
        </Draggable>
    );
}
