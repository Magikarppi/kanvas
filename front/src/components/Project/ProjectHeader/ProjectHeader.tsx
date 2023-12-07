import { Grid } from "@mui/material";

import ProjectTitle from "./ProjectTitle";
import ProjectMembers from "./ProjectMembers";

const ProjectHeader = () => {
    return (
        <div style={{ marginTop: "20px" }}>
            <Grid container spacing={1}>
                <Grid item xs={0.5} />
                <Grid item xs={11} sm={5.5}>
                    <ProjectTitle />
                </Grid>
                <Grid item xs={0.5} display={{ xs: "visible", sm: "none" }} />
                <Grid item xs={0.5} display={{ xs: "visible", sm: "none" }} />
                <Grid item xs={11} sm={5.5}>
                    <ProjectMembers />
                </Grid>
                <Grid item xs={0.5} />
            </Grid>
        </div>
    );
};

export default ProjectHeader;
