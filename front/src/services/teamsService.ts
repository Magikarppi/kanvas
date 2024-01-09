import axios from "axios";
import { ITeam } from "../models/teamModels";

const createClient = (token: string) => {
    return axios.create({
        baseURL: "http://localhost:5000/teams",
        headers: { Authorization: `Bearer ${token}` },
    });
};

const teamsService = {
    addTeam: async (token: string, teamName: string, isPublic: boolean) => {
        const client = createClient(token);
        const response = await client.post("/newteam", {
            name: teamName,
            isPublic,
        });

        return response.data;
    },
    getPublicTeams: async (token: string) => {
        const client = createClient(token);
        const response = await client.get("/public");

        return response.data;
    },
    getTeam: async (token: string, teamId: string) => {
        const client = createClient(token);
        const response = await client.get(`/${teamId}`);

        return response.data;
    },
    updateTeam: async (token: string, team: ITeam) => {
        const client = createClient(token);
        const response = await client.put(`/update/${team.id}`, team);

        return response.data;
    },
    deleteTeam: async (token: string, teamId: string) => {
        const client = createClient(token);
        const response = await client.delete(`/delete/${teamId}`);

        return response.data;
    },
};

export default teamsService;
