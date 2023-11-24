import { executeQuery } from "../database-service";
import {
    getProjectById,
    getProjectMemberByProjectId,
    insertProject,
} from "../queries/projectQueries";
import { IProject } from "../utils/interfaces";

export const addProjectDao = async ({
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
        return result.rows[0] as IProject | null;
    }
};

export const getProjectMemberDAO = async (
    userId: string,
    projectId: string
) => {
    const result = await executeQuery(getProjectMemberByProjectId, [
        userId,
        projectId,
    ]);
    if (result) {
        return result.rows[0];
    }
};

export const getSingleProjectDAO = async (projectId:string) => {
    const result = await executeQuery(getProjectById, [projectId]);
    if (result) {
        return result.rows[0];
    }
};
