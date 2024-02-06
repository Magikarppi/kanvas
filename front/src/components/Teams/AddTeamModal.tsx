import { useState, useEffect } from "react";
import {
    Button,
    Card,
    Container,
    InputLabel,
    Modal,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    ListItemText,
    ListItem,
    Tooltip,
    Divider,
    Box,
} from "@mui/material";
import { isValidEmail } from "../../utils/inputChecks";
import { useFormik } from "formik";
import { addTeamSchema } from "../../schemas";
import TeamNameInput from "../Inputs/TeamNameInput";
import CustomCheckbox from "../Inputs/CustomCheckbox";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Icons from "../Icons/Icons";

interface IPropsAddTeamModal {
    open: boolean;
    close: () => void;
    handleAddTeam: (team: INewTeamInitalFormValues) => Promise<void>;
}

export interface INewTeamInitalFormValues {
    teamName: string;
    publicValue: boolean;
    newEmailState: string;
    emails: string[];
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "84%",
    border: "2px solid #5e00ff",
    boxShadow: 24,
    p: 1,
    overflowY: "auto",
    maxWidth: "900px",
    maxHeight: "660px",
    minWidth: "320px",
};

export const AddTeamModal = ({
    open,
    close,
    handleAddTeam,
}: IPropsAddTeamModal) => {
    const [emails, setEmails] = useState<string[]>([]);

    useEffect(() => {
        if (!open) {
            resetForm();
            setEmails([]);
        }
    }, [open]);

    const addNewEmail = () => {
        const copyEmails: string[] = [...emails];
        copyEmails.push(values.newEmailState);
        setEmails(copyEmails);
        setFieldValue("newEmailState", "");
    };

    const onDeleteEmail = (email: string) => {
        const newEmails = emails.filter((val) => val != email);
        setEmails(newEmails);
    };

    const {
        values,
        resetForm,
        handleBlur,
        handleSubmit,
        isValid,
        handleChange,
        touched,
        errors,
        setFieldValue,
    } = useFormik({
        initialValues: {
            teamName: "",
            publicValue: false,
            newEmailState: "",
        },
        validationSchema: addTeamSchema,
        async onSubmit(values) {
            try {
                await handleAddTeam({ ...values, emails });
                close();
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data);
                }
            }
        },
    });

    const newEmailInEmails = emails.includes(values.newEmailState);
    const disableCreateButton =
        Object.keys(touched).length === 0 ||
        !isValid ||
        Object.keys(errors).length > 0;
    const disableAddEmailButton =
        !isValidEmail(values.newEmailState!) || newEmailInEmails;

    return (
        <>
            <Modal open={open} onClose={close} hideBackdrop={true}>
                <Card sx={style}>
                    <Container
                        component="form"
                        onSubmit={handleSubmit}
                        style={{ cursor: "default" }}
                    >
                        <Typography
                            style={{
                                marginBottom: "30px",
                                marginTop: "10px",
                                fontSize: "2.5rem",
                                fontWeight: "bold",
                            }}
                        >
                            Create a New Team
                        </Typography>
                        <TeamNameInput
                            error={errors.teamName}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            teamName={values.teamName}
                            touched={touched.teamName}
                        />
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <InputLabel sx={{ fontSize: "1.7rem" }}>
                                Public team
                            </InputLabel>
                            <Tooltip
                                title={
                                    <p style={{ fontSize: "1rem" }}>
                                        Public teams can be found using search
                                        and <br /> are available for everyone to
                                        join
                                    </p>
                                }
                                placement="top"
                            >
                                <Icons.Info size="large" />
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CustomCheckbox
                                name="publicValue"
                                value={values.publicValue}
                                handleChange={handleChange}
                            />
                            <InputLabel
                                sx={{ color: "white", marginTop: "4px" }}
                            >
                                Anyone can join this public team
                            </InputLabel>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <InputLabel sx={{ fontSize: "1.7rem" }}>
                                Invite team members
                            </InputLabel>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <InputLabel
                                sx={{
                                    marginBottom: "10px",
                                    marginTop: "10px",
                                    color: "white",
                                }}
                            >
                                You can always invite members later
                            </InputLabel>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                onChange={handleChange}
                                error={
                                    Boolean(errors.newEmailState) ||
                                    newEmailInEmails
                                }
                                name="newEmailState"
                                id="newEmailState"
                                value={values.newEmailState}
                                fullWidth
                                onBlur={() => handleBlur("newEmailState")}
                                helperText={
                                    Boolean(errors.newEmailState) &&
                                    errors.newEmailState
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {values.newEmailState !== "" ? (
                                                <>
                                                    {disableAddEmailButton ? null : (
                                                        <IconButton
                                                            color="success"
                                                            sx={{ p: "10px" }}
                                                            aria-label="directions"
                                                            onClick={
                                                                addNewEmail
                                                            }
                                                        >
                                                            <Icons.AddPerson size="x-large" />
                                                        </IconButton>
                                                    )}
                                                </>
                                            ) : (
                                                <Icons.Email size="x-large" />
                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextField>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <InputLabel
                                sx={{ color: "white", marginBottom: "20px" }}
                            >
                                Invitation will be sent to these users when you
                                click Create Team:
                            </InputLabel>
                        </Box>
                        {emails.map((val) => (
                            <Box
                                key={val}
                                sx={{ width: "100%", maxWidth: 400 }}
                            >
                                <ListItem
                                    onClick={() => onDeleteEmail(val)}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <Icons.Delete
                                                iconColor="red"
                                                size="x-large"
                                            />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={val}
                                        primaryTypographyProps={{
                                            fontSize: 16,
                                        }}
                                    />
                                </ListItem>
                                <Divider />
                            </Box>
                        ))}
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
                                disabled={disableCreateButton}
                                color="secondary"
                                type="submit"
                            >
                                Create
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={close}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Container>
                </Card>
            </Modal>
        </>
    );
};

export default AddTeamModal;
