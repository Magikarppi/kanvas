import { Router, Response } from "express";
import { v4 as uuid } from "uuid";

import { UserRequest } from "../middleware/middleware";
import {
    addProjectDao,
    getProjectMemberDAO,
    getSingleProjectDAO,
    getUserProjects,
    getUserFavoriteProjects,
    getUserTeams,
    deleteProjectDaO,
    updateProjectDAO,
} from "../../database/daos/projectsDao";
import { IProject } from "../../database/utils/interfaces";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    getCurrentTimestamp,
} from "../utils/utilities";
import { getUserDAO } from "../../database/daos/userDao";
import { JwtPayload } from "jsonwebtoken";
import { dummyGetProjectData } from "../../database/utils/dummyData";
import {
    getProjectAdminDAO,
} from "../../database/daos/rolesDao";

const router = Router();

router.post("/", async (req: UserRequest, res: Response) => {
    try {
        const { name, description, picture, endDate, theme, isPublic } =
            req.body;

        if (!name || isPublic === undefined) {
            return res
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
        }

        if (name.length > 50) {
            return res
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send("Name should not exceed 50 characters");
        } else if (description?.length > 500) {
            return res
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send("Project description should not exceed 500 characters");
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

        if (!addedProject) {
            return res
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send("Adding new project failed");
        }

        const formattedProject: IProject = {
            id: addedProject.id,
            name: addedProject.name,
            description: addedProject.description,
            isPublic: addedProject.is_public,
            creationDate: addedProject.project_creation_date,
            endDate: addedProject.project_end_date,
            theme: addedProject.theme,
            picture: addedProject.picture_url,
        };

        return res.status(HTTP_RESPONSE_CODES.CREATED).json(formattedProject);
    } catch (error) {
        console.error(error);
        return res
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

router.delete("/:id", async (req: UserRequest, res: Response) => {
    try {
        const projectId = req.params.id;
        const { value: userId } = req.user as JwtPayload;

        const projectAdmin = await getProjectAdminDAO(userId, projectId);
        if (!projectAdmin) {
            res.status(HTTP_RESPONSE_CODES.FORBIDDEN).send(
                RESPONSE_MESSAGES.FORBIDDEN
            );
            return;
        }
        await deleteProjectDaO(projectId);
        res.status(HTTP_RESPONSE_CODES.OK).send();
    } catch (error) {
        console.error(error);
        return res
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

router.get("/:id", async (req: UserRequest, res: Response) => {
    const projectId = req.params.id;
    const { value: userId } = req.user as JwtPayload;

    try {
        const existingProject = await getSingleProjectDAO(projectId);
        if (!existingProject) {
            res.status(HTTP_RESPONSE_CODES.NOT_FOUND).send(
                "Project or user not found"
            );
            return;
        }

        const formattedProject: IProject = {
            id: existingProject.id,
            name: existingProject.name,
            description: existingProject.description,
            isPublic: existingProject.is_public,
            creationDate: existingProject.project_creation_date,
            endDate: existingProject.project_end_date,
            theme: existingProject.theme,
            picture: existingProject.picture_url,
        };

        if (formattedProject.isPublic === false) {
            const projectMember = await getProjectMemberDAO(userId, projectId);

            if (projectMember) {
                const projectData = {
                    ...formattedProject,
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
                ...formattedProject,
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
        const user = await getUserDAO(userId);
        if (user) {
            try {
                const userAllProjects = await getUserProjects(userId);
                const userFavoriteProjects = await getUserFavoriteProjects(
                    userId
                );
                const userTeams = await getUserTeams(userId);
                const userProjectsData = {
                    allProjects: userAllProjects,
                    favoriteProjects: userFavoriteProjects,
                    teams: userTeams,
                };
                return res
                    .status(HTTP_RESPONSE_CODES.OK)
                    .json(userProjectsData);
            } catch (error) {
                res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
                    RESPONSE_MESSAGES.SERVER_ERROR
                );
            }
        } else {
            res.status(HTTP_RESPONSE_CODES.NOT_FOUND).send(
                RESPONSE_MESSAGES.USER_NOT_FOUND
            );
        }
    } catch (error) {
        res.status(HTTP_RESPONSE_CODES.NOT_FOUND).send(
            RESPONSE_MESSAGES.USER_NOT_FOUND
        );
    }
});

router.put("/:id", async (req: UserRequest, res: Response) => {
    try {
        const {
            name,
            description,
            isPublic,
            creationDate,
            endDate,
            theme,
            picture,
        } = req.body;
        
        const { value: userId } = req.user as JwtPayload;
        const projectId = req.params.id;

        const projectAdmin = await getProjectAdminDAO(userId, projectId);
        if (!projectAdmin) {
            res.status(HTTP_RESPONSE_CODES.FORBIDDEN).send(
                RESPONSE_MESSAGES.FORBIDDEN
            );
            return;
        }

        const project = await getSingleProjectDAO(projectId);

        if (!project) {
            return res
                .status(HTTP_RESPONSE_CODES.NOT_FOUND)
                .send(RESPONSE_MESSAGES.PROJECT_NOT_FOUND);
        }

        const updatedProject: IProject = {
            id: project.id,
            name: name || project.name,
            description:
                description !== undefined ? description : project.description,
            isPublic: isPublic !== undefined ? isPublic : project.is_public,
            creationDate:
                creationDate !== undefined
                    ? creationDate
                    : project.project_creation_date,
            endDate: endDate !== undefined ? endDate : project.project_end_date,
            theme: theme !== undefined ? theme : project.theme,
            picture: picture !== undefined ? picture : project.picture,
        };

        await updateProjectDAO(projectId, updatedProject);

        res.status(HTTP_RESPONSE_CODES.OK).send();
    } catch (error) {
        console.log(error);
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

export default router;
