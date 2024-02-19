import {
    Avatar,
    Tooltip,
    Typography,
    IconButton,
    CardActionArea,
    CardMedia,
    Box,
} from "@mui/material";
import Icons from "../Icons/Icons";
import { ChangeEvent, useState } from "react";

interface IProps {
    image: string | null | ArrayBuffer;
    handleSetImage: (
        event:
            | ChangeEvent<HTMLInputElement>
            | React.MouseEvent<HTMLButtonElement>
    ) => void;
}
export default function AddImage({ image, handleSetImage }: IProps) {
    const [hoveringImage, setHoveringImage] = useState(false);

    return (
        <Avatar
            style={{
                height: "100px",
                width: "100px",
                marginTop: "40px",
                marginBottom: "25px",
            }}
            onMouseEnter={() => setHoveringImage(true)}
            onMouseLeave={() => setHoveringImage(false)}
        >
            {hoveringImage && (
                <>
                    <Tooltip
                        title={
                            <Typography sx={{ fontSize: 14 }}>
                                Add Image
                            </Typography>
                        }
                        arrow
                    >
                        <IconButton
                            sx={{
                                width: image ? "50%" : "100%",
                                height: "100%",
                                marginLeft: image ? "0px" : "32px",
                                borderRadius: "0px",
                                borderRight: image ? "1.5px solid white" : "0px",
                                "&:hover": {
                                    backgroundColor: "#5F01FB",
                                },
                            }}
                        >
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
                                <Icons.Delete />
                            </IconButton>
                        </Tooltip>
                    )}
                </>
            )}
            {image ? (
                <CardActionArea>
                    <CardMedia
                        style={{ height: "100px" }}
                        image={typeof image === "string" ? image : ""}
                        component="img"
                    />
                </CardActionArea>
            ) : (
                <Box visibility={hoveringImage ? "hidden" : "visible"}>
                    <Icons.Image size="xx-large" iconColor="white" />
                </Box>
            )}
        </Avatar>
    );
}
