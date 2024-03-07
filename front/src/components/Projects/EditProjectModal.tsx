import { Modal, Card, Container, Typography, Box, Grid } from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { IProject, IProjectSubmitNew } from "../../models/projectModels";
import { addProjectSchema } from "../../schemas";
import ProjectDescriptionInput from "../Inputs/ProjectDescriptionInput";
import ProjectEndDateInput from "../Inputs/ProjectEndDateInput";
import ProjectNameInput from "../Inputs/ProjectNameInput";
import ProjectThemeInput from "../Inputs/ProjectThemeInput";
import { projectModalStyle } from "./AddProjectModal";
import DeleteConfirmation from "../Confirmations/DeleteProjectConfirmation";
import PublicProjectElement from "./PublicProjectElement";
import AddProjectMembers from "./AddProjectMembers";
import useMemberEmails from "../../hooks/useMemberEmails";
import ProjectModalMainButtons from "./ProjectModalMainButtons";

interface IProps {
    project: IProject | undefined;
    open: boolean;
    close: () => void;
    handleUpdateProject: (
        project: IProjectSubmitNew,
        members: string[]
    ) => Promise<void>;
    handleDeleteProject: () => Promise<void>;
    members: string[];
}

export default function EditProjectModal({
    project,
    members,
    close,
    open,
    handleDeleteProject,
    handleUpdateProject,
}: IProps) {
    if (!project) {
        return null;
    }

    const { addMemberEmail, deleteMemberEmail, memberEmails } =
        useMemberEmails(members);

    useEffect(() => {
        if (!open) {
            resetForm();
            setFieldValue("name", initialValues.name);
            setFieldValue("description", initialValues.description);
            setFieldValue("endDate", initialValues.endDate);
            setFieldValue("theme", initialValues.theme);
            setFieldValue("isPublic", initialValues.isPublic);
        }
    }, [open]);

    const initialValues = {
        name: project?.name || "",
        description: project?.description || "",
        endDate: project?.endDate || null,
        theme: project?.theme || "blank",
        isPublic: project?.isPublic || false,
        memberEmail: "",
    };

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
        initialValues,
        validationSchema: addProjectSchema,
        async onSubmit(values, formikHelpers) {
            const newProject: IProjectSubmitNew = {
                name: values.name,
                theme: values.theme || "blank",
                description: values.description || null,
                endDate: values.endDate || null,
                isPublic: values.isPublic,
                picture: null,
            };
            try {
                await handleUpdateProject(newProject, memberEmails);

                formikHelpers.resetForm();
                close();
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data);
                }
            }
        },
    });

    const onAddMemberEmail = () => {
        addMemberEmail(values.memberEmail);
        setFieldValue("memberEmail", "");
    };

    const isNotTouched = Object.keys(touched).length === 0;
    const disableSubmitButton =
        (isNotTouched && !values.name) ||
        !isValid ||
        Object.keys(errors).length > 0;

    return (
        <Modal
            open={open}
            hideBackdrop={true}
            aria-labelledby="edit-project-modal"
            aria-describedby="edit-project-modal"
        >
            <Card sx={projectModalStyle} data-cy="edit-project-modal">
                <Container>
                    <Box sx={{ width: "100%" }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h4">Edit project</Typography>
                            <DeleteConfirmation
                                name={project.name}
                                onDelete={handleDeleteProject}
                            />
                        </Box>
                        <Box>
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
                                                    setFieldValue={
                                                        setFieldValue
                                                    }
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
                                    <PublicProjectElement
                                        handleChange={handleChange}
                                        isPublic={values.isPublic}
                                    />
                                    <AddProjectMembers
                                        memberEmail={values.memberEmail}
                                        memberEmails={memberEmails}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        error={errors.memberEmail}
                                        onAddMemberEmail={onAddMemberEmail}
                                        onDeleteMemberEmail={deleteMemberEmail}
                                    />
                                </Grid>
                                <ProjectModalMainButtons
                                    close={close}
                                    disableSubmitButton={disableSubmitButton}
                                    submitButtonLabel="Save"
                                />
                            </form>
                        </Box>
                    </Box>
                </Container>
            </Card>
        </Modal>
    );
}
