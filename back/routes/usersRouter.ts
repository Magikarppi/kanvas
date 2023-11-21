import express, { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { IUser } from "../database/interfaces";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCurrentTimestamp } from "../utils/utilities";
import {
    getUserEmailDAO,
    createNewUserDAO,
    updatePasswordDAO,
    getUserDAO,
    updateDAO
} from "../database/userDao";
import { UserRequest, authenticate } from "../middleware/middleware";

const users = express.Router();
const JWT_SECRET = process.env.SECRET as string;

const createToken = (value: string) =>
    jwt.sign({ value: value.toLowerCase() }, JWT_SECRET, {
        expiresIn: 60000 * 60 * 24,
    });

users.put("/:id", authenticate, async (request: Request, response: Response) => {
    const id = request.params.id;
    const user:IUser = request.body.user;
    await updateDAO(id, user);
    response.status(200);
});

users.post("/signup", async (request: Request, response: Response) => {
    const { email, password, first_name, last_name } = request.body;

    if (!email || !password || !first_name || !last_name) {
        response
            .status(400)
            .send(
                "Email, password, first name or last name missing from the request"
            );
        return;
    }

    const lowerCaseEmail = email.toLowerCase();

    const validateEmailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (validateEmailRegEx.test(lowerCaseEmail) === false) {
        response.status(400).send("Invalid email address format");
        return;
    }

    if (first_name.trim().length < 1 || last_name.trim().length < 1) {
        response.status(400).send("First or last name cannot be empty");
        return;
    }

    if (
        lowerCaseEmail.length > 255 ||
        first_name.length > 255 ||
        last_name.length > 255
    ) {
        response
            .status(400)
            .send(
                "Email, first name or last name cannot exceed 255 characters"
            );
        return;
    }

    const existingUser = await getUserEmailDAO(lowerCaseEmail);
    if (existingUser) {
        response
            .status(409)
            .send(
                "New account not created - a user with that email already exists"
            );
    } else {
        try {
            const hashedPassword = await argon2.hash(password);

            const timestamp = getCurrentTimestamp();

            const newUser = {
                id: uuid(),
                first_name: first_name,
                last_name: last_name,
                email: lowerCaseEmail,
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
            response.status(200).send("New user created.");
        } catch (error) {
            console.error(error);
            response
                .status(500)
                .send(
                    "There was an error for storing user data in the database"
                );
        }
    }
});

users.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email && !password) {
        return res.status(400).send("Invalid request body");
    }

    try {
        const user = await getUserEmailDAO((email as string).toLowerCase());

        if (!user) {
            return res.status(401).send("Invalid username or password");
        }

        const isPasswordValid = await argon2.verify(
            user.password_hash,
            password
        );

        if (!isPasswordValid) {
            return res.status(401).send("Invalid username or password");
        }

        const token = createToken(email);

        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).send("There was an error with logging in");
    }
});

users.put(
    "/:id/password",
    authenticate,
    async (request: UserRequest, response: Response) => {
        const userId = request.params.id;
        const { password } = request.body;

        if (!password) {
            response.status(400).send("Password missing from the request");
            return;
        }

        try {
            const user = await getUserDAO(userId);

            const userPayLoad = request.user as JwtPayload;
            const isCorrectUser = user?.email === userPayLoad.value;
            if (isCorrectUser) {
                const newHashedPassword = await argon2.hash(password);
                await updatePasswordDAO(userId, newHashedPassword);
                response.status(204).send();
            } else {
                response.status(401).send("Unauthorized: invalid user");
            }
        } catch (error) {
            response
                .status(500)
                .send("There was an error updating the password");
        }
    }
);

export default users;
