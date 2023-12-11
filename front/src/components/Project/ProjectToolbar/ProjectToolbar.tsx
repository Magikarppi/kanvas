import { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";

import ProjectSearchBar from "./ProjectSearchBar";
import Icons from "../../Icons/Icons";

const ProjectToolbar = () => {
    const [activeSearch, setActiveSearch] = useState<boolean>(false);

    return (
        <Grid container spacing={1} style={{ padding: "5px 0 5px 0" }}>
            <Grid item xs={0.5} />
            <Grid item xs={3}>
                <IconButton>
                    <Icons.Grid />
                </IconButton>
                <Typography variant="caption">Grid</Typography>
                <IconButton>
                    <Icons.List />
                </IconButton>
                <Typography variant="caption">List</Typography>
            </Grid>
            <Grid item xs={7.5} style={{ textAlign: "right" }}>
                {activeSearch ? (
                    <ProjectSearchBar setActiveSearch={setActiveSearch} />
                ) : (
                    <>
                        <IconButton
                            onClick={() => setActiveSearch(!activeSearch)}
                        >
                            <Icons.Search />
                        </IconButton>
                        <Typography variant="caption">Search</Typography>
                    </>
                )}
                <IconButton>
                    <Icons.Settings />
                </IconButton>
                <Typography variant="caption">Settings</Typography>
            </Grid>
            <Grid item xs={0.5} />
        </Grid>
    );
};

export default ProjectToolbar;
