import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Divider } from "@mui/material";
import { toast } from "react-toastify";

import ProjectHeader from "../../components/Project/ProjectHeader/ProjectHeader";
import ProjectToolbar from "../../components/Project/ProjectToolbar/ProjectToolbar";
import DragNDropProvider from "../../components/Kanban/DragNDropProvider";
import Board from "../../components/Kanban/Board/Board";

import projectService from "../../services/projectService";
import { selectToken } from "../../redux/hooks";
import {
    IProject,
    IProjectColumn,
    ProjectMember,
} from "../../models/projectModels";
import { ICard } from "../../models/cardModels";

import data from "../../utils/DNDDummyData";
import { AxiosError } from "axios";

interface IProjectData {
    project: IProject;
    projectColumns: IProjectColumn[];
    projectMembers: ProjectMember[];
    cards: ICard[];
}

const ProjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = selectToken() as string;

    const [loading, setLoading] = useState(true);
    const [projectData, setProjectData] = useState<IProjectData>({
        project: {} as IProject,
        projectColumns: [],
        projectMembers: [],
        cards: [],
    });

    useEffect(() => {
        const fetchProject = async () => {
            if (token) {
                try {
                    const projectData = await projectService.getProjectById(
                        token,
                        id as string
                    );
                    setLoading(false);
                    setProjectData({
                        project: projectData.project,
                        projectColumns: [...projectData.projectColumns],
                        projectMembers: [...projectData.projectMembers],
                        cards: [...projectData.cards],
                    });
                } catch (error) {
                    if(error instanceof AxiosError) {
                        toast.error(error?.response?.data);
                        navigate("/dashboard");
                    }
                }
            } else {
                navigate("/sign-in");
                toast.error("Please sign in to access this page");
            }
        };
        fetchProject();
    }, [id]);

    return loading === true ? null : (
        <div>
            <ProjectHeader
                projectInfo={projectData.project}
                projectMembers={projectData.projectMembers}
            />
            <Divider style={{ marginTop: "20px" }} />
            <ProjectToolbar />
            <Divider style={{ marginBottom: "20px" }} />
            <DragNDropProvider data={data.columns}>
                <Board />
            </DragNDropProvider>
        </div>
    );
};

export default ProjectPage;
