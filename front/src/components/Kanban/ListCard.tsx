import { TableRow, TableCell } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import Icons from "../Icons/Icons";
import { ICard } from "../../models/cardModels";
import { getDate } from "../../utils/utilFunctions";

type Props = {
    card: ICard;
    index: number;
};

const ListCard = ({ card, index }: Props) => {
    return (
        <Draggable key={card.id} draggableId={card.id} index={index}>
            {(provided) => (
                <TableRow
                    key={card.id}
                    sx={{
                        borderTop: "1.75px solid white",
                        borderBottom: "1.75px solid white",
                        "&:last-child td, &:last-child th": {
                            border: 0,
                        },
                    }}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <TableCell {...provided.dragHandleProps}>
                        <Icons.Reorder size="20px" />
                    </TableCell>
                    <TableCell
                        sx={{
                            fontSize: "14px",
                        }}
                        align="center"
                    >
                        {card.title}
                    </TableCell>
                    <TableCell
                        align="center"
                        sx={{
                            fontSize: "14px",
                        }}
                    >
                        {card.subTitle}
                    </TableCell>
                    <TableCell
                        align="center"
                        sx={{
                            fontSize: "14px",
                        }}
                    >
                        {card.status}
                    </TableCell>
                    <TableCell
                        align="center"
                        sx={{
                            fontSize: "14px",
                        }}
                    >
                        {card.description}
                    </TableCell>
                    <TableCell
                        align="center"
                        sx={{
                            fontSize: "14px",
                        }}
                    >
                        {getDate(card.dueDate as unknown as string)}
                    </TableCell>
                </TableRow>
            )}
        </Draggable>
    );
};

export default ListCard;
