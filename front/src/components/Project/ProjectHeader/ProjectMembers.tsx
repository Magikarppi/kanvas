import { Avatar, AvatarGroup, Tooltip, Typography } from "@mui/material";
import { ProjectMember } from "../../../models/projectModels";

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

    return (
        <>
            <Typography variant="h6" align="right">
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
        </>
    );
};

export default ProjectMembers;
