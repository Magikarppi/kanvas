import { executeQuery } from "../database-service";
import {
    getProjectColumns,
} from "../queries/projectColumnsQueries";

export const getProjectColumnsDAO = async (id: string) => {
    const columns = await executeQuery(getProjectColumns, [id]);
    if (columns) {
        return columns.rows;
    }
};