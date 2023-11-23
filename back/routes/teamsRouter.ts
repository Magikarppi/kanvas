import express, { Request, Response } from "express";
import { getTeamByIdDao } from "../database/daos/teamsDao";

const teams = express.Router();

teams.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const team = await getTeamByIdDao(id);

        if (team) {
            res.send(team).status(200);
        } else {
            res.send("Team not found").status(404);
        }
    } catch (error) {
        res.send("Error retrieving team").status(500);
    }
});
export default teams;
