import express, { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { IUpdateUser, IUser } from "../../database/utils/interfaces";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    getCurrentTimestamp,
    validatePasswordFormat,
} from "../utils/utilities";
import {
    getUserEmailDAO,
    createNewUserDAO,
    getUserDAO,
    deleteUserDAO,
    updatePasswordDAO,
    updateDAO,
    checkUserEmailConflictDAO,
} from "../../database/daos/userDao";
import {
    UserRequest,
    authenticate,
    validateEmailAndNames,
} from "../middleware/middleware";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "kanbanprojectbuutti@gmail.com",
    pass: process.env.emailPassword
  },
});
const users = express.Router();
const JWT_SECRET = process.env.SECRET as string;

const createToken = (userId: string) =>
    jwt.sign({ value: userId }, JWT_SECRET, {
        expiresIn: 60000 * 60 * 24,
    });

users.put(
    "/:id",
    authenticate,
    validateEmailAndNames,
    async (request: UserRequest, response: Response) => {
        const id = request.params.id;

        try {
            const userPayLoad = request.user as JwtPayload;
            const tokenUserId = userPayLoad.value;

            if (tokenUserId !== id) {
                response
                    .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                    .send(RESPONSE_MESSAGES.FORBIDDEN);
                return;
            }

            const { email } = request.body;
            const conflictEmailUser = await checkUserEmailConflictDAO(
                id,
                email
            );
            if (conflictEmailUser) {
                response
                    .status(HTTP_RESPONSE_CODES.CONFLICT)
                    .send(
                        "Cannot update: another user with different ID already has this email"
                    );
            } else {
                const user: IUpdateUser = {
                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
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
                await updateDAO(id, user);
                response.status(HTTP_RESPONSE_CODES.OK).send();
            }
        } catch (error) {
            console.error(error);
            response
                .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
                .send(RESPONSE_MESSAGES.SERVER_ERROR);
        }
    }
);
users.put("/forgot-password", async(request: Request, response: Response)  => {
    const newPassword = request.body.newPassword;
    const userId = request.body.userId;
    const hashedPassword = await argon2.hash(newPassword);
    await updatePasswordDAO(userId, hashedPassword);
    response.status(HTTP_RESPONSE_CODES.OK).send();
});

users.post("/forgot-password/", async(request: Request, response: Response)  => {
    const { email } = request.body;
    const emailFetch = await getUserEmailDAO(email);
   
    if( emailFetch ){
        const randomNumber = Math.floor(Math.random() * 10000);
        const formattedNumber = randomNumber.toString().padStart(4, '0');
        await transporter.sendMail({
            from: "kanbanprojectbuutti@gmail.com", 
            to: email,
            subject: "Forgot password for Kanban project", 
            text: "",
            html: "<b>You have forgot your password. Send code: "+formattedNumber+" on screen to change your password</b>",
          });
        response.status(HTTP_RESPONSE_CODES.OK).send(formattedNumber);
    } else {
        response.status(HTTP_RESPONSE_CODES.BAD_REQUEST).send("Email not found");
    }
});

users.post(
    "/signup",
    validateEmailAndNames,
    async (request: Request, response: Response) => {
        try {
            const { email, password, passwordConfirmation } = request.body;

            const isPasswordFormatValid = validatePasswordFormat(password);
            if (!isPasswordFormatValid) {
                response
                    .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                    .send(RESPONSE_MESSAGES.INVALID_PWORD_FORMAT);
                return;
            }

            if (password !== passwordConfirmation) {
                response
                    .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                    .send(RESPONSE_MESSAGES.PASSWORDS_NO_MATCH);
                return;
            }

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
                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
                    email: request.body.email,
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
                response
                    .status(HTTP_RESPONSE_CODES.OK)
                    .send("New user created.");
            }
        } catch (error) {
            console.error(error);
            response
                .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
                .send(RESPONSE_MESSAGES.SERVER_ERROR);
        }
    }
);

users.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email && !password) {
        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
    }

    try {
        const user = await getUserEmailDAO(email);

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

        const token = createToken(user.id);

        const formattedUser: IUser = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
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

        res.status(HTTP_RESPONSE_CODES.OK).json({ token, user: formattedUser });
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
        const { value: tokenUserId } = req.user as JwtPayload;

        if (id !== tokenUserId) {
            res.status(HTTP_RESPONSE_CODES.FORBIDDEN).send(
                RESPONSE_MESSAGES.FORBIDDEN
            );
            return;
        }

        const userInfo = await getUserDAO(id);
        const user: Partial<IUser> = {
            id: userInfo.id,
            firstName: userInfo.first_name,
            lastName: userInfo.last_name,
            email: userInfo.email,
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
        res.status(HTTP_RESPONSE_CODES.OK).json(user);
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
        const { value: tokenUserId } = req.user as JwtPayload;

        if (id !== tokenUserId) {
            res.status(HTTP_RESPONSE_CODES.FORBIDDEN).send(
                RESPONSE_MESSAGES.FORBIDDEN
            );
            return;
        }
        await deleteUserDAO(id);
        return res.status(HTTP_RESPONSE_CODES.OK).send();
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
        const { value: tokenUserId } = request.user as JwtPayload;

        const isCorrectUser = userId === tokenUserId;
        if (!isCorrectUser) {
            response.status(HTTP_RESPONSE_CODES.FORBIDDEN).send(RESPONSE_MESSAGES.FORBIDDEN);
            return;
        }

        const { oldPassword, newPassword, newPasswordConfirmation } =
            request.body;
        if (!oldPassword || !newPassword || !newPasswordConfirmation) {
            response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
            return;
        }

        const isPasswordFormatValid = validatePasswordFormat(newPassword);
        if (!isPasswordFormatValid) {
            response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.INVALID_PWORD_FORMAT);
            return;
        }

        if (newPassword !== newPasswordConfirmation) {
            response
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.PASSWORDS_NO_MATCH);
            return;
        }

        try {
            const user = await getUserDAO(userId);

            const isOldPasswordCorrect = await argon2.verify(
                user.password_hash,
                oldPassword
            );
            if (isOldPasswordCorrect) {
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
            
        } catch (error) {
            response
                .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
                .send(RESPONSE_MESSAGES.SERVER_ERROR);
        }
    }
);

export default users;
