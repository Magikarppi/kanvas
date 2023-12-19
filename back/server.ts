import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./server/routes/usersRouter";
//import { createTablesAndFillWithDummyData } from "./database/database-service";
import teamsRouter from "./server/routes/teamsRouter";
import projectsRouter from "./server/routes/projectsRouter";
import { authenticate, loggerMiddleWare } from "./server/middleware/middleware";
import cardsRouter from "./server/routes/cardsRouter";
//import { alterTableDeleteBehavior } from "./database/database-service";

const server = express();

server.use(cors());

server.use(express.json());
server.use(cookieParser());

server.use(loggerMiddleWare);

server.use("/users", userRouter);
server.use("/teams", authenticate, teamsRouter);
server.use("/cards", authenticate, cardsRouter);
server.use("/projects", authenticate, projectsRouter);

//createTablesAndFillWithDummyData(); Ota tämä käyttöön jos tietokantasi on tyhjä

//alterTableDeleteBehavior(); // Kommentoi tämä pois ja aja kerran, jos databasesi delete-käyttäytyminen ei ole vielä muuttunut 

export default server;
