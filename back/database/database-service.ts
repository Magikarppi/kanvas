import pg from "pg";
import dotenv from "dotenv";
import { createNewUserDAO } from "./userDao";
import { dummyUsers } from "./dummyData";
dotenv.config();

const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE } = process.env;

const pool = new pg.Pool({
    host: PG_HOST,
    port: Number(PG_PORT),
    user: PG_USERNAME,
    password: String(PG_PASSWORD),
    database: PG_DATABASE,
});

export const executeQuery = async (
    query: string,
    parameters?: (string | boolean | Date | null | undefined)[]
) => {
    const client = await pool.connect();
    try {
        const result = await client.query(query, parameters);
        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.stack);
            error.name = "dbError";
            throw error;
        }
    } finally {
        client.release();
    }
};

const createTables = async () => {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS "users" (
            "id" uuid PRIMARY KEY,
            "first_name" varchar NOT NULL,
            "last_name" varchar NOT NULL,
            "email" varchar NOT NULL,
            "password_hash" varchar(255) NOT NULL,
            "phone_number" varchar(20),
            "country" varchar(100),
            "city" varchar(100),
            "picture" text,
            "account_creation_date" timestamp NOT NULL,
            "is_online" boolean NOT NULL,
            "last_online" timestamp,
            "is_open_to_work" boolean,
            "linkedin_username" varchar(29),
            "job_pitch" varchar(500)
        );
        
        CREATE TABLE IF NOT EXISTS "projects" (
            "id" uuid PRIMARY KEY,
            "name" varchar(50) NOT NULL,
            "description" varchar(500),
            "is_public" boolean NOT NULL,
            "project_creation_date" timestamp NOT NULL,
            "project_end_date" timestamp,
            "theme" varchar(50) DEFAULT 'blank',
            "picture" text
        );
        
        CREATE TABLE IF NOT EXISTS "roles" (
            "project_id" uuid NOT NULL REFERENCES "projects" ("id"),
            "user_id" uuid NOT NULL REFERENCES "users" ("id"),
            "role" varchar(25) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS "favorite_projects" (
            "id" uuid PRIMARY KEY,
            "project_id" uuid NOT NULL REFERENCES "projects" ("id"),
            "user_id" uuid NOT NULL REFERENCES "users" ("id")
        );
        
        CREATE TABLE IF NOT EXISTS "project_columns" (
            "id" uuid PRIMARY KEY,
            "project_id" uuid NOT NULL REFERENCES "projects" ("id"),
            "column_name" varchar(50) NOT NULL,
            "order_index" int NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS "project_members" (
            "id" uuid PRIMARY KEY,
            "user_id" uuid NOT NULL REFERENCES "users" ("id"),
            "project_id" uuid NOT NULL REFERENCES "projects" ("id")
        );
        
        CREATE TABLE IF NOT EXISTS "cards" (
            "id" uuid PRIMARY KEY,
            "project_id" uuid NOT NULL REFERENCES "projects" ("id"),
            "title" varchar(50) NOT NULL,
            "sub_title" varchar,
            "description" text,
            "status" varchar,
            "creation_date" timestamp NOT NULL,
            "due_date" timestamp,
            "attachments" text,
            "in_column" uuid NOT NULL REFERENCES "project_columns" ("id")
        );
        
        CREATE TABLE IF NOT EXISTS "keywords" (
            "id" uuid PRIMARY KEY,
            "keyword" varchar(100) NOT NULL,
            "color" varchar(10)
        );
    
        CREATE TABLE IF NOT EXISTS "project_keywords" (
            "keyword_id" uuid NOT NULL REFERENCES "keywords" ("id"),
            "project_id" uuid NOT NULL REFERENCES "projects" ("id")
        );
        
        CREATE TABLE IF NOT EXISTS "card_keywords" (
            "keyword_id" uuid NOT NULL REFERENCES "keywords" ("id"),
            "card_id" uuid NOT NULL REFERENCES "cards" ("id")
        );
        
        
        CREATE TABLE IF NOT EXISTS "card_responsible_persons" (
            "id" uuid PRIMARY KEY,
            "user_id" uuid NOT NULL REFERENCES "users" ("id"),
            "card_id" uuid NOT NULL REFERENCES "cards" ("id")
        );
        
        CREATE TABLE IF NOT EXISTS "card_comments" (
            "id" uuid PRIMARY KEY,
            "card_id" uuid NOT NULL REFERENCES "cards" ("id"),
            "author" uuid NOT NULL REFERENCES "users" ("id"),
            "comment_text" varchar NOT NULL,
            "time_added" timestamp NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS "reactions" (
            "id" uuid PRIMARY KEY,
            "user_id" uuid NOT NULL REFERENCES "users" ("id"),
            "card_comment" uuid NOT NULL REFERENCES "card_comments" ("id"),
            "emoji" varchar(255) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS "teams" (
            "id" uuid PRIMARY KEY,
            "name" varchar(100) NOT NULL,
            "admin" uuid NOT NULL REFERENCES "users" ("id"),
            "is_public" boolean NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS "team_projects" (
            "id" uuid PRIMARY KEY,
            "team_id" uuid NOT NULL REFERENCES "teams" ("id"),
            "project_id" uuid NOT NULL REFERENCES "projects" ("id")
        );
        
        CREATE TABLE IF NOT EXISTS "user_teams" (
            "id" uuid PRIMARY KEY,
            "user_id" uuid NOT NULL REFERENCES "users" ("id"),
            "team_id" uuid NOT NULL REFERENCES "teams" ("id")
        );
        `;

        await executeQuery(query);

        console.log("Tables created successfully");
    } catch (error) {
        console.error(error);
    }
};

const fillTablesWithDummyData = async () => {
    try {
        for (const user of dummyUsers) {
            await createNewUserDAO(user);
        }
        console.log("Dummy data added successfully");
    } catch (error) {
        console.error(error);
    }
};

export const createTablesAndFillWithDummyData = async () => {
    try {
        await createTables();
        await fillTablesWithDummyData();
    } catch (error) {
        console.error(error);
    }
};
