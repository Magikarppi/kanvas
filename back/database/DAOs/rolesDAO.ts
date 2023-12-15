import { executeQuery } from "../database-service";
import { getProjectAdmin, removeUserRole } from "../queries/rolesQueries";

export const getProjectAdminDAO = async (userId: string, projectId: string) => {
    const queryParameters = [userId, projectId, "admin"];

    const result = await executeQuery(getProjectAdmin, queryParameters);
    if (result) {
        return result.rows[0];
    }
};

export const removeUserRoleDAO = async (userId: string, projectId: string) => {
    const queryParameters = [userId, projectId];
    await executeQuery(removeUserRole, queryParameters);
};
