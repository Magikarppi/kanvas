import axios from "axios";

import { TProject } from "../models/projectModels";

const createClient = () => {
    const token: string | null = null;

    return axios.create({
        baseURL: "http://localhost:5000/projects",
        headers: { Authorization: `Bearer ${token}` },
    });
};
const projectService = {
    getUsersProjects: async (userId: string) => {
        const client = createClient();
        const response = await client.get(`/userprojects/${userId}`);

        return response.data;
    },
    getProjectById: async (projectId: string) => {
        const client = createClient();
        const response = await client.get(`/${projectId}`);

        return response.data;
    },
    createNewProject: async (projectPayload: TProject) => {
        const client = createClient();
        const response = await client.post("/", projectPayload);

        return response.data;
    },
    deleteProjectById: async (projectId: string) => {
        const client = createClient();
        const response = await client.delete(`/${projectId}`);

        return response.data;
    },
    updateProjectById: async (projectPayload: TProject, projectId: string) => {
        const client = createClient();
        const response = await client.put(`/${projectId}`, projectPayload);

        return response.data;
    },
};

export default projectService;
