import {
    IProject,
    IProjectImage,
    IProjectSubmitNew,
} from "../models/projectModels";
import { createClient } from "../utils/axiosUtils";

const projectService = {
    getUsersProjects: async (token: string, userId: string) => {
        const client = createClient(token);
        const response = await client.get(`/projects/dashboard/${userId}`);

        return response.data;
    },
    getProjectById: async (token: string, projectId: string) => {
        const client = createClient(token);
        const response = await client.get(`/projects/${projectId}`);

        return response.data;
    },
    createNewProject: async (
        token: string,
        projectPayload: IProjectSubmitNew,
        members: string[]
    ) => {
        const client = createClient(token);
        const response = await client.post("/projects", {
            ...projectPayload,
            members,
        });

        return response.data;
    },
    deleteProjectById: async (token: string, projectId: string) => {
        const client = createClient(token);
        const response = await client.delete(`/projects/${projectId}`);

        return response.data;
    },
    updateProjectById: async (
        token: string,
        projectPayload: IProject,
        projectId: string,
        members: string[]
    ) => {
        const client = createClient(token);
        const response = await client.put(`/projects/${projectId}`, {
            ...projectPayload,
            members,
        });
        return response.data;
    },
    updateProjectImage: async (
        token: string,
        projectImage: IProjectImage,
        projectId: string
    ) => {
        const client = createClient(token);
        const response = await client.put(
            `/projects/${projectId}`,
            projectImage
        );
        return response.data;
    },
    addFavoriteProject: async (token: string, projectId: string) => {
        const client = createClient(token);
        const response = await client.post("/projects/favorite-projects", {
            projectId: projectId,
        });

        return response.data;
    },
    deleteFavoriteProject: async (token: string, projectId: string) => {
        const client = createClient(token);
        const response = await client.delete(
            `/projects/favorite-projects/${projectId}`
        );
        return response;
    },
};

export default projectService;
