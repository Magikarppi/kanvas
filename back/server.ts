import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/usersRouter";
import { createTablesAndFillWithDummyData } from "./database/database-service";
import teamsRouter from "./routes/teamsRouter";
import projectsRouter from "./routes/projectsRouter";
import { authenticate, loggerMiddleWare } from "./middleware/middleware";

const server = express();

server.use(cors());

server.use(express.json());
server.use(cookieParser());

server.use(loggerMiddleWare);

server.use("/users", userRouter);
server.use("/teams", teamsRouter);
server.use("/projects", authenticate, projectsRouter);

createTablesAndFillWithDummyData();

export default server;
