import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface UserRequest extends Request {
    user: string | JwtPayload;
}

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const auth = req.get("Authorization") as string;

    if (!auth?.startsWith("Bearer ")) {
        return res.status(401).send("Invalid token");
    }

    const token = auth.substring(7);
    const secret = process.env.SECRET as string;

    try {
        const decodedToken = jwt.verify(token, secret);
        (req as UserRequest).user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).send("Invalid token");
    }
};
