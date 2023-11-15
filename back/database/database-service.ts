import pg from "pg";
import dotenv from "dotenv";
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
    parameters?: Array<unknown>
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
