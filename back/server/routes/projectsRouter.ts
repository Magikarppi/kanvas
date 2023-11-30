import { Router, Response} from "express";
import { v4 as uuid } from "uuid";

import { UserRequest } from "../middleware/middleware";
import {
    addProjectDao,
    getProjectMemberDAO,
    getSingleProjectDAO,
    getUserProjects,
    getUserFavoriteProjects,
    getUserTeams,
} from "../../database/daos/projectsDao";
import { IProject } from "../../database/utils/interfaces";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    getCurrentTimestamp,
} from "../utils/utilities";
import { getUserEmailDAO } from "../../database/daos/userDao";
import { JwtPayload } from "jsonwebtoken";
import { dummyGetProjectData } from "../../database/utils/dummyData";

const router = Router();

router.post("/", async (req: UserRequest, res: Response) => {
    try {
        const { name, description, picture, endDate, theme, isPublic } =
            req.body;

        if (!name || !isPublic) {
            return res
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
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
            return res.status(HTTP_RESPONSE_CODES.CREATED).json(addedProject);
        }

        return res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send("Adding new project failed");
    } catch (error) {
        console.error(error);
        return res
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

router.get("/:id", async (req: UserRequest, res: Response) => {
    const projectId = req.params.id;
    const token = req.user as JwtPayload;

    try {
        const existingProject = await getSingleProjectDAO(projectId);
        const existingUser = await getUserEmailDAO(token.value);

        if (!existingProject || !existingUser) {
            res.status(HTTP_RESPONSE_CODES.NOT_FOUND).send(
                "Project or user not found"
            );
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
                res.status(HTTP_RESPONSE_CODES.OK).json(projectData);
            } else {
                res.status(HTTP_RESPONSE_CODES.FORBIDDEN).send(
                    RESPONSE_MESSAGES.FORBIDDEN
                );
            }
        } else {
            const projectData = {
                ...existingProject,
                projectColumns: [...dummyGetProjectData.projectColumns],
                projectMembers: [...dummyGetProjectData.projectMembers],
                cards: [...dummyGetProjectData.cards],
            };
            res.status(HTTP_RESPONSE_CODES.OK).send(projectData);
        }
    } catch (error) {
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

router.get("/userprojects/:id", async (req: UserRequest, res: Response) => {
    const userId = req.params.id;
    try {
        const userAllProjects = await getUserProjects(userId);
        const userFavoriteProjects = await getUserFavoriteProjects(userId);
        const userTeams = await getUserTeams(userId);
        const userProjectsData = {
            allProjects:userAllProjects,
            favoriteProjects: userFavoriteProjects,
            teams: userTeams,
        };
        return res.status(200).json(userProjectsData);
        
    }
    catch (error) {
        res.status(500).send("Error retrieving the projects or teams");
    }
});

export default router;
