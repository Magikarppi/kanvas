import { executeQuery } from "../database-service";
import { getProjectAdmin, insertProjectAdmin, removeUserRole } from "../queries/rolesQueries";
import { IUserRole } from "../utils/interfaces";

export const insertProjectAdminDAO = async (userRole: IUserRole) => {
    const queryParameters = [
        userRole.projectId,
        userRole.userId,
        userRole.role,
    ];
    await executeQuery(insertProjectAdmin, queryParameters);
};

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
