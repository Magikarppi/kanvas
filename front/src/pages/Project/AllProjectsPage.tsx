import {
    Card,
    CardContent,
    Grid,
    Stack,
    Divider,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddProjectModal from "../../components/Projects/AddProjectModal";
import { useState } from "react";

export interface IProject {
    id: string;
    name: string;
    description: string | null;
    isPublic: boolean;
    creationDate: Date;
    endDate: Date | null;
    theme: string;
    picture: string | null;
}

export const dummyProjects: IProject[] = [
    {
        id: "gj9asg-gjsa9ja0gs-jgsagjj9a-gasas9g9g-gagasagas0g0",
        name: "Project A",
        description: "This is Project A, a dummy project.",
        isPublic: true,
        creationDate: new Date("2023-01-01"),
        endDate: new Date("2023-06-30"),
        theme: "Technology",
        picture: "url_to_picture_project_a",
    },
    {
        id: "gj9asg-gjsa9ja0gs-jgsagjj9a-gasas9g9g-gagasagas0g1",
        name: "Project B",
        description: null,
        isPublic: false,
        creationDate: new Date("2023-02-15"),
        endDate: null,
        theme: "Art",
        picture: null,
    },
    {
        id: "gj9asg-gjsa9ja0gs-jgsagjj9a-gasas9g9g-gagasagas0g2",
        name: "Project C",
        description: "Project C is another sample project.",
        isPublic: true,
        creationDate: new Date("2023-03-20"),
        endDate: new Date("2023-12-31"),
        theme: "blank",
        picture: "url_to_picture_project_c",
    },
    {
        id: "gj9asg-gjsa9ja0gs-jgsagjj9a-gasas9g9g-gagasagas0gf",
        name: "Project D",
        description: "Project D description goes here.",
        isPublic: true,
        creationDate: new Date("2023-04-10"),
        endDate: new Date("2024-01-15"),
        theme: "Science",
        picture: "url_to_picture_project_d",
    },
    {
        id: "gj9asg-gjsa9ja0gs-jgsagjj9a-gasas9g9g-gagasagas0gg",
        name: "Project E",
        description: null,
        isPublic: false,
        creationDate: new Date("2023-05-05"),
        endDate: null,
        theme: "dark",
        picture: "url_to_picture_project_e",
    },
    {
        id: "gj9asg-gjsa9ja0gs-jgsagjj9a-gasas9g9g-gagasagas0gl",
        name: "Project F",
        description: "Project F description goes here.",
        isPublic: true,
        creationDate: new Date("2023-06-20"),
        endDate: new Date("2023-12-31"),
        theme: "red",
        picture: null,
    },
    {
        id: "gj9asg-gjsa9ja0gs-jgsagjj9a-gapas9g9g-gagasagas0gf",
        name: "Project D",
        description: "Project D description goes here.",
        isPublic: true,
        creationDate: new Date("2023-04-10"),
        endDate: new Date("2024-01-15"),
        theme: "Science",
        picture: "url_to_picture_project_d",
    },
    {
        id: "gj9asg-gjsa9ja0gs-jgsagjj9a-gasaspg9g-gagasagas0gg",
        name: "Project E",
        description: null,
        isPublic: false,
        creationDate: new Date("2023-05-05"),
        endDate: null,
        theme: "dark",
        picture: "url_to_picture_project_e",
    },
    {
        id: "gj9asg-gjsa9ja0gs-jgsagjj9a-gpsas9g9g-gagasagas0gl",
        name: "Project F",
        description: "Project F description goes here.",
        isPublic: true,
        creationDate: new Date("2023-06-20"),
        endDate: new Date("2023-12-31"),
        theme: "red",
        picture: null,
    },
];

const dummyOrganizations = [
    { id: "j0fsjaj-fj9saja9sfjf9sa-9fsa9s9af", name: "University of potato" },
];

const dummyOpenProjects: IProject[] = [
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

const createCard = (output: string) => (
    <Card
        elevation={2}
        sx={{
            height: "60px",
            pl: "10px",
            pr: "10px",
            border: "1px solid #ffff",
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

export default function AllProjectsPage() {
    const [addProjectModalOpen, setAddProjectModalOpen] =
        useState<boolean>(false);

    const openAddProjectModal = () => setAddProjectModalOpen(true);
    const closeAddProjectModal = () => setAddProjectModalOpen(false);

    const AddNewProjectCard = () => (
        <Card
            onClick={openAddProjectModal}
            elevation={2}
            sx={{
                height: "60px",
                pl: "10px",
                pr: "10px",
                border: "1px solid #ffff",
                "&:hover": {
                    backgroundColor: "secondary.main",
                },
                cursor: "pointer",
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{ color: "primary.main" }}>
                    + Add new project
                </Typography>
            </CardContent>
        </Card>
    );

    return (
        <>
            <AddProjectModal
                open={addProjectModalOpen}
                close={closeAddProjectModal}
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
                            <AddNewProjectCard />
                        </Grid>
                        {dummyProjects.map((project) => (
                            <Grid key={project.id} item xs={12} sm={6} md={3}>
                                <Link to={`/${project.id}`}>
                                    {createCard(project.name)}
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Divider light sx={{ width: "100%" }} />
                <Grid sx={{ width: "100%", pr: 2, pl: 2, mb: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
                        My organizations
                    </Typography>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {dummyOrganizations.map((organization) => (
                            <Grid
                                key={organization.id}
                                item
                                xs={12}
                                sm={6}
                                md={3}
                            >
                                <Link to={`/${organization.id}`}>
                                    {createCard(organization.name)}
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Divider light sx={{ height: "1px", width: "100%" }} />
                <Grid sx={{ width: "100%", pr: 2, pl: 2, mb: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
                        Open projects
                    </Typography>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {dummyOpenProjects.map((project) => (
                            <Grid key={project.id} item xs={12} sm={6} md={3}>
                                <Link to={`/${project.id}`}>
                                    {createCard(project.name)}
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
}
