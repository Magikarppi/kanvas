import { executeQuery } from "../database-service";
import { ITeam, IUsersTeam } from "../utils/interfaces";
import { getTeamById, insertNewTeam, insertTeamUsersTeam } from "../queries/teamQueries";

export const getTeamByIdDao = async (id: string) => {
    const teams = await executeQuery(getTeamById, [id]);
    if (teams) {
        return teams.rows[0];
    }
};

export const createNewTeamDAO = async ({
    id,
    name,
    admin,
    isPublic,
    
}: ITeam) => {
    await executeQuery(insertNewTeam, [
        id,
        name,
        admin,
        isPublic,     
    ]);
};

export const addTeamUsersTeams = async ({
    id,
    userId,
    teamId,    
}: IUsersTeam) => {
    await executeQuery(insertTeamUsersTeam, [id,userId,teamId]);
};


