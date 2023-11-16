import express, { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import argon2 from "argon2";
import { getCurrentTimestamp } from "../utils/utilities";

const users = express.Router();

users.post("/signup", async (request: Request, response: Response) => {
    const { email, password, first_name, last_name } = request.body;
    const lowerCaseEmail = email.toLowerCase();

    const existingUser = await getUserByEmail(lowerCaseEmail);

    if (existingUser.rows.length !== 0) response.status(409).send();
    else {
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
                last_online: null,
                is_open_to_work: false,
                linkedin_username: null,
                job_pitch: null,
            };

            await createNewUser(newUser);

        } catch(error) {
            console.error(error);
            response.status(500).send();
        }
    }
});

export default users;