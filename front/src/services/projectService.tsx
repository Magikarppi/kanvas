import axios from "axios";

import { TProject } from "../models/projectModels";

const createClient = (token: string) => {
    return axios.create({
        baseURL: "http://localhost:5000/projects",
        headers: { Authorization: `Bearer ${token}` },
    });
};
const projectService = {
    getUsersProjects: async (token: string, userId: string) => {
        const client = createClient(token);
        const response = await client.get(`/userprojects/${userId}`);

        return response.data;
    },
    getProjectById: async (token: string, projectId: string) => {
        const client = createClient(token);
        const response = await client.get(`/${projectId}`);

        return response.data;
    },
    createNewProject: async (token: string, projectPayload: TProject) => {
        const client = createClient(token);
        const response = await client.post("/", projectPayload);

        return response.data;
    },
    deleteProjectById: async (token: string, projectId: string) => {
        const client = createClient(token);
        const response = await client.delete(`/${projectId}`);

        return response.data;
    },
    updateProjectById: async (
        token: string,
        projectPayload: TProject,
        projectId: string
    ) => {
        const client = createClient(token);
        const response = await client.put(`/${projectId}`, projectPayload);

        return response.data;
    },
};

export default projectService;
