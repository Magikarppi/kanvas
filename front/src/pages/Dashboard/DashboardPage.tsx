import {
    Card,
    CardContent,
    Grid,
    Stack,
    Divider,
    Typography,
    CardHeader,
    IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddProjectModal from "../../components/Projects/AddProjectModal";
import { useEffect, useState } from "react";
import {
    IFavoriteProject,
    IProject,
    IProjectSubmitNew,
} from "../../models/projectModels";
import projectService from "../../services/projectService";
import { selectToken, selectUser } from "../../redux/hooks";
import { ITeam } from "../../models/teamModels";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const createCard = (
    input: IProject | ITeam,
    toggleFavorite: ((id: string) => void) | null,
    linkTo: string,
    isFavorite?: boolean
) => {
    return (
        <Card
            elevation={2}
            sx={{
                position: "relative",
                transition: "0.6s",
                "&:hover": {
                    backgroundColor: "secondary.main",
                },
            }}
        >
            <CardHeader
                action={
                    !toggleFavorite ? (
                        <IconButton disabled />
                    ) : isFavorite ? (
                        <IconButton
                            sx={{ position: "absolute", top: 0, right: 0 }}
                            onClick={() => toggleFavorite(input.id)}
                        >
                            <Favorite />
                        </IconButton>
                    ) : (
                        <IconButton
                            sx={{ position: "absolute", top: 0, right: 0 }}
                            onClick={() => toggleFavorite(input.id)}
                        >
                            <FavoriteBorder />
                        </IconButton>
                    )
                }
            />
            <Link to={linkTo}>
                <CardContent sx={{ padding: 0 }}>
                    <Typography variant="h6">
                        {truncateString(input.name)}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
};

const truncateString = (string: string) => {
    if (string.length > 40) {
        return `${string.substring(0, 37)}...`;
    } else {
        return string;
    }
};

interface IDashboard {
    userProjects: IProject[];
    userTeams: ITeam[];
    favoriteProjects: IFavoriteProject[];
    publicProjects: IProject[];
}

export default function AllProjectsPage() {
    const [dashboardData, setDashboardData] = useState<IDashboard>({
        userProjects: [],
        userTeams: [],
        favoriteProjects: [],
        publicProjects: [],
    });

    const [addProjectModalOpen, setAddProjectModalOpen] =
        useState<boolean>(false);

    const token = selectToken();
    const user = selectUser();

    const navigate = useNavigate();

    useEffect(() => {
        if (token && user) {
            projectService
                .getUsersProjects(token, user.id)
                .then((data) => {
                    setDashboardData({
                        userProjects: [...data.allProjects],
                        userTeams: [...data.teams],
                        favoriteProjects: [...data.favoriteProjects],
                        publicProjects: [...data.publicProjects],
                    });
                })
                .catch((err) => console.error(err));
        } else {
            navigate("/");
        }
    }, [token, user]);

    const openAddProjectModal = () => setAddProjectModalOpen(true);
    const closeAddProjectModal = () => setAddProjectModalOpen(false);

    const handleAddProject = async (project: IProjectSubmitNew) => {
        if (token) {
            try {
                const addedProject = await projectService.createNewProject(
                    token,
                    project
                );

                if (addedProject && !addedProject.isPublic) {
                    setDashboardData({
                        ...dashboardData,
                        userProjects: [
                            ...dashboardData.userProjects,
                            addedProject,
                        ],
                    });
                } else if (addedProject && addedProject.isPublic) {
                    setDashboardData({
                        ...dashboardData,
                        userProjects: [
                            ...dashboardData.userProjects,
                            addedProject,
                        ],
                        publicProjects: [
                            ...dashboardData.publicProjects,
                            addedProject,
                        ],
                    });
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data);
                }
            }
        }
    };

    const AddNewCreateCard = (cardType: string) => (
        <Card
            onClick={cardType === "project" ? openAddProjectModal : () => null}
            elevation={2}
            sx={{ backgroundColor: "#2e490d" }}
        >
            <CardContent>
                <Typography variant="h6">
                    {cardType === "project"
                        ? "+ Create a new project"
                        : "+ Create a new team"}
                </Typography>
            </CardContent>
        </Card>
    );

    const handleToggleFavorite = async (id: string) => {
        if (token) {
            const favoriteProjectIdForProject =
                dashboardData.favoriteProjects.find(
                    (fp) => fp.id === id
                )?.favoriteProjectId;
            try {
                if (favoriteProjectIdForProject) {
                    await projectService.deleteFavoriteProject(
                        token,
                        favoriteProjectIdForProject
                    );
                    setDashboardData((prevData) => ({
                        ...prevData,
                        favoriteProjects: prevData.favoriteProjects.filter(
                            (fp) => fp.id !== id
                        ),
                    }));
                } else {
                    const addedFavoriteProject =
                        (await projectService.addFavoriteProject(
                            token,
                            id
                        )) as IFavoriteProject;
                    setDashboardData((prevData) => ({
                        ...prevData,
                        favoriteProjects: [
                            ...prevData.favoriteProjects,
                            addedFavoriteProject,
                        ],
                    }));
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data);
                }
            }
        }
    };

    const isProjectFavorite = (projectId: string) =>
        dashboardData.favoriteProjects.some(
            (fp: IFavoriteProject) => fp.id === projectId
        );

    const renderFavoriteProjects = () =>
        dashboardData.favoriteProjects.length === 0 ? (
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6">
                    No favorite projects. To add a project to your favorites,
                    simply click the heart icon on a project card.
                </Typography>
            </Grid>
        ) : (
            dashboardData.favoriteProjects.map((project) => {
                return (
                    <Grid key={project.id} item xs={12} sm={6} md={3}>
                        {createCard(
                            project,
                            handleToggleFavorite,
                            `/projects/${project.id}`,
                            true
                        )}
                    </Grid>
                );
            })
        );

    const renderUserProjects = () =>
        dashboardData?.userProjects?.map((project) => (
            <Grid key={project.id} item xs={12} sm={6} md={3}>
                {createCard(
                    project,
                    handleToggleFavorite,
                    `/projects/${project.id}`,
                    isProjectFavorite(project.id)
                )}
            </Grid>
        ));

    const renderUserTeams = () =>
        dashboardData?.userTeams?.map((team) => (
            <Grid key={team.id} item xs={12} sm={6} md={3}>
                {createCard(team, null, `/teams/${team.id}`)}
            </Grid>
        ));

    const renderPublicProjects = () =>
        dashboardData?.publicProjects?.map((publicProject) => (
            <Grid key={publicProject.id} item xs={12} sm={6} md={3}>
                {createCard(
                    publicProject,
                    handleToggleFavorite,
                    `/projects/${publicProject.id}`,
                    isProjectFavorite(publicProject.id)
                )}
            </Grid>
        ));

    return !token ? null : (
        <>
            <AddProjectModal
                open={addProjectModalOpen}
                close={closeAddProjectModal}
                handleAddProject={handleAddProject}
            />
            <Stack sx={{ minHeight: "90vh" }}>
                <Grid sx={{ width: "100%", pr: 2, pl: 2, mb: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
                        My favorite projects
                    </Typography>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {renderFavoriteProjects()}
                    </Grid>
                </Grid>
                <Divider light sx={{ width: "100%" }} />
                <Grid sx={{ width: "100%", pr: 2, pl: 2, mb: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
                        My projects
                    </Typography>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item xs={12} sm={6} md={3}>
                            {AddNewCreateCard("project")}
                        </Grid>
                        {renderUserProjects()}
                    </Grid>
                </Grid>
                <Divider light sx={{ width: "100%" }} />
                <Grid sx={{ width: "100%", pr: 2, pl: 2, mb: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
                        My teams
                    </Typography>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item xs={12} sm={6} md={3}>
                            {AddNewCreateCard("team")}
                        </Grid>
                        {renderUserTeams()}
                    </Grid>
                </Grid>
                <Divider light sx={{ height: "1px", width: "100%" }} />
                <Grid sx={{ width: "100%", pr: 2, pl: 2, mb: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
                        Public projects
                    </Typography>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {renderPublicProjects()}
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
}
