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

const ProjectTitle = () => {
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
        <Grid container>
            <Grid item xs={12} sm={6.5} md={4} lg={2.5} xl={1.8}>
                <Card
                    style={{
                        height: "100px",
                        width: "100px",
                        margin: "5px 20px 0 0",
                        textAlign: "center",
                    }}
                    onMouseEnter={() => setHoveringImage(true)}
                    onMouseLeave={() => setHoveringImage(false)}
                >
                    {hoveringImage ? (
                        <Tooltip title="Edit image" arrow>
                            <IconButton style={{ top: "33.6px" }}>
                                <Icons.Add />
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
            <Grid
                item
                xs={12}
                sm={6.5}
                md={8}
                lg={9.5}
                xl={10.2}
                marginTop={{ xs: "20px", sm: "5px" }}
            >
                <Typography variant="h3">Project</Typography>
                <Typography variant="h6">Project sub title</Typography>
            </Grid>
        </Grid>
    );
};

export default ProjectTitle;
