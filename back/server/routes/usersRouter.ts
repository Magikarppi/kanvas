import express, { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { IUpdateUser } from "../../database/utils/interfaces";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    getCurrentTimestamp,
    validateEmail,
} from "../utils/utilities";
import {
    getUserEmailDAO,
    createNewUserDAO,
    getUserDAO,
    deleteUserDAO,
    updatePasswordDAO,
    updateDAO,
} from "../../database/daos/userDao";
import { UserRequest, authenticate } from "../middleware/middleware";

const users = express.Router();
const JWT_SECRET = process.env.SECRET as string;

const createToken = (value: string) =>
    jwt.sign({ value: value.toLowerCase() }, JWT_SECRET, {
        expiresIn: 60000 * 60 * 24,
    });

users.put(
    "/:id",
    authenticate,
    async (request: Request, response: Response) => {
        const id = request.params.id;
        const { first_name, last_name, email } = request.body.user;

        if (!email || !first_name || !last_name) {
            response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
            return;
        }

        if (first_name.length === 0 || last_name.length === 0) {
            response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.FNAME_LNAME_EMPTY);
            return;
        }

        const isEmailFormatValid = validateEmail(email);
        if (isEmailFormatValid === false) {
            response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.INVALID_EMAIL_FORMAT);
            return;
        }

        const user: IUpdateUser = {
            firstName: first_name,
            lastName: last_name,
            email: email,
            phoneNumber: request.body.user.phone_number,
            country: request.body.user.country,
            city: request.body.user.city,
            picture: request.body.user.picture,
            isOnline: true,
            lastOnline: getCurrentTimestamp(),
            isOpenToWork: request.body.user.is_open_to_work,
            linkedinUsername: request.body.user.linkedin_username,
            jobPitch: request.body.user.job_pitch,
        };

        try {
            await updateDAO(id, user);
            response.status(HTTP_RESPONSE_CODES.OK).send();
        } catch (error) {
            console.error(error);
            response
                .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
                .send(RESPONSE_MESSAGES.SERVER_ERROR);
        }
    }
);

users.post("/signup", async (request: Request, response: Response) => {
    const { email, password, first_name, last_name } = request.body;

    if (!email || !password || !first_name || !last_name) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
        return;
    }

    const isEmailFormatValid = validateEmail(email);
    if (isEmailFormatValid === false) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_EMAIL_FORMAT);
        return;
    }

    if (first_name.trim().length < 1 || last_name.trim().length < 1) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.FNAME_LNAME_EMPTY);
        return;
    }

    if (
        email.length > 255 ||
        first_name.length > 255 ||
        last_name.length > 255
    ) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(
                "Email, first name or last name cannot exceed 255 characters"
            );
        return;
    }

    try {
        const existingUser = await getUserEmailDAO(email);
        if (existingUser) {
            response
                .status(HTTP_RESPONSE_CODES.CONFLICT)
                .send(
                    "New account not created - a user with that email already exists"
                );
        } else {
            const hashedPassword = await argon2.hash(password);

            const timestamp = getCurrentTimestamp();

            const newUser = {
                id: uuid(),
                first_name: first_name,
                last_name: last_name,
                email: email,
                password_hash: hashedPassword,
                phone_number: null,
                country: null,
                city: null,
                picture: null,
                account_creation_date: timestamp,
                is_online: false,
                last_online: timestamp,
                is_open_to_work: false,
                linkedin_username: null,
                job_pitch: null,
            };

            await createNewUserDAO(newUser);
            response.status(HTTP_RESPONSE_CODES.OK).send("New user created.");
        }
    } catch (error) {
        console.error(error);
        response
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

users.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email && !password) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
    }

    try {
        const user = await getUserEmailDAO((email as string).toLowerCase());

        if (!user) {
            return res
                .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                .send(RESPONSE_MESSAGES.INVALID_UNAME_PWORD);
        }

        const isPasswordValid = await argon2.verify(
            user.password_hash,
            password
        );

        if (!isPasswordValid) {
            return res
                .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                .send(RESPONSE_MESSAGES.INVALID_UNAME_PWORD);
        }

        const token = createToken(email);

        res.status(HTTP_RESPONSE_CODES.OK).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

users.get("/:id", authenticate, async (req: UserRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { value: requestingUser } = req.user as JwtPayload;

        const userInfo = await getUserDAO(id);

        if (!userInfo) {
            return res
                .status(HTTP_RESPONSE_CODES.NOT_FOUND)
                .send(RESPONSE_MESSAGES.USER_NOT_FOUND);
        }

        if (userInfo.email === requestingUser) {
            return res.status(HTTP_RESPONSE_CODES.OK).json(userInfo);
        } else {
            return res
                .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                .send(RESPONSE_MESSAGES.FORBIDDEN);
        }
    } catch (error) {
        console.error(error);
        return res
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

users.delete("/:id", authenticate, async (req: UserRequest, res: Response) => {
    try {
        const { id } = req.params;
        const user = req.user as JwtPayload;

        const userToDelete = await getUserDAO(id);

        if (!userToDelete) {
            return res
                .status(HTTP_RESPONSE_CODES.NOT_FOUND)
                .send(RESPONSE_MESSAGES.USER_NOT_FOUND);
        }

        if (userToDelete.email === user.value) {
            await deleteUserDAO(id);
            return res.status(HTTP_RESPONSE_CODES.OK).send();
        } else {
            return res
                .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                .send(RESPONSE_MESSAGES.FORBIDDEN);
        }
    } catch (error) {
        console.error(error);
        return res
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

users.put(
    "/:id/password",
    authenticate,
    async (request: UserRequest, response: Response) => {
        const userId = request.params.id;
        const { password } = request.body;

        if (!password) {
            response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
            return;
        }

        try {
            const user = await getUserDAO(userId);

            const userPayLoad = request.user as JwtPayload;
            const isCorrectUser = user?.email === userPayLoad.value;
            if (isCorrectUser) {
                const newHashedPassword = await argon2.hash(password);
                await updatePasswordDAO(userId, newHashedPassword);
                response.status(HTTP_RESPONSE_CODES.NO_CONTENT).send();
            } else {
                response
                    .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                    .send(RESPONSE_MESSAGES.FORBIDDEN);
            }
        } catch (error) {
            response
                .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
                .send(RESPONSE_MESSAGES.SERVER_ERROR);
        }
    }
);

export default users;
