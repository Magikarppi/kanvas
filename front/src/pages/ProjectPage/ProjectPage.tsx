import { Divider } from "@mui/material";
import ProjectHeader from "../../components/Project/ProjectHeader/ProjectHeader";
import ProjectToolbar from "../../components/Project/ProjectToolbar/ProjectToolbar";
import DragNDropProvider from "../../components/Kanban/DragNDropProvider";
import Board from "../../components/Kanban/Board/Board";

import data from "../../utils/DNDDummyData";

const ProjectPage = () => {
    return (
        <div>
            <ProjectHeader />
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
