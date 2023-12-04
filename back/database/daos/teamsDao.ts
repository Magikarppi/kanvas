import { executeQuery } from "../database-service";
import { getTeamById } from "../queries/teamQueries";

export const getTeamByIdDao = async (id: string) => {
    const teams = await executeQuery(getTeamById, [id]);
    if (teams) {
        return teams.rows[0];
    }
};
