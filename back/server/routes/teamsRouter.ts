import express, { Request, Response } from "express";
import { getTeamByIdDao } from "../../database/daos/teamsDao";
import { HTTP_RESPONSE_CODES, RESPONSE_MESSAGES } from "../utils/utilities";

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
export default teams;
