import { Router, Response } from "express";
import { v4 as uuid } from "uuid";

import {
    UserRequest,
    validateFavoriteProjectsPostRequest,
    validateMembers,
} from "../middleware/middleware";
import {
    insertProjectDAO,
    getProjectMemberDAO,
    getProjectDAO,
    getUserProjectsDAO,
    getUserFavoriteProjectsDAO,
    deleteProjectDAO,
    updateProjectDAO,
    getProjectAdminDAO,
    getUserTeamsDAO,
    getUserByIdDAO,
    getProjectMembersDAO,
    deleteFavoriteProjectDAO,
    insertProjectFavoriteProjectsDAO,
    getPublicProjectsDAO,
    getProjectCardsDAO,
    getProjectColumnsDAO,
} from "../../database/DAOs";
import {
    ICard,
    IFavoriteProject,
    IFavoriteProjectDB,
    IProject,
    IProjectColumn,
    IProjectColumnDB,
    IProjectDB,
    IProjectMember,
    IProjectMemberDB,
    ITeamDB,
    IUserFromDB,
    IUserRole,
    ProjectMember,
} from "../../database/utils/interfaces";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    formatFavoriteProject,
    formatProject,
    formatProjectCards,
    formatProjectColumns,
    formatProjectMembers,
    formatTeam,
    getCurrentTimestamp,
} from "../utils/utilities";
import { JwtPayload } from "jsonwebtoken";
import { deleteImageBlob, uploadImageBlob } from "../services/azureServices";

const router = Router();

const createProjectMember = (
    userId: string,
    projectId: string
): IProjectMember => ({
    id: uuid(),
    userId,
    projectId,
});

const handleProjectImageUpload = async (
    projectId: string,
    projectPicture: string | null | undefined
) => {
    const currentProject = await getProjectDAO(projectId);

    if (
        projectPicture === undefined ||
        projectPicture === currentProject.picture
    ) {
        return currentProject.picture;
    }

    if (projectPicture === null) {
        // Deleting Project Picture
        const imageUrl = currentProject.picture;

        const parts = imageUrl.split("/");

        // Last part is string including blobName and queryParams
        const lastPart = parts[parts.length - 1];

        // Split by query parameter character and select the first element, i.e. blob name ending with .jpeg
        const blobName = lastPart.split("?")[0];

        await deleteImageBlob(blobName);
        return null;
    }

    // Uploading new project pic to Azure
    const metaData = projectPicture.substring(
        projectPicture.indexOf(":") + 1,
        projectPicture.indexOf(";")
    );
    const base64ImageData = projectPicture.split(",")[1];
    const imageName = `project-image-project-${projectId}.${
        metaData.split("/")[1]
    }`;

    const imageUrl = await uploadImageBlob(
        imageName,
        base64ImageData,
        metaData
    );

    if (!imageUrl) {
        console.error("Failed to save profile picture");
        throw Error();
    } else {
        return imageUrl;
    }
};

router.post("/", validateMembers, async (req: UserRequest, res: Response) => {
    try {
        const {
            name,
            description,
            picture,
            endDate,
            theme,
            isPublic,
            members,
        } = req.body;

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

        const projectOwner: IProjectMember = {
            id: uuid(),
            userId: userId,
            projectId: project.id,
        };

        const projectMembers: IProjectMember[] = (members as IUserFromDB[])
            .map((member) => createProjectMember(member.id, project.id))
            .concat([projectOwner]);

        const projectOwnerRole: IUserRole = {
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
            projectMembers,
            projectOwnerRole,
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
        await deleteProjectDAO(projectId);
        res.status(HTTP_RESPONSE_CODES.OK).send("Project deleted");
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

            const existingProjectColumns: IProjectColumnDB[] | undefined =
                await getProjectColumnsDAO(projectId);
            const formattedColumns: IProjectColumn[] =
                formatProjectColumns(existingProjectColumns) || [];

            const existingProjectCards = await getProjectCardsDAO(projectId);
            const formattedCards: ICard[] =
                formatProjectCards(existingProjectCards) || [];

            const projectMembers = await getProjectMembersDAO(projectId);
            const formattedMembers: ProjectMember[] =
                formatProjectMembers(projectMembers) || [];

            if (projectMember) {
                const projectData = {
                    project: formattedProject,
                    projectColumns: formattedColumns,
                    projectMembers: formattedMembers,
                    cards: formattedCards,
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
            const formattedColumns: IProjectColumn[] =
                formatProjectColumns(existingProjectColumns) || [];

            const existingProjectCards = await getProjectCardsDAO(projectId);
            const formattedCards: ICard[] =
                formatProjectCards(existingProjectCards) || [];

            const projectMembers = await getProjectMembersDAO(projectId);
            const formattedMembers: ProjectMember[] =
                formatProjectMembers(projectMembers) || [];

            const projectData = {
                project: formattedProject,
                projectColumns: formattedColumns,
                projectMembers: formattedMembers,
                cards: formattedCards,
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

router.put("/:id", validateMembers, async (req: UserRequest, res: Response) => {
    try {
        const {
            name,
            description,
            isPublic,
            creationDate,
            endDate,
            theme,
            picture,
            members,
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

        const projectMembers: IProjectMember[] = (members as IUserFromDB[])
            .map((member) => createProjectMember(member.id, project.id))
            .filter((member) => member.userId !== userId);

        const projectPicture = await handleProjectImageUpload(
            projectId,
            picture
        );

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
            picture: projectPicture,
        };

        await updateProjectDAO(
            projectId,
            updatedProject,
            projectMembers,
            userId
        );

        const updatedProjectMembers: IProjectMemberDB[] | undefined =
            await getProjectMembersDAO(projectId);

        if (!updatedProjectMembers) {
            throw new Error();
        }

        res.status(HTTP_RESPONSE_CODES.OK).json({
            projectMembers: formatProjectMembers(updatedProjectMembers),
        });
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

router.post(
    "/favorite-projects",
    validateFavoriteProjectsPostRequest,
    async (req: UserRequest, res: Response) => {
        try {
            const { projectId } = req.body;
            const { value: userId } = req.user as JwtPayload;
            const userFavoriteProjects = await getUserFavoriteProjectsDAO(
                userId
            );
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
    }
);

export default router;
