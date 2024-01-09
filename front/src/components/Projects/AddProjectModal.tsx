import {
    Box,
    Button,
    Card,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

import { IProjectSubmitNew } from "../../models/projectModels";
import {
    isEmpty,
    isProjectDescriptionTooLong,
    isValidUSDateFormat,
} from "../../utils/inputChecks";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "80%",
    border: "2px solid #5e00ff",
    boxShadow: 24,
    p: 1,
    overflowY: "auto",
};

type TisPublic = "public" | "not-public";

interface Props {
    open: boolean;
    close: () => void;
    handleAddProject: (project: IProjectSubmitNew) => Promise<void>;
}

const initialTouched = {
    name: false,
    endDate: false,
    description: false,
    theme: false,
    isPublic: false,
};

const initialFormValues = {
    name: "",
    description: "",
    endDate: "" as TisPublic,
    theme: "default",
    isPublic: "not-public",
};

export default function AddProjectModal({
    open,
    close,
    handleAddProject,
}: Props) {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [touched, setTouched] = useState(initialTouched);

    useEffect(() => {
        if (!open) {
            resetInputs();
        }
    }, [open]);

    const resetInputs = () => {
        setFormValues(initialFormValues);
        setTouched(initialTouched);
    };

    const handleInputChange = (
        e:
            | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent<string>
    ) => {
        const { name, value } = e.target;
        setFormValues((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleInputBlur = (field: keyof typeof formValues) => {
        setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
    };

    const validateInputs = (field: keyof typeof formValues) => {
        const value = formValues[field];

        if (field === "name") {
            return touched[field] && isEmpty(value);
        } else if (field === "endDate") {
            return touched[field] && !isValidUSDateFormat(value);
        } else if (field === "description") {
            return touched[field] && isProjectDescriptionTooLong(value);
        }
    };

    const getErrorText = (field: keyof typeof formValues) => {
        const value = formValues[field];
        if (touched[field] && field === "name" && isEmpty(value)) {
            return "Field must be filled out";
        } else if (
            field === "endDate" &&
            touched[field] &&
            !isValidUSDateFormat(value)
        ) {
            return "Use format MM/DD/YYYY";
        } else if (
            field === "description" &&
            touched[field] &&
            isProjectDescriptionTooLong(value)
        ) {
            return "Max length is 500 characters";
        } else {
            return null;
        }
    };

    const handleSubmit = async () => {
        try {
            const project: IProjectSubmitNew = {
                ...formValues,
                endDate: new Date(formValues.endDate) || null,
                isPublic: formValues.isPublic === "public" ? true : false,
                picture: null,
            };

            await handleAddProject(project);

            resetInputs();
            close();
        } catch (error) {
            console.log(error);
            // TODO set error notification
        }
    };

    const disableButton =
        !formValues.name || !isValidUSDateFormat(formValues.endDate);

    return (
        <Modal
            open={open}
            onClose={close}
            aria-labelledby="add-project-modal"
            aria-describedby="add-project-modal"
        >
            <Card sx={style}>
                <Container>
                    <Box
                        sx={{
                            textAlign: "center",
                            mt: 2,
                        }}
                    >
                        <Typography variant="h5">Add a new project</Typography>
                    </Box>
                    <Box component="form" sx={{ mt: 5 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="projectName">
                                    Name *
                                </InputLabel>
                                <TextField
                                    onChange={(e) => handleInputChange(e)}
                                    name="name"
                                    value={formValues.name}
                                    error={validateInputs("name")}
                                    helperText={getErrorText("name")}
                                    onBlur={() => handleInputBlur("name")}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="description">
                                    Description
                                </InputLabel>
                                <TextField
                                    fullWidth
                                    value={formValues.description}
                                    onChange={(e) => handleInputChange(e)}
                                    type="text"
                                    id="description"
                                    error={validateInputs("description")}
                                    helperText={getErrorText("description")}
                                    onBlur={() =>
                                        handleInputBlur("description")
                                    }
                                    name="description"
                                    autoComplete="off"
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="projectEndDate">
                                    End date
                                </InputLabel>
                                <TextField
                                    name="endDate"
                                    placeholder="MM/DD/YYYY"
                                    onChange={(e) => handleInputChange(e)}
                                    error={validateInputs("endDate")}
                                    helperText={getErrorText("endDate")}
                                    onBlur={() => handleInputBlur("endDate")}
                                    value={formValues.endDate}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="theme">Theme</InputLabel>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="theme-select-label"
                                        id="theme-select"
                                        value={formValues.theme}
                                        onChange={(e) => handleInputChange(e)}
                                        name="theme"
                                    >
                                        <MenuItem value="default">
                                            Default
                                        </MenuItem>
                                        <MenuItem value="red">Red</MenuItem>
                                        <MenuItem value="yellow">
                                            Yellow
                                        </MenuItem>
                                        <MenuItem value="blue">Blue</MenuItem>
                                        <MenuItem value="green">Green</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                display="flex"
                                justifyContent="center"
                                xs={12}
                            >
                                <FormControl>
                                    <RadioGroup
                                        defaultValue="not-public"
                                        name="isPublic"
                                        onChange={(e) => handleInputChange(e)}
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
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled={disableButton}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </div>
                    </Box>
                </Container>
            </Card>
        </Modal>
    );
}
