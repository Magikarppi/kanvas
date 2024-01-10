import axios from "axios";
import { ICard } from "../models/cardModels";

const createClient = (token: string) => {
    return axios.create({
        baseURL: "http://localhost:5000/cards",
        headers: { Authorization: `Bearer ${token}` },
    });
};

const cardsService = {
    addCard: async (token: string, card: Omit<ICard, "creationDate">) => {
        const client = createClient(token);
        const response = await client.post("/", card);

        return response.data;
    },
    updateCard: async (
        token: string,
        updateCard: Omit<ICard, "creationDate">
    ) => {
        const client = createClient(token);
        const response = await client.put(`/${updateCard.id}`, updateCard);

        return response.data;
    },
    getCard: async (token: string, cardId: string) => {
        const client = createClient(token);
        const response = await client.get(`/${cardId}`);

        return response.data;
    },
    deleteCard: async (token: string, cardId: string) => {
        const client = createClient(token);
        const response = await client.delete(`/${cardId}`);

        return response.data;
    },
};

export default cardsService;
