import { ITeam } from "../models/teamModels";
import { createClient } from "../utils/axiosUtils";

const teamsService = {
    addTeam: async (token: string, teamName: string, isPublic: boolean) => {
        const client = createClient(token);
        const response = await client.post("/teams/newteam", {
            name: teamName,
            isPublic,
        });

        return response.data;
    },
    getPublicTeams: async (token: string) => {
        const client = createClient(token);
        const response = await client.get("/teams/public");

        return response.data;
    },
    getTeam: async (token: string, teamId: string) => {
        const client = createClient(token);
        const response = await client.get(`/teams/${teamId}`);

        return response.data;
    },
    updateTeam: async (token: string, team: ITeam) => {
        const client = createClient(token);
        const response = await client.put(`/teams/update/${team.id}`, team);

        return response.data;
    },
    deleteTeam: async (token: string, teamId: string) => {
        const client = createClient(token);
        const response = await client.delete(`/teams/delete/${teamId}`);

        return response.data;
    },
};

export default teamsService;
