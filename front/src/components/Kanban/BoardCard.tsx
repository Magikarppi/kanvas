import { ICard, ICardResponsiblePerson } from "../../models/cardModels";
import { Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import {
    CardContent,
    CardActions,
    Typography,
    Avatar,
    Chip,
    AvatarGroup,
    Tooltip,
} from "@mui/material";
import BoardCardModal from "./BoardCardModal";
import { ProjectMember } from "../../models/projectModels";
import { selectToken } from "../../redux/hooks";
import cardsService from "../../services/cardsService";
import { stringAvatar } from "../../utils/utilFunctions";

interface Props {
    card: ICard;
    index: number;
    projectMembers: ProjectMember[];
    updateCards: (card: ICard) => void;
    cardDragDisabled: boolean;
    allCards: ICard[];
    setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
}

const cardStyle = {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    marginBottom: "10px",
    border: "2px solid",
    minHeight: "133px",
    width: "220px",
    background: "black",
    paddingLeft: "0px",
    cursor: "pointer",
};

const getItemStyle = (isDragging: boolean, draggableStyle?: object) => ({
    background: isDragging
        ? "linear-gradient(180deg, #7c4fc8 0%, #5E00FF 100%)"
        : cardStyle.background,
    ...draggableStyle,
});

export default function BoardCard({
    card,
    index,
    projectMembers,
    updateCards,
    cardDragDisabled,
    allCards,
    setCards,
}: Props) {
    const [cardModal, setCardModal] = useState<boolean>(false);
    const [responsiblePersons, setResponsiblePersons] = useState<
        ICardResponsiblePerson[]
    >([]);
    const [oneCard, setOneCard] = useState(card);
    const token = selectToken();

    useEffect(() => {
        setOneCard({ ...card });
        cardsService
            .getResponsiblePerson(token!, card.id)
            .then((data) => {
                setResponsiblePersons(data);
            })
            .catch((err) => console.error(err));
    }, [card]);

    useEffect(() => {
        const updatedResponsibles = responsiblePersons.filter((rp) =>
            projectMembers.some((pm) => pm.id === rp.userId)
        );

        const responsiblePersonsToDelete = responsiblePersons.filter(
            (rp) => !projectMembers.some((pm) => pm.id === rp.userId)
        );

        setResponsiblePersons(updatedResponsibles);

        responsiblePersonsToDelete.forEach((person) => {
            cardsService
                .deleteResponsiblePerson(token!, person.cardResponsibleId)
                .catch((err) => console.error(err));
        });
    }, [projectMembers]);

    const openCardModal = () => setCardModal(true);
    const closeCardModal = () => setCardModal(false);

    let cardDueDate: Date | null = null;
    if (card.dueDate) {
        cardDueDate = new Date(card.dueDate);
    }

    return (
        <Draggable
            draggableId={card.id}
            index={index}
            isDragDisabled={cardDragDisabled}
        >
            {(provided, snapshot) => (
                <>
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            ...cardStyle,
                            ...getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            ),
                        }}
                    >
                        <CardContent
                            onClick={openCardModal}
                            sx={{ textAlign: "center", padding: "7px" }}
                        >
                            <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow:"ellipsis", width:"205px" }}>{card.title}</Typography>
                            {card.dueDate ? (
                                <Typography style={{ fontSize: 11, fontWeight:"bold"}}>
                                    {cardDueDate?.toLocaleDateString("fi-FI")}
                                </Typography>
                            ) : null}
                            {card.status === "In Progress" ? (
                                <Chip
                                    label="In Progress"
                                    size="small"
                                    color="warning"
                                    sx={{width: "6rem", marginTop: "2px"}}
                                />) : (null)}
                            {card.status === "To do" ? (
                                <Chip
                                    label="To do"
                                    size="small"
                                    color="primary"
                                    sx={{width: "6rem", marginTop: "2px"}}
                                />) : (null)}
                            {card.status === "Done" ? (
                                <Chip
                                    label="Done"
                                    size="small"
                                    color="success"
                                    sx={{width: "6rem", marginTop: "2px"}}
                                />) : (null)}
                        </CardContent>
                        <CardActions
                            disableSpacing
                            sx={{
                                cursor: "grab",
                            }}
                        >
                            <AvatarGroup
                                sx={{
                                    "& .MuiAvatar-root": {
                                        width: 35,
                                        height: 35,
                                    },
                                    marginTop: card.status === "" || card.status === null ? "26px" : "0px"
                                }}
                                max={2}
                            >
                                {responsiblePersons.map((member) => {
                                    const fullName = `${member.firstName} ${member.lastName}`;
                                    return (
                                        <Tooltip
                                            key={member.userId}
                                            title={
                                                <Typography
                                                    sx={{ fontSize: 13 }}
                                                >
                                                    {fullName}
                                                </Typography>
                                            }
                                            arrow
                                        >
                                            <Avatar
                                                {...stringAvatar(fullName)}
                                                alt={fullName}
                                                src={member.picture as string}
                                            >
                                                {`${member.firstName[0].toUpperCase()}${member.lastName[0].toUpperCase()}`}
                                            </Avatar>
                                        </Tooltip>
                                    );
                                })}
                            </AvatarGroup>
                        </CardActions>
                    </div>
                    <BoardCardModal
                        open={cardModal}
                        close={closeCardModal}
                        card={card}
                        setCard={setOneCard}
                        projectMembers={projectMembers}
                        cardResponsiblePersons={responsiblePersons}
                        setCardResponsiblePersons={setResponsiblePersons}
                        updateCards={updateCards}
                        allCards={allCards}
                        setCards={setCards}
                    />
                </>
            )}
        </Draggable>
    );
}
