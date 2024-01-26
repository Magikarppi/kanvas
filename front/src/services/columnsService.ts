import { IProjectColumn } from "../models/projectModels";
import { createClient } from "../utils/axiosUtils";

const columnsService = {
    addColumn: async (
        token: string,
        columnInfo: Omit<IProjectColumn, "id">
    ) => {
        const client = createClient(token);
        const response = await client.post("/columns/", columnInfo);
        if (response) {
            return response.data;
        }
    },

    editColumn: async (token: string, columnInfo: IProjectColumn) => {
        const client = createClient(token);
        const response = await client.put(
            `/columns/${columnInfo.id}`,
            columnInfo
        );
        if (response) {
            return response.data;
        }
    },
};

export default columnsService;