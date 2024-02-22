import { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardMedia,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";

import Icons from "../../Icons/Icons";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { IProject } from "../../../models/projectModels";
import useImage from "../../../hooks/useImage";
import { selectToken } from "../../../redux/hooks";
import projectService from "../../../services/projectService";

interface Props {
    projectInfo: IProject;
}

const ProjectTitle = ({ projectInfo }: Props) => {
    const [hoveringImage, setHoveringImage] = useState<boolean>(false);

    const token = selectToken();
    const { image, handleSetImage } = useImage(projectInfo!.picture);

    useEffect(() => {
        const updateProjectImage = async () => {
            await projectService.updateProjectImage(
                token as string,
                { picture: image },
                projectInfo.id
            );
        };

        if (image !== projectInfo.picture) {
            updateProjectImage();
        }
    }, [image]);

    return (
        <>
            <Grid item>
                <Card
                    style={{
                        height: "120px",
                        width: "120px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 0,
                    }}
                    onMouseEnter={() => setHoveringImage(true)}
                    onMouseLeave={() => setHoveringImage(false)}
                >
                    {hoveringImage && (
                        <>
                            <Tooltip
                                title={
                                    <Typography sx={{ fontSize: "14px" }}>
                                        {image ? "Replace Image" : "Add Image"}
                                    </Typography>
                                }
                                arrow
                            >
                                <IconButton
                                    sx={{
                                        width: image ? "50%" : "100%",
                                        height: "100%",
                                        marginLeft: image ? "0px" : "56px",
                                        borderRadius: "0px",
                                        borderRight: image
                                            ? "2px solid white"
                                            : "0px",
                                        "&:hover": {
                                            backgroundColor: "#5F01FB",
                                        },
                                    }}
                                >
                                    <Icons.Add size="40px" />
                                    <input
                                        type="file"
                                        title=" "
                                        onChange={handleSetImage}
                                        style={{
                                            position: "absolute",
                                            opacity: 0,
                                            cursor: "pointer",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                            {image && (
                                <Tooltip
                                    title={
                                        <Typography sx={{ fontSize: 14 }}>
                                            Delete Image
                                        </Typography>
                                    }
                                    arrow
                                >
                                    <IconButton
                                        onClick={handleSetImage}
                                        sx={{
                                            width: "50%",
                                            height: "100%",
                                            borderRadius: "0px",
                                            "&:hover": {
                                                backgroundColor: "red",
                                            },
                                        }}
                                    >
                                        <Icons.Delete size="32px" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </>
                    )}

                    {image ? (
                        <CardActionArea>
                            <CardMedia
                                image={typeof image === "string" ? image : ""}
                                component="img"
                            />
                        </CardActionArea>
                    ) : (
                        <Box visibility={hoveringImage ? "hidden" : "visible"}>
                            <AddPhotoAlternateIcon
                                sx={{
                                    color: "white",
                                    fontSize: "56px",
                                }}
                            />
                        </Box>
                    )}
                </Card>
            </Grid>
            <Grid item marginLeft="5%">
                <Typography variant="h3">{projectInfo.name}</Typography>
                <Typography variant="h6">{projectInfo.description}</Typography>
            </Grid>
        </>
    );
};

export default ProjectTitle;
