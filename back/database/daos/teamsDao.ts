import { executeQuery } from "../database-service";
import { ITeam, IUsersTeam } from "../utils/interfaces";
import { getTeamById, insertNewTeam, insertTeamUsersTeam } from "../queries/teamQueries";

export const getTeamByIdDao = async (id: string) => {
    const teams = await executeQuery(getTeamById, [id]);
    if (teams) {
        return teams.rows[0] as ITeam;
    }
};

export const createNewTeamDAO = async ({
    id,
    name,
    admin,
    is_public,
    
}: ITeam) => {
    const result = await executeQuery(insertNewTeam, [
        id,
        name,
        admin,
        is_public,     
    ]);

    if (result) {
        return result.rows[0] as ITeam;
    }
};

export const addTeamUsersTeams = async ({
    id,
    user_id,
    team_id,    
}: IUsersTeam) => {
    const addedTeam = await executeQuery(insertTeamUsersTeam, [id,user_id,team_id]);
    if (addedTeam) {
        return addedTeam.rows[0];
    }
};


