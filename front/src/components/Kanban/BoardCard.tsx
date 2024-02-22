import { ICard, ICardResponsiblePerson } from "../../models/cardModels";
import { Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import {
    CardContent,
    CardActions,
    Typography,
    Avatar,
    Chip,
    Stack,
    AvatarGroup,
    Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
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
    setCards:React.Dispatch<React.SetStateAction<ICard[]>>;
}

const cardStyle = {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    marginBottom: "10px",
    border: "2px solid",
    height: "117.5px",
    width: "220px",
    background: "black",
    paddinLeft: "0px",
    cursor: "pointer",
};

const getItemStyle = (isDragging: boolean, draggableStyle?: object) => ({
    background: isDragging
        ? "linear-gradient(180deg, #7c4fc8 0%, #5E00FF 100%)"
        : cardStyle.background,
    ...draggableStyle,
});

export default function BoardCard({ card, index, projectMembers, updateCards, cardDragDisabled, allCards, setCards}: Props) {
    const [cardModal, setCardModal] = useState<boolean>(false);
    const [responsiblePersons, setResponsiblePersons] = useState<ICardResponsiblePerson[]>([]);
    const [oneCard, setOneCard] = useState(card);
    const token = selectToken();
    
    useEffect(() => {
        cardsService
            .getResponsiblePerson(token!, card.id)
            .then((data => {
                setResponsiblePersons(data);
            })
            )
            .catch((err) => console.error(err));
            
    }, [oneCard]);

    const openCardModal = () => setCardModal(true);
    const closeCardModal = () => setCardModal(false);


    let cardDueDate: Date | null = null;
    if (oneCard.dueDate) {
        cardDueDate = new Date(oneCard.dueDate);
    }

    const showOnlyRealData = false;

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
                        <CardContent onClick={openCardModal} sx={{textAlign: "center", padding:"7px"}}>
                            <Typography>{oneCard.title}</Typography>
                            {oneCard.dueDate ? (
                                <Typography style={{ fontSize: 10 }}>{cardDueDate?.toLocaleDateString("fi-FI")}</Typography>
                            ) : (null)}
                            {showOnlyRealData ? (
                                <Stack direction="row" spacing={1}  sx={{ marginTop: "9px" }}>
                                    <Chip label="primary" size="small" color="primary" />
                                    <Chip label="success" size="small" color="success" />
                                    <Chip label="success" size="small" color="success" />
                                </Stack>) : (null)}
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
                                    marginTop: "10px",
                                }}
                                max={2}
                            >
                                {responsiblePersons.map((member) => {
                                    const fullName = `${member.firstName} ${member.lastName}`;
                                    return (
                                        <Tooltip
                                            key={member.userId}
                                            title={
                                                <Typography sx={{ fontSize: 13 }}>
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
                                                {`${member.firstName[0]}${member.lastName[0]}`}
                                            </Avatar>
                                        </Tooltip>
                                    );
                                })}
                            </AvatarGroup>
                            {showOnlyRealData ? (
                                <>
                                    <IconButton aria-label="add to favorites">
                                        <AttachFileIcon />
                                    </IconButton>
                                    <p>2</p>
                                    <IconButton aria-label="share">
                                        <ChatBubbleOutlineIcon />
                                    </IconButton>
                                    <p>2</p> </>) : (null)}
                        </CardActions>
                    </div>
                    <BoardCardModal 
                        open={cardModal} 
                        close={closeCardModal}
                        card={oneCard}
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
