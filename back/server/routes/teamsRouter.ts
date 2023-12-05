import express, { Request, Response } from "express";
import { getTeamByIdDao, createNewTeamDAO, addTeamUsersTeams, updateTeamDao } from "../../database/daos/teamsDao";
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
            res.status(HTTP_RESPONSE_CODES.NOT_FOUND).send(
                RESPONSE_MESSAGES.TEAM_NOT_FOUND
            );
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

        const userTeam: IUsersTeam = {
            id: uuid(),
            userId: userId,
            teamId: teamId,
        };

        await addTeamUsersTeams(userTeam);
        res.json({
            team: team,
            addedTeam: userTeam,
        });
    } catch (error) {
        return res
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});


teams.put("/update/:id", async (req: UserRequest, res: Response) => {
    try {
        const id = req.params.id;
        const getTeam = await getTeamByIdDao(id);
        const adminUid = getTeam.admin;
        const token = req.user as JwtPayload;
        const existingUser = await getUserEmailDAO(token.value);
        const userId = existingUser.id;
        if(adminUid === userId) {
            const team: ITeam = {
                id: req.body.id,
                name: req.body.name,
                admin: req.body.admin,
                isPublic: req.body.is_public,
            };
            await updateTeamDao(id, team);
            res.json({
                team: team,
            });
            res.status(HTTP_RESPONSE_CODES.OK).send();
        } else {
            res.status(HTTP_RESPONSE_CODES.NOT_FOUND).send("You are not admin in this team");

        }
    } catch (error) {
        console.error(error);
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

  
export default teams;
