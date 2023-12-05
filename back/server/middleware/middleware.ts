import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    validateEmail,
} from "../utils/utilities";

dotenv.config();

export interface UserRequest extends Request {
    user?: string | JwtPayload;
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

export const loggerMiddleWare = (
    request: Request,
    _: Response,
    next: NextFunction
) => {
    const date = new Date();
    console.log(
        `Request was made: ${date.getDate()}.${
            date.getMonth() + 1
        }.${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}:${date.getSeconds()}`
    );

    console.log("Method: " + request.method);
    console.log("Url: " + request.originalUrl);

    const requestBody = request.body;
    if (Object.keys(requestBody).length !== 0) {
        console.log(`Body:\n${JSON.stringify(requestBody, null, 2)}`);
    }
    next();
};

export const validateEmailAndNames = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { firstName, lastName, email } = request.body;

    if (!email || !firstName || !lastName) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
        return;
    }

    if (firstName.trim().length === 0 || lastName.trim().length === 0) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.FNAME_LNAME_EMPTY);
        return;
    }

    if (email.length > 255 || firstName.length > 255 || lastName.length > 255) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(
                "Email, first name or last name cannot exceed 255 characters"
            );
        return;
    }

    const isEmailFormatValid = validateEmail(email);
    if (isEmailFormatValid === false) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_EMAIL_FORMAT);
        return;
    }
    next();
};
