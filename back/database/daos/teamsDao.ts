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
    const result = await executeQuery(insertNewTeam, [
        id,
        name,
        admin,
        isPublic,     
    ]);

    if (result) {
        return result.rows[0] as ITeam;
    }
};

export const addTeamUsersTeams = async ({
    id,
    userId,
    teamId,    
}: IUsersTeam) => {
    const addedTeam = await executeQuery(insertTeamUsersTeam, [id,userId,teamId]);
    if (addedTeam) {
        return addedTeam.rows[0];
    }
};


