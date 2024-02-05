import { executeQuery } from "../database-service";
import {
    getProjectMember,
    getProjectMembers,
    getProjectMembersByCardId,
    insertProjectMember,
} from "../queries/projectMemberQueries";
import { IProjectMember } from "../utils/interfaces";

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

export const getProjectMembersDAO = async (projectId: string) => {
    const result = await executeQuery(getProjectMembers, [projectId]);
    if (result) {
        return result.rows;
    }
};

export const getProjectMembersByCardIdDAO = async (cardId: string) => {
    const result = await executeQuery(getProjectMembersByCardId, [cardId]);
    if (result) {
        return result.rows;
    }
};
