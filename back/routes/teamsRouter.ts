import express, { Request, Response } from "express";
import { getTeamByIdDao } from "../database/teamsDao";


const teams = express.Router();
teams.get("/teams/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const team = getTeamByIdDao(id);
    res.send(team).status(200);
});
export default teams;
