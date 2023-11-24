import { Router, Response } from "express";
import { v4 as uuid } from "uuid";

import { UserRequest } from "../middleware/middleware";
import {
    addProjectDao,
    getProjectMemberDAO,
    getSingleProjectDAO,
} from "../database/daos/projectsDao";
import { IProject } from "../database/utils/interfaces";
import { getCurrentTimestamp } from "../utils/utilities";
import { getUserEmailDAO } from "../database/daos/userDao";
import { JwtPayload } from "jsonwebtoken";
import { dummyGetProjectData } from "../database/utils/dummyData";

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

router.get("/:id", async (req: UserRequest, res: Response) => {
    const projectId = req.params.id;
    const token = req.user as JwtPayload;

    try {
        const existingProject = await getSingleProjectDAO(projectId);
        const existingUser = await getUserEmailDAO(token.value);

        if (!existingProject || !existingUser) {
            res.status(404).send("Project or user not found");
            return;
        }

        if (existingProject.is_public === false) {
            const userId = existingUser.id;
            const projectMember = await getProjectMemberDAO(userId, projectId);

            if (projectMember) {
                const projectData = {
                    ...existingProject,
                    projectColumns: [...dummyGetProjectData.projectColumns],
                    projectMembers: [...dummyGetProjectData.projectMembers],
                    cards: [...dummyGetProjectData.cards],
                };
                res.status(200).json(projectData);
            } else {
                res.status(403).send("You are not authorized to get this project information");
            }

        } else {
            const projectData = {
                ...existingProject,
                projectColumns: [...dummyGetProjectData.projectColumns],
                projectMembers: [...dummyGetProjectData.projectMembers],
                cards: [...dummyGetProjectData.cards],
            };
            res.status(200).send(projectData);
        }
    } catch (error) {
        res.status(500).send("Error retrieving the project");
    }
});

export default router;
