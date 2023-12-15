import { executeQuery } from "../database-service";
import {
    getProject,
    getProjectMember,
    insertProject,
    getUserProjects,
    getUserFavoriteProjects,
    deleteProject,
    updateProject,
} from "../queries/projectQueries";
import { IProject } from "../utils/interfaces";

export const insertProjectDAO = async ({
    id,
    name,
    description,
    isPublic,
    creationDate,
    endDate,
    theme,
    picture,
}: IProject) => {
    const result = await executeQuery(insertProject, [
        id,
        name,
        description,
        isPublic,
        creationDate,
        endDate,
        theme,
        picture,
    ]);

    if (result) {
        return result.rows[0];
    }
};

export const deleteProjectDAO = async (projectId: string) => {
    const queryParameters = [projectId];
    await executeQuery(deleteProject, queryParameters);
};

export const getProjectMemberDAO = async (
    userId: string,
    projectId: string
) => {
    const result = await executeQuery(getProjectMember, [userId, projectId]);
    if (result) {
        return result.rows[0];
    }
};

export const getProjectDAO = async (projectId: string) => {
    const result = await executeQuery(getProject, [projectId]);
    if (result) {
        return result.rows[0];
    }
};

export const getUserProjectsDAO = async (userId: string) => {
    const result = await executeQuery(getUserProjects, [userId]);
    if (result) {
        return result.rows;
    }
};

export const getUserFavoriteProjectsDAO = async (userId: string) => {
    const result = await executeQuery(getUserFavoriteProjects, [userId]);
    if (result) {
        return result.rows;
    }
};

export const updateProjectDAO = async (
    projectId: string,
    project: IProject
) => {
    const params = [
        project.name,
        project.description,
        project.isPublic,
        project.creationDate,
        project.endDate,
        project.theme,
        project.picture,
        projectId,
    ];
    await executeQuery(updateProject, params);
};
