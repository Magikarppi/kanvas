import { executeMultipleQueries, executeQuery } from "../database-service";
import { insertPlaceholderColumns } from "../queries/projectColumnsQueries";
import {
    deleteProjectMembers,
    insertProjectMember,
} from "../queries/projectMemberQueries";
import {
    getProject,
    getUserProjects,
    deleteProject,
    updateProject,
    insertProject,
    getPublicProjects,
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
    projectMembers: IProjectMember[],
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

    const insertProjectMemberOperations: IParametrizedQuery[] =
        projectMembers.map((projectMember) => ({
            query: insertProjectMember,
            parameters: [
                projectMember.id,
                projectMember.userId,
                projectMember.projectId,
            ],
        }));

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
        ...insertProjectMemberOperations,
        insertProjectAdminOperation,
        insertPlaceholderColumnsOperation
    );

    if (results) {
        return results[0].rows[0];
    }
};

export const deleteProjectDAO = async (projectId: string) => {
    const queryParameters = [projectId];
    await executeQuery(deleteProject, queryParameters);
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

export const updateProjectDAO = async (
    projectId: string,
    project: IProject,
    projectMembers: IProjectMember[],
    adminId: string
) => {
    const clearProjectMembersOperation: IParametrizedQuery = {
        query: deleteProjectMembers,
        parameters: [projectId, adminId],
    };

    const updateProjectMemberOperations: IParametrizedQuery[] =
        projectMembers.map((projectMember) => ({
            query: insertProjectMember,
            parameters: [
                projectMember.id,
                projectMember.userId,
                projectMember.projectId,
            ],
        }));

    const updateProjectInfoOperation: IParametrizedQuery = {
        query: updateProject,
        parameters: [
            project.name,
            project.description,
            project.isPublic,
            project.creationDate,
            project.endDate,
            project.theme,
            project.picture,
            projectId,
        ],
    };

    await executeMultipleQueries(
        clearProjectMembersOperation,
        ...updateProjectMemberOperations,
        updateProjectInfoOperation
    );
};

export const getPublicProjectsDAO = async (isPublic: boolean) => {
    const queryParameters = [isPublic];
    const result = await executeQuery(getPublicProjects, queryParameters);
    if (result) {
        return result.rows;
    }
};
