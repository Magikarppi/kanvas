import axios, { AxiosInstance } from "axios";
import teamsService from "../../services/teamsService";

jest.mock("axios");

describe("Teams Service", () => {
    const token = "mock-token";
    const userId = "ce93eddf-7f72-43a1-978b-c67757a4e08f";
    const teamName = "Test Team";
    const teamId = "13aeea84-f685-4d50-9521-79709e9a06c3";

    it("should add a new team", async () => {
        const isPublic = false;
        const mockResponse = {
            team: {
                name: teamName,
                isPublic,
                id: teamId,
                admin: userId,
            },
        };

        const mockAxiosInstance: Partial<AxiosInstance> = {
            post: jest.fn().mockResolvedValue({ data: mockResponse }),
        };

        (axios.create as jest.Mock).mockReturnValue(
            mockAxiosInstance as AxiosInstance
        );

        const response = await teamsService.addTeam(token, teamName, isPublic);

        expect(response).toEqual(mockResponse);
        expect(mockAxiosInstance.post).toHaveBeenCalledWith("/newteam", {
            name: teamName,
            isPublic,
        });
    });

    it("should get a team by it's id", async () => {
        const isPublic = true;
        const mockResponse = {
            team: {
                name: teamName,
                isPublic,
                id: teamId,
                admin: userId,
            },
        };

        const mockAxiosInstance: Partial<AxiosInstance> = {
            get: jest.fn().mockResolvedValue({ data: mockResponse }),
        };

        (axios.create as jest.Mock).mockReturnValue(
            mockAxiosInstance as AxiosInstance
        );

        const response = await teamsService.getTeam(token, teamId);

        expect(response).toEqual(mockResponse);
        expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/${teamId}`);
    });

    it("should update a team", async () => {
        const mockResponse = {
            team: {
                name: teamName,
                isPublic: false,
                id: teamId,
                admin: userId,
            },
        };

        const updatedTeamData = {
            name: teamName,
            admin: userId,
            isPublic: false,
            id: teamId,
        };

        const mockAxiosInstance: Partial<AxiosInstance> = {
            put: jest.fn().mockResolvedValue({ data: mockResponse }),
        };

        (axios.create as jest.Mock).mockReturnValue(
            mockAxiosInstance as AxiosInstance
        );

        const response = await teamsService.updateTeam(token, updatedTeamData);

        expect(response).toEqual(mockResponse);
        expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            `/update/${teamId}`,
            updatedTeamData
        );
    });
});
