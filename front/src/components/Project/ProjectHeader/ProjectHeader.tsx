import { Grid } from "@mui/material";

import ProjectTitle from "./ProjectTitle";
import ProjectMembers from "./ProjectMembers";
import { IProject, ProjectMember } from "../../../models/projectModels";

const ProjectHeader = ({
    projectInfo,
    projectMembers,
}: {
    projectInfo: IProject;
    projectMembers: ProjectMember[];
}) => {
    return (
        <div style={{ marginTop: "20px" }}>
            <Grid container spacing={1}>
                <Grid item xs={0.5} />
                <Grid item xs={11} sm={5.5}>
                    <ProjectTitle projectInfo={projectInfo} />
                </Grid>
                <Grid item xs={0.5} display={{ xs: "visible", sm: "none" }} />
                <Grid item xs={0.5} display={{ xs: "visible", sm: "none" }} />
                <Grid item xs={11} sm={5.5}>
                    <ProjectMembers projectMembers={projectMembers} />
                </Grid>
                <Grid item xs={0.5} />
            </Grid>
        </div>
    );
};

export default ProjectHeader;
