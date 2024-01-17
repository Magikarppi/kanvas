import { Router, Response } from "express";
import { v4 as uuid } from "uuid";

import { UserRequest } from "../middleware/middleware";
import {
    insertProjectDAO,
    getProjectMemberDAO,
    getProjectDAO,
    getUserProjectsDAO,
    getUserFavoriteProjectsDAO,
    deleteProjectDAO,
    updateProjectDAO,
    getProjectAdminDAO,
    removeUserRoleDAO,
    getUserTeamsDAO,
    getUserByIdDAO,
    getProjectMembersDAO,
    deleteFavoriteProjectDAO,
    insertProjectFavoriteProjectsDAO,
    getPublicProjectsDAO,
} from "../../database/DAOs";
import {
    IFavoriteProject,
    IFavoriteProjectDB,
    IProject,
    IProjectColumn,
    IProjectDB,
    IProjectMember,
    ITeamDB,
    IUserRole,
} from "../../database/utils/interfaces";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    formatFavoriteProject,
    formatProject,
    formatTeam,
    getCurrentTimestamp,
} from "../utils/utilities";
import { JwtPayload } from "jsonwebtoken";
import { getProjectColumnsDAO } from "../../database/DAOs/projectColumnsDAOS";
import { getProjectCardsDAO } from "../../database/DAOs";

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

        const { value: userId } = req.user as JwtPayload;
        const projectMember: IProjectMember = {
            id: uuid(),
            userId: userId,
            projectId: project.id,
        };

        const userRole: IUserRole = {
            projectId: project.id,
            userId: userId,
            role: "admin",
        };

        const placeholderColumns: IProjectColumn[] = [
            {
                id: uuid(),
                projectId: project.id,
                columnName: "To Do",
                orderIndex: 0,
            },
            {
                id: uuid(),
                projectId: project.id,
                columnName: "In Progress",
                orderIndex: 1,
            },
            {
                id: uuid(),
                projectId: project.id,
                columnName: "Done",
                orderIndex: 2,
            },
        ];

        const addedProject: IProjectDB = await insertProjectDAO(
            project,
            projectMember,
            userRole,
            placeholderColumns
        );
        if (!addedProject) {
            return res
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send("Adding new project failed");
        }

        const formattedProject: IProject = formatProject(addedProject);

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
        await removeUserRoleDAO(userId, projectId); // for testing the endpoint, TODO: remove this call after we have altered database's delete behaviors
        await deleteProjectDAO(projectId);
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
        const existingProject: IProjectDB = await getProjectDAO(projectId);
        if (!existingProject) {
            res.status(HTTP_RESPONSE_CODES.NOT_FOUND).send(
                "Project or user not found"
            );
            return;
        }

        const formattedProject: IProject = formatProject(existingProject);

        if (formattedProject.isPublic === false) {
            const projectMember = await getProjectMemberDAO(userId, projectId);
            const existingProjectColumns = await getProjectColumnsDAO(
                projectId
            );
            const existingProjectCards = await getProjectCardsDAO(projectId);
            const projectMembers = await getProjectMembersDAO(projectId);

            if (projectMember) {
                const projectData = {
                    ...formattedProject,
                    projectColumns: existingProjectColumns,
                    projectMembers: projectMembers,
                    cards: existingProjectCards,
                };
                res.status(HTTP_RESPONSE_CODES.OK).json(projectData);
            } else {
                res.status(HTTP_RESPONSE_CODES.FORBIDDEN).send(
                    RESPONSE_MESSAGES.FORBIDDEN
                );
            }
        } else {
            const existingProjectColumns = await getProjectColumnsDAO(
                projectId
            );
            const existingProjectCards = await getProjectCardsDAO(projectId);
            const projectMembers = await getProjectMembersDAO(projectId);
            const projectData = {
                ...formattedProject,
                projectColumns: existingProjectColumns,
                projectMembers: projectMembers,
                cards: existingProjectCards,
            };
            res.status(HTTP_RESPONSE_CODES.OK).send(projectData);
        }
    } catch (error) {
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

router.get("/dashboard/:id", async (req: UserRequest, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await getUserByIdDAO(userId);
        if (user) {
            try {
                const userAllProjects: IProjectDB[] | undefined =
                    await getUserProjectsDAO(userId);
                const userFavoriteProjects: IFavoriteProjectDB[] | undefined =
                    await getUserFavoriteProjectsDAO(userId);
                const userTeams: ITeamDB[] | undefined = await getUserTeamsDAO(
                    userId
                );
                const publicProjects: IProjectDB[] | undefined =
                    await getPublicProjectsDAO(true);

                const dashboardData = {
                    allProjects:
                        userAllProjects?.map((project) =>
                            formatProject(project)
                        ) || [],
                    favoriteProjects:
                        userFavoriteProjects?.map((favProject) =>
                            formatFavoriteProject(favProject)
                        ) || [],
                    teams: userTeams?.map((team) => formatTeam(team)) || [],
                    publicProjects:
                        publicProjects?.map((publicProject) =>
                            formatProject(publicProject)
                        ) || [],
                };

                return res.status(HTTP_RESPONSE_CODES.OK).json(dashboardData);
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

        const project: IProjectDB = await getProjectDAO(projectId);

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

router.delete(
    "/favorite-projects/:id",
    async (req: UserRequest, res: Response) => {
        try {
            const { value: userId } = req.user as JwtPayload;
            const favoriteProjectId = req.params.id;
            const userFavoriteProjects = await getUserFavoriteProjectsDAO(
                userId
            );
            const userFavoriteProjectsIds = userFavoriteProjects?.map(
                (val) => val.favorite_project_id
            );
            const found = userFavoriteProjectsIds?.includes(favoriteProjectId);
            if (!found) {
                return res
                    .status(HTTP_RESPONSE_CODES.NOT_FOUND)
                    .send("Favorite project not found");
            } else {
                await deleteFavoriteProjectDAO(favoriteProjectId);
                res.status(HTTP_RESPONSE_CODES.OK).send(
                    "Favorite project deleted"
                );
            }
        } catch (error) {
            console.error(error);
            return res
                .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
                .send(RESPONSE_MESSAGES.SERVER_ERROR);
        }
    }
);

router.post("/favorite-projects", async (req: UserRequest, res: Response) => {
    try {
        const { projectId } = req.body;
        const { value: userId } = req.user as JwtPayload;
        const userFavoriteProjects = await getUserFavoriteProjectsDAO(userId);
        const userFavoriteProjectsIds = userFavoriteProjects?.map(
            (val) => val.id
        );
        const found = userFavoriteProjectsIds?.includes(projectId);

        if (!found) {
            const favoriteProject: IProjectMember = {
                id: uuid(),
                projectId: projectId,
                userId: userId,
            };
            await insertProjectFavoriteProjectsDAO(favoriteProject);
            const project = await getProjectDAO(projectId);

            if (project) {
                const favoriteProjectReturnObj: IFavoriteProject = {
                    ...formatProject(project),
                    favoriteProjectId: favoriteProject.id,
                };
                return res
                    .status(HTTP_RESPONSE_CODES.CREATED)
                    .json(favoriteProjectReturnObj);
            }
        } else {
            return res
                .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
                .send("Project is already in favorite projects");
        }
    } catch (error) {
        console.error(error);
        return res
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

export default router;
