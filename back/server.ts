import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./server/routes/usersRouter";
// import { createTablesAndFillWithDummyData } from "./database/database-service";
import teamsRouter from "./server/routes/teamsRouter";
import projectsRouter from "./server/routes/projectsRouter";
import {
    authenticate,
    loggerMiddleWare,
    validateColumnRequest,
} from "./server/middleware/middleware";
import cardsRouter from "./server/routes/cardsRouter";
import columnsRouter from "./server/routes/columnsRouter";
import reactionsRouter from "./server/routes/reactionsRouter";
import commentsRouter from "./server/routes/commentsRouter";
// import { alterTableDeleteBehavior } from "./database/database-service";

const server = express();

server.use(cors());

server.use(cookieParser());
server.use(bodyParser.json({ limit: "1mb" }));

server.use(loggerMiddleWare);

server.use("/users", userRouter);
server.use("/teams", authenticate, teamsRouter);
server.use("/cards", authenticate, cardsRouter);
server.use("/projects", authenticate, projectsRouter);
server.use("/columns", authenticate, validateColumnRequest, columnsRouter);
server.use("/reactions", authenticate, reactionsRouter);
server.use("/comments", authenticate, commentsRouter);

// createTablesAndFillWithDummyData();

// alterTableDeleteBehavior(); // Kommentoi tämä pois ja aja kerran, jos databasesi delete-käyttäytyminen ei ole vielä muuttunut

export default server;
