import axios from "axios";

import { IProject, IProjectSubmitNew } from "../models/projectModels";

const createClient = (token: string) => {
    return axios.create({
        baseURL: "http://localhost:5000/projects",
        headers: { Authorization: `Bearer ${token}` },
    });
};
const projectService = {
    getUsersProjects: async (token: string, userId: string) => {
        const client = createClient(token);
        const response = await client.get(`/dashboard/${userId}`);

        return response.data;
    },
    getProjectById: async (token: string, projectId: string) => {
        const client = createClient(token);
        const response = await client.get(`/${projectId}`);

        return response.data;
    },
    createNewProject: async (
        token: string,
        projectPayload: IProjectSubmitNew
    ) => {
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
        projectPayload: IProject,
        projectId: string
    ) => {
        const client = createClient(token);
        const response = await client.put(`/${projectId}`, projectPayload);

        return response.data;
    },
    addFavoriteProject: async (token: string, projectId: string) => {
        const client = createClient(token);
        const response = await client.post("/favorite-projects", {
            projectId: projectId,
        });

        return response.data;
    },
    deleteFavoriteProject: async (token: string, projectId: string) => {
        const client = createClient(token);
        const response = await client.delete(`/favorite-projects/${projectId}`);
        return response;
    },
};

export default projectService;
