import { Modal, Card, Container, Typography, Box, Grid } from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { IProjectSubmitNew } from "../../models/projectModels";
import { addProjectSchema } from "../../schemas";
import ProjectDescriptionInput from "../Inputs/ProjectDescriptionInput";
import ProjectEndDateInput from "../Inputs/ProjectEndDateInput";
import ProjectNameInput from "../Inputs/ProjectNameInput";
import ProjectThemeInput from "../Inputs/ProjectThemeInput";
import ProjectModalMainButtons from "./ProjectModalMainButtons";
import PublicProjectElement from "./PublicProjectElement";
import AddProjectMembers from "./AddProjectMembers";
import useMemberEmails from "../../hooks/useMemberEmails";

interface Props {
    open: boolean;
    close: () => void;
    handleAddProject: (
        project: IProjectSubmitNew,
        members: string[]
    ) => Promise<void>;
}

export const projectModalStyle = {
    border: "2px solid #5e00ff",
    boxShadow: 24,
    p: 1,
    overflowY: "auto",
    width: "100%",
    height: "100%",
};

export default function AddProjectModal({
    open,
    close,
    handleAddProject,
}: Props) {
    const {
        addMemberEmail,
        deleteMemberEmail,
        memberEmails,
        resetMemberEmails,
    } = useMemberEmails([]);

    useEffect(() => {
        if (!open) {
            resetForm();
            setFieldValue("name", initialValues.name);
            setFieldValue("description", initialValues.description);
            setFieldValue("endDate", initialValues.endDate);
            setFieldValue("theme", initialValues.theme);
            setFieldValue("isPublic", initialValues.isPublic);
            setFieldValue("memberEmail", initialValues.memberEmail);
            resetMemberEmails();
        }
    }, [open]);

    const initialValues = {
        name: "",
        description: "",
        endDate: null,
        theme: "blank",
        isPublic: false,
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
                await handleAddProject(newProject, memberEmails);

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
        isNotTouched || !isValid || Object.keys(errors).length > 0;

    return (
        <Modal
            open={open}
            hideBackdrop={true}
            aria-labelledby="add-project-modal"
            aria-describedby="add-project-modal"
        >
            <Card sx={projectModalStyle} data-cy="add-project-modal">
                <Container>
                    <Box sx={{ width: "100%" }}>
                        <Typography variant="h4">
                            Create a new project
                        </Typography>
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
                                disableSubmitButton={disableSubmitButton}
                                submitButtonLabel="Create"
                                close={close}
                            />
                        </form>
                    </Box>
                </Container>
            </Card>
        </Modal>
    );
}
