import { Grid } from "@mui/material";

import ProjectTitle from "./ProjectTitle";
import ProjectMembers from "./ProjectMembers";
import { IProject, ProjectMember } from "../../../models/projectModels";

interface Props {
    projectInfo: IProject | undefined;
    projectMembers: ProjectMember[];
    width: number;
}

const ProjectHeader = ({
    projectInfo,
    projectMembers,
    width,
}: Props) => {
    if (!projectInfo) {
        return null;
    }

    return (
        <>
            <Grid
                container
                alignItems="center"
                marginTop="1%"
                sx={{ width: `${width}px` }}
            >
                <Grid
                    item
                    display="flex"
                    alignItems="center"
                    xs={12}
                    sm={6}
                    sx={{
                        paddingLeft: "5%",
                        justifyContent: {
                            xs: "center",
                            sm: "flex-start",
                        },
                    }}
                >
                    <ProjectTitle projectInfo={projectInfo} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    display="flex"
                    paddingRight="1.5%"
                    sx={{
                        justifyContent: {
                            xs: "center",
                            sm: "flex-end",
                        },
                    }}
                >
                    <ProjectMembers projectMembers={projectMembers} />
                </Grid>
            </Grid>
        </>
    );
};

export default ProjectHeader;
