import projectService from "../../services/projectService";
import { createMockAxiosInstance } from "../testUtils";
import { IProject, IProjectSubmitNew } from "../../models/projectModels";

jest.mock("axios");
describe("Project Service", () => {
    const token = "mock-token";
    const newProjectId = "914c37df-9e69-4442-ace9-da4c97412f44";
    const date = new Date();

    const newFullProject: IProject ={
        id: newProjectId,
        name: "Test project name",
        description: "Test project description",
        isPublic: false,
        creationDate: date,
        endDate: null,
        theme: "red",
        picture: null,
    };

    const members: string[] = [];

    it("Should add a new project", async () => {

        const newProjectPart: IProjectSubmitNew ={
            name: "Test project name",
            description: "Test project description",
            isPublic: false,
            endDate: null,
            theme: "red",
            picture: null,
        };
        
        const mockResponse = {
            data: newProjectPart,
            status: 200
        };

        const mockAxiosInstance = createMockAxiosInstance(mockResponse);

        const response = await projectService.createNewProject(token, newProjectPart, members);

        expect(response).toEqual(mockResponse);
        expect(response.status).toBe(200);
        expect(mockAxiosInstance.post).toHaveBeenCalledWith("/projects", {
            ...mockResponse.data,
            members,
        });
    });

    it("should get project by it's id", async () => {
        const mockResponse = {
            data: {
                project: newFullProject,
                projectColumns: [],
                projectMembers: [],
                cards: [],
            },
            status: 200
        };

        const mockAxiosInstance = createMockAxiosInstance(mockResponse);

        const response = await projectService.getProjectById(token, newFullProject.id);

        expect(response).toEqual(mockResponse);
        expect(response.status).toBe(200);
        expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/projects/${newProjectId}`);
    });

    it("should delete project by it's id", async () => {

        const mockResponse = {
            data: "Project deleted",
            status: 200
        };

        const mockAxiosInstance = createMockAxiosInstance(mockResponse);

        const response = await projectService.deleteProjectById(token, newFullProject.id);

        expect(response).toEqual(mockResponse);
        expect(response.status).toBe(200);
        expect(mockAxiosInstance.delete).toHaveBeenCalledWith(`/projects/${newProjectId}`);
    });

    it("should update project by it's id", async () => {

        const updatedProject: IProject ={
            id: newProjectId,
            name: "Test project name2",
            description: "Test project description2",
            isPublic: true,
            creationDate: newFullProject.creationDate,
            endDate: date,
            theme: "blue",
            picture: null,
        };

        const mockResponse = {
            data: "Project updated",
            status: 200
        };

        const mockAxiosInstance = createMockAxiosInstance(mockResponse);

        const response = await projectService.updateProjectById(token, updatedProject, newProjectId, []);

        expect(response).toEqual(mockResponse);
        expect(response.status).toBe(200);
        expect(mockAxiosInstance.put).toHaveBeenCalledWith(`/projects/${newProjectId}`, {
            ...updatedProject,
            members,
        });
    });
});