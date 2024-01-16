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

const dummyPublicProjects: IProject[] = [
    {
        id: "gj9adg-gjsa9ja0gs-jgsagjj9a-gasas9g9g-gagasagas0gl",
        name: "Langguage moddel",
        description: "Project F description goes here.",
        isPublic: true,
        creationDate: new Date("2023-06-20"),
        endDate: new Date("2023-12-31"),
        theme: "red",
        picture: null,
    },
    {
        id: "gj9aag-gjsa9ja0gs-jgsagjj9a-gapas9g9g-gagasagas0gf",
        name: "Build a stone fortress",
        description: "Project D description goes here.",
        isPublic: true,
        creationDate: new Date("2023-04-10"),
        endDate: new Date("2024-01-15"),
        theme: "Science",
        picture: "url_to_picture_project_d",
    },
    {
        id: "gj9aqg-gjsa9ja0gs-jgsagjj9a-gasaspg9g-gagasagas0gg",
        name: "Hack into Kim Jong's laptop",
        description: null,
        isPublic: false,
        creationDate: new Date("2023-05-05"),
        endDate: null,
        theme: "dark",
        picture: "url_to_picture_project_e",
    },
    {
        id: "gj9aeg-gjsa9ja0gs-jgsagjj9a-gpsas9g9g-gagasagas0gl",
        name: "Space shuttle program",
        description: "Project F description goes here.",
        isPublic: true,
        creationDate: new Date("2023-06-20"),
        endDate: new Date("2023-12-31"),
        theme: "red",
        picture: null,
    },
];

const createCard = (
    input: IProject | ITeam,
    toggleFavorite: ((id: string) => void) | null,
    linkTo: string,
    isFavorite?: boolean
) => {
    return (
        <Card elevation={2} sx={{ position: "relative" }}>
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
}

export default function AllProjectsPage() {
    const [dashboardData, setDashboardData] = useState<IDashboard>({
        userProjects: [],
        userTeams: [],
        favoriteProjects: [],
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

                if (addedProject) {
                    setDashboardData({
                        ...dashboardData,
                        userProjects: [
                            ...dashboardData.userProjects,
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
        >
            <CardContent>
                <Typography variant="h6" sx={{ color: "primary.main" }}>
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
        dummyPublicProjects.map((publicProject) => (
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
