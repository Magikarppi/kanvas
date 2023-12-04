import { executeQuery } from "../database-service";
import { getProjectMember } from "../queries/projectMembersQueries";

export const getProjectMemberDAO = async (
    userId: string,
    projectId: string
) => {
    const queryParameters = [userId, projectId];
    const result = await executeQuery(getProjectMember, queryParameters);
    if (result) {
        return result.rows[0];
    }
};
