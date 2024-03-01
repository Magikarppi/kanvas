import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    validateEmail,
} from "../utils/utilities";
import {
    getProjectDAO,
    getProjectMemberDAO,
    getUserByEmailDAO,
} from "../../database/DAOs";
import { IUserFromDB } from "../../database/utils/interfaces";

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

export const validateFavoriteProjectsPostRequest = async (
    request: UserRequest,
    response: Response,
    next: NextFunction
) => {
    try {
        const { projectId } = request.body;

        if (!validateNonEmptyString(projectId)) {
            return response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.INVALID_PROJECT_ID);
        }

        const projectExists = await getProjectDAO(projectId);

        if (!projectExists) {
            return response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.PROJECT_NOT_FOUND);
        }
    } catch (error) {
        return response
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
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
            !validateNonEmptyString(projectId) ||
            !validateNonEmptyString(columnName, 50) ||
            typeof orderIndex !== "number"
        ) {
            return response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
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

export const validateMembers = async (
    request: UserRequest,
    response: Response,
    next: NextFunction
) => {
    try {
        const memberEmails = request.body.members;
        if (Array.isArray(memberEmails)) {
            const users: Array<IUserFromDB | undefined | null> =
                await Promise.all(
                    memberEmails.map(
                        async (email) => await getUserByEmailDAO(email)
                    )
                );
            const filteredUsers: IUserFromDB[] = users.filter(
                (user) => !!user
            ) as IUserFromDB[];
            request.body.members = filteredUsers;
        } else {
            request.body.members = [];
        }
        next();
    } catch (error) {
        return response
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

const validateNonEmptyString = (value: unknown, maxLength: number = 255) =>
    typeof value === "string" &&
    (value as string).trim().length > 0 &&
    (value as string).trim().length < maxLength;
const validateBoolean = (value: unknown) => typeof value === "boolean";
const validateStringArray = (value: unknown) =>
    Array.isArray(value) && value.every((v) => typeof v === "string");

export const validateTeamsPostRequest = (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    const { name, isPublic, emails } = req.body;

    if (!validateNonEmptyString(name, 100)) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_TEAM_NAME);
    }

    if (!validateBoolean(isPublic)) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_IS_PUBLIC);
    }

    if (!validateStringArray(emails)) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_EMAILS_ARRAY);
    }

    next();
};

export const validateTeamsPutRequest = (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    const { name, admin, isPublic } = req.body;

    if (!validateNonEmptyString(name, 100)) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_TEAM_NAME);
    }

    if (!validateBoolean(isPublic)) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_IS_PUBLIC);
    }

    if (!validateNonEmptyString(admin)) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_ADMIN);
    }

    next();
};

export const validateCardsPostRequest = (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    const { title, inColumn, projectId, orderIndex } = req.body;

    if (!validateNonEmptyString(title, 50)) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_CARD_TITLE);
    }

    if (!validateNonEmptyString(inColumn)) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_IN_COLUMN);
    }

    if (!validateNonEmptyString(projectId)) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_PROJECT_ID);
    }

    if (typeof orderIndex !== "number") {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_ORDER_INDEX);
    }

    next();
};

export const validateCardsPutRequest = (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    const { title, creationDate, inColumn, projectId, orderIndex } = req.body;

    if (!validateNonEmptyString(title, 50)) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_CARD_TITLE);
    }

    if (!validateNonEmptyString(creationDate)) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_CREATION_DATE);
    }

    if (!validateNonEmptyString(inColumn)) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_IN_COLUMN);
    }

    if (!validateNonEmptyString(projectId)) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_PROJECT_ID);
    }

    if (typeof orderIndex !== "number") {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_ORDER_INDEX);
    }

    next();
};
