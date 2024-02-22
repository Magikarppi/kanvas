import { ICard, IResponsiblePerson } from "../models/cardModels";
import { createClient } from "../utils/axiosUtils";

const cardsService = {
    addCard: async (token: string, card: Omit<ICard, "creationDate">) => {
        const client = createClient(token);
        const response = await client.post("/cards", card);

        return response.data;
    },
    updateCard: async (
        token: string,
        updateCard: ICard,
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

    addResponsiblePerson: async (token: string, responsiblePerson: IResponsiblePerson) => {
        const client = createClient(token);
        const response = await client.post("/cards/add-responsible-person", responsiblePerson );

        return response.data;
    },

    getResponsiblePerson: async (token: string, cardId: string) => {
        const client = createClient(token);
        const response = await client.get(`/cards/responsible-persons/${cardId}`);

        return response.data;
    },

    deleteResponsiblePerson: async (token: string, responsiblePersonId: string) => {
        const client = createClient(token);
        const response = await client.delete(`/cards/delete-responsible-person/${responsiblePersonId}`);

        return response.data;
    },
};

export default cardsService;
