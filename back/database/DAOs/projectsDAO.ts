import { executeMultipleQueries, executeQuery } from "../database-service";
import { insertPlaceholderColumns } from "../queries/projectColumnsQueries";
import {
    getProject,
    getProjectMember,
    getUserProjects,
    getUserFavoriteProjects,
    deleteProject,
    updateProject,
    insertProjectMember,
    insertProject,
    getProjectMembers,
    deleteFavoriteProject,
    insertProjectFavoriteProjects,
} from "../queries/projectQueries";
import { insertProjectAdmin } from "../queries/rolesQueries";
import {
    IParametrizedQuery,
    IProject,
    IProjectColumn,
    IProjectMember,
    IUserRole,
} from "../utils/interfaces";

export const insertProjectDAO = async (
    project: IProject,
    projectMember: IProjectMember,
    userRole: IUserRole,
    placeholderColumns: IProjectColumn[]
) => {
    const insertProjectOperation: IParametrizedQuery = {
        query: insertProject,
        parameters: [
            project.id,
            project.name,
            project.description,
            project.isPublic,
            project.creationDate,
            project.endDate,
            project.theme,
            project.picture,
        ],
    };

    const insertProjectMemberOperation: IParametrizedQuery = {
        query: insertProjectMember,
        parameters: [
            projectMember.id,
            projectMember.userId,
            projectMember.projectId,
        ],
    };

    const insertProjectAdminOperation: IParametrizedQuery = {
        query: insertProjectAdmin,
        parameters: [userRole.projectId, userRole.userId, userRole.role],
    };

    const insertPlaceholderColumnsOperation: IParametrizedQuery = {
        query: insertPlaceholderColumns,
        parameters: [
            placeholderColumns[0].id,
            placeholderColumns[0].projectId,
            placeholderColumns[0].columnName,
            placeholderColumns[0].orderIndex,
            placeholderColumns[1].id,
            placeholderColumns[1].projectId,
            placeholderColumns[1].columnName,
            placeholderColumns[1].orderIndex,
            placeholderColumns[2].id,
            placeholderColumns[2].projectId,
            placeholderColumns[2].columnName,
            placeholderColumns[2].orderIndex,
        ],
    };

    const results = await executeMultipleQueries(
        insertProjectOperation,
        insertProjectMemberOperation,
        insertProjectAdminOperation,
        insertPlaceholderColumnsOperation,
    );

    if (results) {
        return results[0].rows[0];
    }
};

export const deleteProjectDAO = async (projectId: string) => {
    const queryParameters = [projectId];
    await executeQuery(deleteProject, queryParameters);
};

export const insertProjectMemberDAO = async (projectMember: IProjectMember) => {
    const queryParameters = [
        projectMember.id,
        projectMember.userId,
        projectMember.projectId,
    ];
    await executeQuery(insertProjectMember, queryParameters);
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

export const getProjectMembersDAO = async (
    projectId: string
) => {
    const result = await executeQuery(getProjectMembers, [projectId]);
    if (result) {
        return result.rows;
    }
};

export const deleteFavoriteProjectDAO = async (favoriteProjectId: string) => {
    const queryParameters = [favoriteProjectId];
    await executeQuery(deleteFavoriteProject, queryParameters);
};

export const insertProjectFavoriteProjectsDAO = async (favoriteProject: IProjectMember) => {
    const queryParameters = [
        favoriteProject.id,
        favoriteProject.projectId,
        favoriteProject.userId,
    ];
    await executeQuery(insertProjectFavoriteProjects, queryParameters);
};
