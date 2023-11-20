import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/usersRouter";
import { createTablesAndFillWithDummyData } from "./database/database-service";
import teamsRouter from "./routes/teamsRouter";

const server = express();

server.use(cors());

server.use(express.json());
server.use(cookieParser());

server.use("/users", userRouter);
server.use("/teams", teamsRouter);

createTablesAndFillWithDummyData();

export default server;
