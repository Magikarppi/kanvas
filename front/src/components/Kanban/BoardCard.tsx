import { ICard } from "../../models/cardModels";
import { Draggable } from "react-beautiful-dnd";
import {
    CardContent,
    CardActions,
    Collapse,
    Typography,
    Divider,
    Box,
    Avatar,
    Chip,
    Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandLess } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { getDate, stringAvatar } from "../../utils/utilFunctions";

interface Props {
    card: ICard;
    index: number;
    cardDragDisabled: boolean;
}

const cardStyle = {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    marginBottom: "10px",
    border: "2px solid",
    height: "auto",
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

const dummyUser = {
    firstName: "Keijo",
    lastName: "Pekkonen",
    picture: "dsadsdsa",
};

const fullName = `${dummyUser.firstName} ${dummyUser.lastName}`;

export default function BoardCard({ card, index, cardDragDisabled }: Props) {
    const [expanded, setExpanded] = React.useState(false);

    const dueDateString: string = card.dueDate?.toString() ?? "";

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Draggable
            draggableId={card.id}
            index={index}
            isDragDisabled={expanded || cardDragDisabled}
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
                            sx={{
                                textAlign: "center",
                                padding: "7px",
                                userSelect: "none",
                            }}
                        >
                            <Typography>{card.title}</Typography>
                            {card.dueDate ? (
                                <Typography style={{ fontSize: "11px" }}>
                                    Due {getDate(dueDateString)}
                                </Typography>
                            ) : null}
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{ marginTop: "9px" }}
                            >
                                <Chip
                                    label="primary"
                                    size="small"
                                    color="primary"
                                />
                                <Chip
                                    label="success"
                                    size="small"
                                    color="success"
                                />
                                <Chip
                                    label="success"
                                    size="small"
                                    color="success"
                                />
                            </Stack>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Avatar
                                {...stringAvatar(fullName)}
                                alt={`${dummyUser.firstName} ${dummyUser.lastName}`}
                                src={dummyUser.picture as string}
                                sx={{ width: 26, height: 26 }}
                            >
                                {`${dummyUser.firstName[0]}${dummyUser.lastName[0]}`}
                            </Avatar>
                            {card.attachments?.split(" ").length && (
                                <>
                                    <IconButton aria-label="add to favorites">
                                        <AttachFileIcon />
                                    </IconButton>
                                    <p>{card.attachments.split(" ").length}</p>
                                </>
                            )}
                            <IconButton aria-label="share">
                                <ChatBubbleOutlineIcon />
                            </IconButton>
                            <p>2</p>
                            {!expanded ? (
                                <ExpandMoreIcon
                                    sx={{ marginLeft: "auto" }}
                                    onClick={handleExpandClick}
                                />
                            ) : (
                                <ExpandLess
                                    sx={{ marginLeft: "auto" }}
                                    onClick={handleExpandClick}
                                />
                            )}
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Divider sx={{ marginBottom: "5px" }} />
                            <Box
                                sx={{
                                    padding: "14px",
                                    overflowY: "auto",
                                    maxHeight: "230px",
                                }}
                            >
                                <Typography>{card.description}</Typography>
                            </Box>
                        </Collapse>
                    </div>
                </>
            )}
        </Draggable>
    );
}
