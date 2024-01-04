import {
    Card,
    CardContent,
    Grid,
    Stack,
    Divider,
    Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddProjectModal from "../../components/Projects/AddProjectModal";
import { useEffect, useState } from "react";
import { IProject, IProjectSubmitNew } from "../../models/projectModels";
import projectService from "../../services/projectService";
import { selectToken, selectUser } from "../../redux/hooks";
import { ITeam } from "../../models/teamModels";

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

const cardHeight = "80px";

const createCard = (output: string) => (
    <Card
        elevation={2}
        sx={{
            height: cardHeight,
            pl: "10px",
            pr: "10px",
            border: "1px solid #ffff",
            transition: "0.6s",
            "&:hover": {
                backgroundColor: "secondary.main",
            },
            cursor: "pointer",
        }}
    >
        <CardContent>
            <Typography variant="h6">{output}</Typography>
        </CardContent>
    </Card>
);

// ToDo issue 167: add favorite projects array to this interface and to dashboardData state. Also, move this interface to models folder?
interface IDashboard {
    userProjects: IProject[];
    userTeams: ITeam[];
}

export default function AllProjectsPage() {
    const [dashboardData, setDashboardData] = useState<IDashboard>({
        userProjects: [],
        userTeams: [],
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
                console.error(error);
                // Todo: Set error message
            }
        }
    };

    const AddNewCreateCard = (cardType: string) => (
        <Card
            onClick={cardType === "project" ? openAddProjectModal : () => null}
            elevation={2}
            sx={{
                height: cardHeight,
                pl: "10px",
                pr: "10px",
                border: "1px solid #ffff",
                transition: "0.4s",
                "&:hover": {
                    backgroundColor: "secondary.main",
                },
                cursor: "pointer",
            }}
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
                        {dashboardData?.userProjects?.map((project) => (
                            <Grid key={project.id} item xs={12} sm={6} md={3}>
                                <Link to={`/projects/${project.id}`}>
                                    {createCard(project.name)}
                                </Link>
                            </Grid>
                        ))}
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
                        {dashboardData?.userTeams?.map((team) => (
                            <Grid key={team.id} item xs={12} sm={6} md={3}>
                                <Link to={`/teams/${team.id}`}>
                                    {createCard(team.name)}
                                </Link>
                            </Grid>
                        ))}
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
                        {dummyPublicProjects.map((publicProject) => (
                            <Grid
                                key={publicProject.id}
                                item
                                xs={12}
                                sm={6}
                                md={3}
                            >
                                <Link to={`/projects/${publicProject.id}`}>
                                    {createCard(publicProject.name)}
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
}
