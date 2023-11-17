import express, { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { getCurrentTimestamp } from "../utils/utilities";
import { getUserEmailDAO, createNewUserDAO } from "../database/userDao";

const users = express.Router();

users.post("/signup", async (request: Request, response: Response) => {
    const { email, password, first_name, last_name } = request.body;
    const lowerCaseEmail = email.toLowerCase();

    // RegEx checks if email is of correct format
    const validateEmailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (validateEmailRegEx.test(lowerCaseEmail) === false) {
        response.status(400).send();
        return;
    }

    if (first_name.trim().length < 1 || last_name.trim().length < 1) {
        response.status(400).send();
        return;
    }

    const existingUser = await getUserEmailDAO(lowerCaseEmail);
    if (existingUser) {
        response.status(409).send();
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

            createNewUserDAO(newUser);
            response.status(200).send();
        } catch (error) {
            console.error(error);
            response.status(500).send();
        }
    }
});

export default users;
