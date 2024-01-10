import { executeQuery } from "../database-service";
import {
    insertCard,
    updateCard,
    deleteCard,
    getCard,
    getProjectCards,
} from "../queries/cardQueries";
import { ICard } from "../utils/interfaces";

export const insertCardDAO = async (card: ICard) => {
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
    await executeQuery(insertCard, queryParameters);
};

export const updateCardDAO = async (id: string, card: ICard) => {
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

export const deleteCardDAO = async (cardId: string) => {
    const queryParameters = [cardId];
    await executeQuery(deleteCard, queryParameters);
};

export const getCardDAO = async (id: string) => {
    const cards = await executeQuery(getCard, [id]);
    if (cards) {
        return cards.rows[0];
    }
};

export const getProjectCardsDAO = async (id: string) => {
    const cards = await executeQuery(getProjectCards, [id]);
    if (cards) {
        return cards.rows;
    }
};
