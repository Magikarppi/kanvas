import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/usersRouter";

const server = express();

server.use(cors());

server.use(express.json());
server.use(cookieParser());

server.use("/users", userRouter);

export default server;
