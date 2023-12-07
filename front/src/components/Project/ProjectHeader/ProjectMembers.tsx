import { Avatar, AvatarGroup, Tooltip, Typography } from "@mui/material";

const ProjectMembers = () => {
    return (
        <div>
            <Typography variant="h6" align="right">
                Project members:
            </Typography>

            <AvatarGroup
                sx={{
                    "& .MuiAvatar-root": {
                        width: 30,
                        height: 30,
                    },
                    marginTop: "10px",
                }}
                total={24}
            >
                <Tooltip title="Danny D" arrow>
                    <Avatar
                        alt="Remy Sharp"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdNg8cvJV8ligXGQRhfkVn6-8JmCRo4rwccQ&usqp=CAU"
                    />
                </Tooltip>
                <Tooltip title="Dani B" arrow>
                    <Avatar
                        alt="Travis Howard"
                        src="https://media.cnn.com/api/v1/images/stellar/prod/230117174717-sister-andre-lucile-randon-file-021021.jpg?c=original"
                    />
                </Tooltip>
                <Tooltip title="Agnes W" arrow>
                    <Avatar alt="Agnes Walker" src="" />
                </Tooltip>
                <Tooltip title="Trevor H" arrow>
                    <Avatar
                        alt="Trevor Henderson"
                        src="/static/images/avatar/5.jpg"
                    />
                </Tooltip>
            </AvatarGroup>
        </div>
    );
};

export default ProjectMembers;
