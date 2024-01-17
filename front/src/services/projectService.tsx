import { IProject, IProjectSubmitNew } from "../models/projectModels";
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
        projectPayload: IProjectSubmitNew
    ) => {
        const client = createClient(token);
        const response = await client.post("/projects", projectPayload);

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
        projectId: string
    ) => {
        const client = createClient(token);
        const response = await client.put(
            `/projects/${projectId}`,
            projectPayload
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
