import { useState, ChangeEvent } from "react";
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
import { IProject } from "../../../models/projectModels";

const ProjectTitle = ({ projectInfo }: { projectInfo: IProject }) => {
    const [image, setImage] = useState<string | ArrayBuffer | null>("");
    const [hoveringImage, setHoveringImage] = useState<boolean>(true);

    const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (event.target.files && event.target.files[0]) {
            const isJpeg = event.target.files[0].type.slice(-4) === "jpeg";
            const isPng = event.target.files[0].type.slice(-3) === "png";

            if (isJpeg || isPng) {
                reader.addEventListener("load", () => {
                    setImage(reader.result);
                });
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    };

    return (
        <>
            <Grid item>
                <Card
                    style={{
                        height: "115px",
                        width: "115px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 0,
                    }}
                    onMouseEnter={() => setHoveringImage(true)}
                    onMouseLeave={() => setHoveringImage(false)}
                >
                    {hoveringImage ? (
                        <Tooltip
                            title={<Typography>Edit image</Typography>}
                            arrow
                        >
                            <IconButton>
                                <Icons.Add size="54px" />
                                <input
                                    type="file"
                                    onChange={handleSetImage}
                                    style={{
                                        position: "absolute",
                                        opacity: 0,
                                        cursor: "pointer",
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <CardActionArea>
                            {typeof image === "string" && image.length > 0 ? (
                                <CardMedia
                                    style={{ height: "100px" }}
                                    image={image}
                                    component="img"
                                />
                            ) : (
                                <Box />
                            )}
                        </CardActionArea>
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
