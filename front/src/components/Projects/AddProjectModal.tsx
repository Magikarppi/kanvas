import {
    Box,
    Button,
    Card,
    Container,
    Grid,
    InputLabel,
    Modal,
    Tooltip,
    Typography,
} from "@mui/material";
import { IProjectSubmitNew } from "../../models/projectModels";
import { useFormik } from "formik";
import { addProjectSchema } from "../../schemas";
import "react-datepicker/dist/react-datepicker.css";
import ProjectNameInput from "../Inputs/ProjectNameInput";
import ProjectDescriptionInput from "../Inputs/ProjectDescriptionInput";
import ProjectThemeInput from "../Inputs/ProjectThemeInput";
import ProjectEndDateInput from "../Inputs/ProjectEndDateInput";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useEffect } from "react";
import CustomCheckbox from "../Inputs/CustomCheckbox";
import Icons from "../Icons/Icons";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "70%",
    border: "2px solid #5e00ff",
    boxShadow: 24,
    p: 1,
    overflowY: "auto",
    maxWidth: "1200px",
    maxHeight: "760px",
    minWidth: "320px",
};

interface Props {
    open: boolean;
    close: () => void;
    handleAddProject: (project: IProjectSubmitNew) => Promise<void>;
}

export default function AddProjectModal({
    open,
    close,
    handleAddProject,
}: Props) {
    useEffect(() => {
        if (!open) {
            resetForm();
        }
    }, [open]);

    const {
        values,
        errors,
        handleBlur,
        handleChange,
        setFieldValue,
        touched,
        handleSubmit,
        isValid,
        resetForm,
    } = useFormik({
        initialValues: {
            name: "",
            description: "",
            endDate: new Date(),
            theme: "blank",
            isPublic: false,
        },
        validationSchema: addProjectSchema,
        async onSubmit(values, formikHelpers) {
            try {
                const project: IProjectSubmitNew = {
                    name: values.name,
                    theme: values.theme || "blank",
                    description: values.description || null,
                    endDate: values.endDate || null,
                    isPublic: values.isPublic,
                    picture: null,
                };

                await handleAddProject(project);

                formikHelpers.resetForm();
                close();
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data);
                }
            }
        },
    });

    const disableButton =
        Object.keys(touched).length === 0 ||
        !isValid ||
        Object.keys(errors).length > 0;

    return (
        <Modal
            open={open}
            hideBackdrop={true}
            aria-labelledby="add-project-modal"
            aria-describedby="add-project-modal"
        >
            <Card sx={style} data-cy="add-project-modal">
                <Container>
                    <Box
                        sx={{
                            textAlign: "start",
                            mt: 2,
                        }}
                    >
                        <Typography variant="h4">
                            Create a new project
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 5 }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ProjectNameInput
                                        name={values.name}
                                        touched={touched.name}
                                        error={errors.name}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ProjectDescriptionInput
                                        description={values.description}
                                        touched={touched.description}
                                        error={errors.description}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        spacing={2}
                                        justifyContent="space-evenly"
                                    >
                                        <Grid item>
                                            <ProjectEndDateInput
                                                endDate={values.endDate}
                                                setFieldValue={setFieldValue}
                                            />
                                        </Grid>
                                        <Grid item width="200px">
                                            <ProjectThemeInput
                                                theme={values.theme}
                                                handleChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
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
                                                <p style={{ fontSize: "1rem" }}>
                                                    Public projects can be found
                                                    using search
                                                </p>
                                            }
                                            placement="top"
                                        >
                                            <Icons.Info />
                                        </Tooltip>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    display="flex"
                                    justifyContent="flex start"
                                    xs={12}
                                >
                                    <CustomCheckbox
                                        handleChange={handleChange}
                                        name="isPublic"
                                        value={values.isPublic}
                                        label="This project can be viewed by everyone"
                                        dataCy="project-is-public-checkbox"
                                    />
                                </Grid>
                            </Grid>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    marginTop: "40px",
                                    flexWrap: "wrap",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    disabled={disableButton}
                                    color="secondary"
                                    type="submit"
                                    data-cy="project-add-button"
                                >
                                    Create
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={close}
                                    data-cy="project-close-button"
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Container>
            </Card>
        </Modal>
    );
}
