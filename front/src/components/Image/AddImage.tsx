import {
    Avatar,
    Tooltip,
    Typography,
    IconButton,
    CardActionArea,
    CardMedia,
} from "@mui/material";
import Icons from "../Icons/Icons";
import { ChangeEvent, useState } from "react";

interface IProps {
    image: string | null | ArrayBuffer;
    handleSetImage: (event: ChangeEvent<HTMLInputElement>) => void;
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
            {hoveringImage ? (
                <Tooltip
                    title={
                        <Typography sx={{ fontSize: 14 }}>
                            Edit image
                        </Typography>
                    }
                    arrow
                >
                    <IconButton>
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
            ) : image ? (
                <CardActionArea>
                    <CardMedia
                        style={{ height: "100px" }}
                        image={typeof image === "string" ? image : ""}
                        component="img"
                    />
                </CardActionArea>
            ) : (
                <Icons.Image size="xx-large" iconColor="white" />
            )}
        </Avatar>
    );
}
