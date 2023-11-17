import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/usersRouter";
import { createTablesAndFillWithDummyData } from "./database/database-service";
import { getTeamByIdDao } from "./database/teamsDao";

const server = express();

server.use(cors());

server.use(express.json());
server.use(cookieParser());

server.get('/teams/:id', (req, res) => {
  const id = req.params.id;
  const team = getTeamByIdDao(id);
  res.send(team).status(200);
});
server.use("/users", userRouter);

createTablesAndFillWithDummyData();

export default server;
