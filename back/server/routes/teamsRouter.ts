import express, { Request, Response } from "express";
import { getTeamByIdDao, createNewTeamDAO, addTeamUsersTeams } from "../../database/daos/teamsDao";
import { HTTP_RESPONSE_CODES, RESPONSE_MESSAGES } from "../utils/utilities";
import { v4 as uuid } from "uuid";
import { UserRequest } from "../middleware/middleware";
import { ITeam, IUsersTeam } from "../../database/utils/interfaces";
import { getUserEmailDAO } from "../../database/daos/userDao";
import { JwtPayload } from "jsonwebtoken";



const teams = express.Router();

teams.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const team = await getTeamByIdDao(id);

        if (team) {
            res.status(HTTP_RESPONSE_CODES.OK).send(team);
        } else {
            res.status(HTTP_RESPONSE_CODES.NOT_FOUND).send(RESPONSE_MESSAGES.TEAM_NOT_FOUND);
        }
    } catch (error) {
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

teams.post("/newteam", async (req: UserRequest, res: Response) => {
    try {
        const { name, isPublic } = req.body;
        const token = req.user as JwtPayload;
        const existingUser = await getUserEmailDAO(token.value);
        const userId = existingUser.id;
        const team: ITeam = {
            id: uuid(),
            name,
            admin: userId,
            isPublic,
        };
  
        await createNewTeamDAO(team);
        const teamId = team.id;

        const addedTeam: IUsersTeam = {
            id: uuid(),
            user_id: userId,
            team_id: teamId,
        };
  
        await addTeamUsersTeams(addedTeam);
        res.json({
            team: team,
            addedTeam: addedTeam,
        });
    } catch (error) {
        return res
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

  
export default teams;
