import {
    Avatar,
    Tooltip,
    Typography,
    IconButton,
    CardActionArea,
    CardMedia,
    Box,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ChangeEvent, useState } from "react";
import Icons from "../Icons/Icons";

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
                                {image ? "Replace Image" : "Add Image"}
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
                                borderRight: image
                                    ? "1.5px solid white"
                                    : "0px",
                                "&:hover": {
                                    backgroundColor: "#5F01FB",
                                },
                            }}
                        >
                            <Icons.Add size="42px" />
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
                        style={{ height: "100px" }}
                        image={typeof image === "string" ? image : ""}
                        component="img"
                    />
                </CardActionArea>
            ) : (
                <Box visibility={hoveringImage ? "hidden" : "visible"}>
                    <AddPhotoAlternateIcon
                        sx={{
                            color: "white",
                            fontSize: "xx-large",
                        }}
                    />
                </Box>
            )}
        </Avatar>
    );
}
