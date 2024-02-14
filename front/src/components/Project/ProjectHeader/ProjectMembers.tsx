import {
    Avatar,
    AvatarGroup,
    Chip,
    Grid,
    Tooltip,
    Typography,
} from "@mui/material";
import { ProjectMember } from "../../../models/projectModels";
import Icons from "../../Icons/Icons";
import { useState } from "react";

const ProjectMembers = ({
    projectMembers,
}: {
    projectMembers: ProjectMember[];
}) => {
    const stringToColor = (string: string) => {
        let hash = 0;

        for (let i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    };

    const stringAvatar = (name: string) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
                color: "white",
            },
            children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
    };

    // ToDo: use this state to open project settings after we have modal
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);

    const handleSettingsClick = () => {
        setSettingsModalOpen(true);
    };

    return (
        <>
            <Grid
                item
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Chip
                    icon={<Icons.Edit size="16px" />}
                    onClick={handleSettingsClick}
                    label="Edit Project"
                    color="secondary"
                    variant="filled"
                    size="medium"
                    sx={{
                        width: "115px",
                        fontSize: "12px",
                        alignSelf: {
                            xs: "center",
                            sm: "flex-end",
                        },
                        padding: "2px",
                        marginTop: {
                            xs: "20px",
                            sm: 0,
                        },
                    }}
                />
                <Typography variant="h6" marginTop="10px">
                    Project members:
                </Typography>
                <AvatarGroup
                    sx={{
                        "& .MuiAvatar-root": {
                            width: 35,
                            height: 35,
                        },
                        marginTop: "10px",
                    }}
                    total={projectMembers.length}
                    max={8}
                >
                    {projectMembers.map((member) => {
                        const fullName = `${member.firstName} ${member.lastName}`;
                        return (
                            <Tooltip
                                key={member.id}
                                title={
                                    <Typography sx={{ fontSize: 13 }}>
                                        {fullName}
                                    </Typography>
                                }
                                arrow
                            >
                                <Avatar
                                    {...stringAvatar(fullName)}
                                    alt={fullName}
                                    src={member.picture as string}
                                >
                                    {`${member.firstName[0]}${member.lastName[0]}`}
                                </Avatar>
                            </Tooltip>
                        );
                    })}
                </AvatarGroup>
            </Grid>
        </>
    );
};

export default ProjectMembers;
