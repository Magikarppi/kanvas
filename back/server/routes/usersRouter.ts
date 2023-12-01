import express, { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { IUpdateUser, IUser } from "../../database/utils/interfaces";
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
        const { firstName, lastName, email } = request.body;

        if (!email || !firstName || !lastName) {
            response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
            return;
        }

        if (firstName.length === 0 || lastName.length === 0) {
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
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: request.body.phoneNumber,
            country: request.body.country,
            city: request.body.city,
            picture: request.body.picture,
            isOnline: true,
            lastOnline: getCurrentTimestamp(),
            isOpenToWork: request.body.isOpenToWork,
            linkedinUsername: request.body.linkedinUsername,
            jobPitch: request.body.jobPitch,
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
    const { email, password, firstName, lastName } = request.body;

    if (!email || !password || !firstName || !lastName) {
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

    if (firstName.trim().length < 1 || lastName.trim().length < 1) {
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

            const newUser: IUser = {
                id: uuid(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                passwordHash: hashedPassword,
                phoneNumber: null,
                country: null,
                city: null,
                picture: null,
                accountCreationDate: timestamp,
                isOnline: false,
                lastOnline: timestamp,
                isOpenToWork: false,
                linkedinUsername: null,
                jobPitch: null,
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

        const formattedUser: IUser = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            passwordHash: user.password_hash,
            phoneNumber: user.phone_number,
            country: user.country,
            city: user.city,
            picture: user.picture_url,
            accountCreationDate: new Date(user.account_created_at),
            isOnline: user.is_online,
            lastOnline: new Date(user.last_online),
            isOpenToWork: user.is_open_to_work,
            linkedinUsername: user.linkedin_username,
            jobPitch: user.job_pitch,
        };

        res.status(HTTP_RESPONSE_CODES.OK).json({ token, formattedUser });
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

        const user: IUser = {
            id: userInfo.id,
            firstName: userInfo.first_name,
            lastName: userInfo.last_name,
            email: userInfo.email,
            passwordHash: userInfo.password_hash,
            phoneNumber: userInfo.phone_number,
            country: userInfo.country,
            city: userInfo.city,
            picture: userInfo.picture_url,
            accountCreationDate: new Date(userInfo.account_created_at),
            isOnline: userInfo.is_online,
            lastOnline: new Date(userInfo.last_online),
            isOpenToWork: userInfo.is_open_to_work,
            linkedinUsername: userInfo.linkedin_username,
            jobPitch: userInfo.job_pitch,
        };

        if (user.email === requestingUser) {
            return res.status(HTTP_RESPONSE_CODES.OK).json(user);
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
        const { oldPassword, newPassword, newPasswordConfirmation } =
            request.body;

        if (!oldPassword || !newPassword || !newPasswordConfirmation) {
            response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
            return;
        }

        if (newPassword !== newPasswordConfirmation) {
            response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(
                    "Password was not updated because the provided passwords do not match"
                );
            return;
        }

        try {
            const user = await getUserDAO(userId);
            const userPayLoad = request.user as JwtPayload;
            const isCorrectUser = user?.email === userPayLoad.value;

            if (isCorrectUser && user) {
                const isOldPasswordValid = await argon2.verify(
                    user.password_hash,
                    oldPassword
                );
                if (isOldPasswordValid) {
                    const newHashedPassword = await argon2.hash(newPassword);
                    await updatePasswordDAO(userId, newHashedPassword);
                    response.status(HTTP_RESPONSE_CODES.NO_CONTENT).send();
                } else {
                    response
                        .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                        .send(
                            "Password was not updated because the old password was incorrect"
                        );
                }
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
