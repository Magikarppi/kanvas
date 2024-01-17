import { ICard } from "../models/cardModels";
import { createClient } from "../utils/axiosUtils";

const cardsService = {
    addCard: async (token: string, card: Omit<ICard, "creationDate">) => {
        const client = createClient(token);
        const response = await client.post("/cards", card);

        return response.data;
    },
    updateCard: async (
        token: string,
        updateCard: Omit<ICard, "creationDate">
    ) => {
        const client = createClient(token);
        const response = await client.put(
            `/cards/${updateCard.id}`,
            updateCard
        );

        return response.data;
    },
    getCard: async (token: string, cardId: string) => {
        const client = createClient(token);
        const response = await client.get(`/cards/${cardId}`);

        return response.data;
    },
    deleteCard: async (token: string, cardId: string) => {
        const client = createClient(token);
        const response = await client.delete(`/cards/${cardId}`);

        return response.data;
    },
};

export default cardsService;
