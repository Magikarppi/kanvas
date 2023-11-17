import express, { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { getCurrentTimestamp } from "../utils/utilities";
import { getUserEmailDAO, createNewUserDAO } from "../database/userDao";

const users = express.Router();

users.post("/signup", async (request: Request, response: Response) => {
    const { email, password, first_name, last_name } = request.body;

    if (!email || !password || !first_name || !last_name) {
        response.status(400).send("Email, password, first name or last name missing from the request");
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

    if (lowerCaseEmail.length > 255 || first_name.length > 255 || last_name.length > 255) {
        response.status(400).send("Email, first name or last name cannot exceed 255 characters");
        return;
    }

    const existingUser = await getUserEmailDAO(lowerCaseEmail);
    if (existingUser) {
        response.status(409).send("New account not created - a user with that email already exists");
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
            response.status(200).send("New user created.");
        } catch (error) {
            console.error(error);
            response.status(500).send("There was an error for storing user data in the database");
        }
    }
});

export default users;
