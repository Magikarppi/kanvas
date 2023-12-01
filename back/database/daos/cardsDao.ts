import { executeQuery } from "../database-service";
import { updateCard } from "../queries/cardQueries";
import { ICard } from "../utils/interfaces";



export const cardsDaoUpdate = async(id: string, card: ICard) => {
    const array = [
        card.projectId,
        card.title, 
        card.subTitle, 
        card.description,
        card.status,
        card.dueDate,
        card.attachments,
        card.inColumn,
        id, 

    ];
    await executeQuery(updateCard, array);
};