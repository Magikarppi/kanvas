import { executeQuery } from "../database-service";
import { updateCard } from "../queries/cardQueries";
import { ICard } from "../utils/interfaces";



export const cardsDaoUpdate = async(id: string, card: ICard) => {
    const array = [
        card.project_id,
        card.title, 
        card.sub_title, 
        card.description,
        card.status,
        card.creation_date,
        card.due_date,
        card.attachments,
        card.in_column,
        id, 

    ];
    await executeQuery(updateCard, [array]);
};