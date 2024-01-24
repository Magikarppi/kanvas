import { Response, Router } from "express";
import { v4 as uuid } from "uuid";

import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    formatProjectColumn,
} from "../utils/utilities";
import {
    deleteProjectColumnDAO,
    insertProjectColumnDAO,
    updateProjectColumnDAO,
} from "../../database/DAOs";
import { UserRequest } from "../middleware/middleware";
import { IProjectColumnDB } from "../../database/utils/interfaces";

const router = Router();

router.post("/", async (req: UserRequest, res: Response) => {
    const { projectId, columnName, orderIndex } = req.body;

    try {
        const insertedProjectColumn = await insertProjectColumnDAO(
            uuid(),
            projectId,
            columnName,
            Number(orderIndex)
        );

        if (!insertedProjectColumn) {
            return res
                .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
                .send(RESPONSE_MESSAGES.SERVER_ERROR);
        }

        return res
            .status(HTTP_RESPONSE_CODES.OK)
            .json(formatProjectColumn(insertedProjectColumn));
    } catch (error) {
        console.error(error);
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

router.put("/:columnId", async (req: UserRequest, res: Response) => {
    const { projectId, columnName, orderIndex } = req.body;
    const { columnId } = req.params;
    try {
        const updatedColumns = await updateProjectColumnDAO(
            columnId,
            projectId,
            columnName,
            Number(orderIndex)
        );

        if (!updatedColumns) {
            return res
                .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
                .send(RESPONSE_MESSAGES.SERVER_ERROR);
        }

        const formattedColumns = (updatedColumns as IProjectColumnDB[]).map(
            (column) => formatProjectColumn(column)
        );

        return res.status(HTTP_RESPONSE_CODES.OK).json(formattedColumns);
    } catch (error) {
        console.error(error);
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

router.delete("/:columnId", async (req: UserRequest, res: Response) => {
    const { projectId, orderIndex } = req.body;
    const { columnId } = req.params;

    try {
        const updatedColumns = await deleteProjectColumnDAO(
            columnId,
            projectId,
            Number(orderIndex)
        );

        if (!updatedColumns) {
            return res
                .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
                .send(RESPONSE_MESSAGES.SERVER_ERROR);
        }

        const formattedColumns = (updatedColumns as IProjectColumnDB[]).map(
            (column) => formatProjectColumn(column)
        );

        return res.status(HTTP_RESPONSE_CODES.OK).json(formattedColumns);
    } catch (error) {
        console.error(error);
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

export default router;
