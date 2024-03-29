import { executeMultipleQueries, executeQuery } from "../database-service";
import { IParametrizedQuery, ITeam, IUsersTeam } from "../utils/interfaces";
import {
    getTeamById,
    insertTeam,
    insertUsersTeamLink,
    updateTeam,
    deleteTeam,
    getUserTeams,
} from "../queries/teamQueries";

export const getTeamDAO = async (id: string) => {
    const teams = await executeQuery(getTeamById, [id]);
    if (teams) {
        return teams.rows[0];
    }
};

export const insertTeamDAO = async (team: ITeam, userTeam: IUsersTeam) => {
    const insertTeamOperation: IParametrizedQuery = {
        query: insertTeam,
        parameters: [team.id, team.name, team.admin, team.isPublic],
    };

    const insertUsersTeamLinkOperation: IParametrizedQuery = {
        query: insertUsersTeamLink,
        parameters: [userTeam.id, userTeam.userId, userTeam.teamId],
    };

    await executeMultipleQueries(
        insertTeamOperation,
        insertUsersTeamLinkOperation
    );
};

export const insertUsersTeamLinkDAO = async ({
    id,
    userId,
    teamId,
}: IUsersTeam) => {
    await executeQuery(insertUsersTeamLink, [id, userId, teamId]);
};

export const updateTeamDAO = async (id: string, team: ITeam) => {
    await executeQuery(updateTeam, [team.name, team.isPublic, id]);
};

export const deleteTeamDAO = async (id: string) => {
    await executeQuery(deleteTeam, [id]);
};

export const getUserTeamsDAO = async (userId: string) => {
    const result = await executeQuery(getUserTeams, [userId]);
    if (result) {
        return result.rows;
    }
};
