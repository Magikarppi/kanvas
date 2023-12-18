import express, { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { v4 as uuid } from "uuid";

import {
    getTeamDAO,
    insertTeamDAO,
    updateTeamDAO,
    deleteTeamDAO,
} from "../../database/DAOs";
import { HTTP_RESPONSE_CODES, RESPONSE_MESSAGES } from "../utils/utilities";
import { UserRequest } from "../middleware/middleware";
import { ITeam, IUsersTeam } from "../../database/utils/interfaces";

const teams = express.Router();

teams.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const team = await getTeamDAO(id);

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
        const { value: userId } = req.user as JwtPayload;

        const team: ITeam = {
            id: uuid(),
            name,
            admin: userId,
            isPublic,
        };

        const teamId = team.id;
        const userTeam: IUsersTeam = {
            id: uuid(),
            userId: userId,
            teamId: teamId,
        };

        await insertTeamDAO(team, userTeam);
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

        const getTeam = await getTeamDAO(id);
        const adminUid = getTeam.admin;

        const { value: userId } = req.user as JwtPayload;
        if (adminUid === userId) {
            const team: ITeam = {
                id: id,
                name: req.body.name,
                admin: req.body.admin,
                isPublic: req.body.isPublic,
            };
            await updateTeamDAO(id, team);
            res.status(HTTP_RESPONSE_CODES.OK).json({ team: team });
        } else {
            res.status(HTTP_RESPONSE_CODES.FORBIDDEN).send(
                "You are not admin in this team"
            );
        }
    } catch (error) {
        console.error(error);
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

teams.delete("/delete/:id", async (req: UserRequest, res: Response) => {
    try {
        const id = req.params.id;
        const getTeam = await getTeamDAO(id);
        if (!getTeam) {
            return res
                .status(HTTP_RESPONSE_CODES.NOT_FOUND)
                .send(RESPONSE_MESSAGES.TEAM_NOT_FOUND);
        }

        const adminUid = getTeam.admin;
        const { value: userId } = req.user as JwtPayload;
        if (adminUid === userId) {
            await deleteTeamDAO(id);
            res.status(HTTP_RESPONSE_CODES.OK).send();
        } else {
            res.status(HTTP_RESPONSE_CODES.FORBIDDEN).send(
                "You are not admin in this team"
            );
        }
    } catch (error) {
        console.error(error);
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

export default teams;
