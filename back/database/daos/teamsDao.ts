import { executeQuery } from "../database-service";
import { ITeam } from "../utils/interfaces";
import { getTeamById } from "../queries/teamQueries";

export const getTeamByIdDao = async (id: string) => {
    const teams = await executeQuery(getTeamById, [id]);
    if (teams) {
        return teams.rows[0] as ITeam;
    }
};
