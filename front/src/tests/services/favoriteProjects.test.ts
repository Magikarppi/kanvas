import axios, { AxiosInstance } from "axios";
import projectService from "../../services/projectService";

jest.mock("axios");

const token = "fake-token";
const projectId = "1555fa84-1bac-4eba-9bea-af22fa0a731b";

describe("Favorite projects POST, DELETE", () => {
    it("adds a favorite project", async () => {
        const userId = "0fb4a510-2d6e-4608-b2c4-6557646b4e1f";

        const mockResponse = {
            favoriteProject: {
                id: "mockid",
                projectId: projectId,
                userId: userId,
            },
        };

        const mockAxiosInstance: Partial<AxiosInstance> = {
            post: jest.fn().mockResolvedValue({ data: mockResponse }),
        };

        (axios.create as jest.Mock).mockReturnValue(
            mockAxiosInstance as AxiosInstance
        );

        const result = await projectService.addFavoriteProject(
            token,
            projectId
        );

        expect(result).toEqual(mockResponse);
        expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            "/addfavoriteproject",
            {
                projectId: projectId,
            }
        );
    });

    it("deletes favorite project", async () => {
        const mockResponse = "Favorite project deleted";

        const mockAxiosInstance: Partial<AxiosInstance> = {
            delete: jest.fn().mockResolvedValue(mockResponse),
        };

        (axios.create as jest.Mock).mockReturnValue(
            mockAxiosInstance as AxiosInstance
        );

        const result = await projectService.deleteFavoriteProject(
            token,
            projectId
        );

        expect(result).toEqual(mockResponse);
        expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
            `/favorite-projects/${projectId}`
        );
    });
});
