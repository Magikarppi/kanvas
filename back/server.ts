import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./server/routes/usersRouter";
// import { createTablesAndFillWithDummyData } from "./database/database-service";
import teamsRouter from "./server/routes/teamsRouter";
import projectsRouter from "./server/routes/projectsRouter";
import { authenticate, loggerMiddleWare } from "./server/middleware/middleware";
import cardsRouter from "./server/routes/cardsRouter";
import columnsRouter from "./server/routes/columnsRouter";
import reactionsRouter from "./server/routes/reactionsRouter";
import commentsRouter from "./server/routes/commentsRouter";

const server = express();

server.use(cors());

server.use(cookieParser());
server.use(bodyParser.json({ limit: "1mb" }));

server.use(loggerMiddleWare);

server.use("/users", userRouter);
server.use("/teams", authenticate, teamsRouter);
server.use("/cards", authenticate, cardsRouter);
server.use("/projects", authenticate, projectsRouter);
server.use("/columns", authenticate, columnsRouter);
server.use("/reactions", authenticate, reactionsRouter);
server.use("/comments", authenticate, commentsRouter);

// createTablesAndFillWithDummyData();

export default server;
