import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getTeamByIdDao } from "./database/teamsDAO";
const server = express();

server.use(cors());

server.use(express.json());
server.use(cookieParser());

server.get('/teams/:id', (req, res) => {
  const id = req.params.id;
  const team = getTeamByIdDao(id);
  res.send(team).status(200);
});

export default server;
