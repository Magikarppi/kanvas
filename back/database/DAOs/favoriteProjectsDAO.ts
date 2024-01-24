import { executeQuery } from "../database-service";
import {
    deleteFavoriteProject,
    insertProjectFavoriteProjects,
    getUserFavoriteProjects,
} from "../queries/projectQueries";
import { IProjectMember } from "../utils/interfaces";

export const deleteFavoriteProjectDAO = async (favoriteProjectId: string) => {
    const queryParameters = [favoriteProjectId];
    await executeQuery(deleteFavoriteProject, queryParameters);
};

export const insertProjectFavoriteProjectsDAO = async (
    favoriteProject: IProjectMember
) => {
    const queryParameters = [
        favoriteProject.id,
        favoriteProject.projectId,
        favoriteProject.userId,
    ];
    await executeQuery(insertProjectFavoriteProjects, queryParameters);
};

export const getUserFavoriteProjectsDAO = async (userId: string) => {
    const result = await executeQuery(getUserFavoriteProjects, [userId]);
    if (result) {
        return result.rows;
    }
};
