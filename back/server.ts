import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createTablesAndFillWithDummyData } from "./database/database-service";

const server = express();

server.use(cors());

server.use(express.json());
server.use(cookieParser());

createTablesAndFillWithDummyData();

export default server;
