import {
    Button,
    Card,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

import projectService from "../../services/projectService";
import { TProject } from "../../models/projectModels";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "60%",
    border: "2px solid #5e00ff",
    boxShadow: 24,
    p: 4,
};

type TisPublic = "public" | "not-public";

interface Props {
    open: boolean;
    close: () => void;
}

export default function AddProjectModal({ open, close }: Props) {
    const [isPublic, setIsPublic] = useState<TisPublic>("not-public");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [theme, setTheme] = useState<string>("default");
    const [touched, setTouched] = useState({
        name: false,
        endDate: false,
    });

    const token = "user-token-replace-with-actual-token";

    const handleIsPublicChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsPublic((event.target as HTMLInputElement).value as TisPublic);
    };

    const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

    function isValidDateFormat(dateString: string) {
        return dateRegex.test(dateString);
    }

    const handleInputBlur = (field: "name" | "endDate") => {
        setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
    };

    const validateInputs = (field: "name" | "endDate") => {
        if (field === "name") {
            return touched[field] && name.trim().length < 1;
        } else if (field === "endDate") {
            return touched[field] && !isValidDateFormat(endDate);
        }
    };

    const getErrorText = (field: "name" | "endDate") => {
        if (touched[field] && field === "name" && name.trim().length < 1) {
            return "Field must be filled out";
        } else if (
            field === "endDate" &&
            touched[field] &&
            !isValidDateFormat(endDate)
        ) {
            return "Use format DD/MM/YYYY";
        } else {
            return null;
        }
    };

    const handleSubmit = async () => {
        try {
            const project: TProject = {
                name,
                description,
                endDate: new Date(endDate) || null,
                isPublic: isPublic === "public" ? true : false,
                picture: null,
                theme: theme,
            };
            await projectService.createNewProject(token, project);

            // TODO add project to state

            setName("");
            setDescription("");
            close();
        } catch (error) {
            console.log(error);
            // TODO set error notification
        }
    };

    const disableButton = !name;

    return (
        <div>
            <Modal
                open={open}
                onClose={close}
                aria-labelledby="add-project-modal"
                aria-describedby="add-project-modal"
            >
                <Card sx={style}>
                    <Grid container flexDirection="column" alignItems="center">
                        <Grid item sx={{ mb: 4 }}>
                            <Typography variant="h4" textAlign="center">
                                Add new project
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mb: 4 }}
                        >
                            <Typography>Name</Typography>
                            <TextField
                                placeholder="Project name"
                                onChange={(e) => setName(e.target.value)}
                                error={validateInputs("name")}
                                helperText={getErrorText("name")}
                                onBlur={() => handleInputBlur("name")}
                                required
                            />
                        </Grid>
                        <Grid
                            item
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mb: 4 }}
                        >
                            <Typography>Description</Typography>
                            <TextField
                                placeholder="Project description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid
                            item
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mb: 4 }}
                        >
                            <Typography>End date</Typography>
                            <TextField
                                placeholder="MM/DD/YYYY"
                                onChange={(e) => setEndDate(e.target.value)}
                                error={validateInputs("endDate")}
                                helperText={getErrorText("endDate")}
                                onBlur={() => handleInputBlur("endDate")}
                            />
                        </Grid>
                        <Grid
                            item
                            display="flex"
                            flexDirection="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mb: 4 }}
                        >
                            <FormControl>
                                <RadioGroup
                                    defaultValue="not-public"
                                    name="is-public-radio-group"
                                    onChange={handleIsPublicChange}
                                >
                                    <FormControlLabel
                                        value="not-public"
                                        control={<Radio />}
                                        label="Not public"
                                    />
                                    <FormControlLabel
                                        value="public"
                                        control={<Radio />}
                                        label="Public"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ mb: 4 }}
                    >
                        <FormControl>
                            <InputLabel id="theme-select-label">
                                Theme
                            </InputLabel>
                            <Select
                                labelId="theme-select-label"
                                id="theme-select"
                                label="Theme"
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                            >
                                <MenuItem value="default">Default</MenuItem>
                                <MenuItem value="red">Red</MenuItem>
                                <MenuItem value="yellow">Yellow</MenuItem>
                                <MenuItem value="blue">Blue</MenuItem>
                                <MenuItem value="green">Green</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ mb: 4 }}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={disableButton}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Card>
            </Modal>
        </div>
    );
}
