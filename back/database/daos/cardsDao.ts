import { executeQuery } from "../database-service";
import { createCard, getCard, updateCard } from "../queries/cardQueries";
import { ICard } from "../utils/interfaces";

export const createCardDAO = async (card: ICard) => {
    const queryParameters = [
        card.id,
        card.projectId,
        card.title,
        card.subTitle,
        card.description,
        card.status,
        card.creationDate,
        card.dueDate,
        card.attachments,
        card.inColumn,
    ];
    await executeQuery(createCard, queryParameters);
};

export const cardsDaoUpdate = async (id: string, card: ICard) => {
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

export const getCardWithId = async (id: string) => {
    const cards = await executeQuery(getCard, [id]);
    if (cards) {
        return cards.rows[0];
    }
}
