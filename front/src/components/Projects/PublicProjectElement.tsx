import { Grid, Box, InputLabel, Tooltip } from "@mui/material";
import CustomCheckbox from "../Inputs/CustomCheckbox";
import Icons from "../Icons/Icons";

interface IProps {
    handleChange:
        | ((event: React.ChangeEvent<HTMLInputElement>, value: boolean) => void)
        | undefined;
    isPublic: boolean;
}

export default function PublicProjectElement({
    handleChange,
    isPublic,
}: IProps) {
    return (
        <>
            <Grid item xs={12}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <InputLabel>Public project</InputLabel>
                    <Tooltip
                        title={
                            <p
                                style={{
                                    fontSize: "1rem",
                                }}
                            >
                                Public projects can be found using search
                            </p>
                        }
                        placement="top"
                    >
                        <Icons.Info />
                    </Tooltip>
                </Box>
            </Grid>
            <Grid item display="flex" justifyContent="flex start" xs={12}>
                <CustomCheckbox
                    handleChange={handleChange}
                    name="isPublic"
                    value={isPublic}
                    label="This project can be viewed by everyone"
                    dataCy="project-is-public-checkbox"
                />
            </Grid>
        </>
    );
}
