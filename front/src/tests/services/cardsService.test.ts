import cardsService from "../../services/cardsService";
import { ICard } from "../../models/cardModels";
import { createMockAxiosInstance } from "../testUtils";

jest.mock("axios");

describe("Cards service", () => {
    const token = "mock-token";

    const newCard: ICard = {
        id: "card-uuid",
        attachments: null,
        creationDate: new Date(),
        description: null,
        dueDate: null,
        inColumn: "some-column-id",
        projectId: "some-projects-id",
        status: null,
        subTitle: "sub titteli",
        title: "titteli",
        orderIndex: 0,
    };

    const mockResponse: ICard = {
        id: "card-uuid",
        attachments: null,
        creationDate: new Date(),
        description: null,
        dueDate: null,
        inColumn: "some-column-id",
        projectId: "some-projects-id",
        status: null,
        subTitle: "sub titteli",
        title: "titteli",
        orderIndex: 0,
    };

    it("Should add a new card", async () => {
        const mockAxiosInstance = createMockAxiosInstance(mockResponse);

        const response = await cardsService.addCard(token, newCard);

        expect(response).toEqual(mockResponse);
        expect(mockAxiosInstance.post).toHaveBeenCalledWith("/cards", newCard);
    });

    it("Should update a card", async () => {
        const mockAxiosInstance = createMockAxiosInstance(mockResponse);

        const response = await cardsService.updateCard(token, newCard);

        expect(response).toEqual(mockResponse);
        expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/cards/${newCard.id}`,
            newCard
        );
    });

    it("Should get a card", async () => {
        const mockAxiosInstance = createMockAxiosInstance(mockResponse);

        const response = await cardsService.getCard(token, newCard.id);

        expect(response).toEqual(mockResponse);
        expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/cards/${newCard.id}`
        );
    });

    it("Should delete a card", async () => {
        const mockAxiosInstance = createMockAxiosInstance(mockResponse);

        const response = await cardsService.deleteCard(token, newCard.id);

        expect(response).toEqual(mockResponse);
        expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/cards/${newCard.id}`
        );
    });
});
