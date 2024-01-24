import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    validateEmail,
} from "../utils/utilities";
import { getProjectMemberDAO } from "../../database/DAOs";

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

    const requestBodyCopy = JSON.parse(JSON.stringify(request.body));
    const requestBodyKeys = Object.keys(requestBodyCopy);

    if (requestBodyKeys.length !== 0) {
        const requestBodyPasswordsObscured: { [key: string]: string } = {};

        for (const key of requestBodyKeys) {
            const includesPassword = key.toLowerCase().includes("password");
            requestBodyPasswordsObscured[key] = includesPassword
                ? "**********"
                : request.body[key];
        }

        console.log(
            `Body:\n${JSON.stringify(requestBodyPasswordsObscured, null, 2)}`
        );
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

export const validateColumnRequest = async (
    request: UserRequest,
    response: Response,
    next: NextFunction
) => {
    try {
        const { value: userId } = request.user as JwtPayload;
        const { projectId, columnName, orderIndex } = request.body;

        if (
            !projectId ||
            !columnName ||
            orderIndex === undefined ||
            orderIndex === null
        ) {
            return response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
        }

        if ((columnName as string).length > 50) {
            return response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send("Max length for columnName is 50 characters");
        }

        const isMemberOfProject = await getProjectMemberDAO(userId, projectId);

        if (!isMemberOfProject) {
            return response
                .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                .send(RESPONSE_MESSAGES.FORBIDDEN);
        }
        next();
    } catch (error) {
        return response
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
};
