import { Router, Response } from "express";
import { v4 as uuid } from "uuid";

import { UserRequest } from "../middleware/middleware";
import { addProjectDao } from "../database/daos/projectsDao";
import { IProject } from "../database/utils/interfaces";
import { getCurrentTimestamp } from "../utils/utilities";

const router = Router();

router.post("/", async (req: UserRequest, res: Response) => {
    try {
        const { name, description, picture, endDate, theme, isPublic } =
            req.body;

        if (!name || !isPublic) {
            return res.status(400).send("Invalid request body");
        }

        const project: IProject = {
            id: uuid(),
            description,
            creationDate: getCurrentTimestamp(),
            endDate,
            theme: theme || "blank",
            name,
            picture,
            isPublic,
        };

        const addedProject = await addProjectDao({ ...project });

        if (addedProject) {
            return res.status(201).json(addedProject);
        }

        return res.status(400).send("Adding new project failed");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

export default router;
