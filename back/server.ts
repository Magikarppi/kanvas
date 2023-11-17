import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/usersRouter";
import { createTablesAndFillWithDummyData } from "./database/database-service";

const server = express();

server.use(cors());

server.use(express.json());
server.use(cookieParser());

server.use("/users", userRouter);
createTablesAndFillWithDummyData();

export default server;
