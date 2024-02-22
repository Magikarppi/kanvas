import {
    Box,
    IconButton,
    InputLabel,
    ListItem,
    ListItemText,
    Divider,
    Grid,
} from "@mui/material";
import Icons from "../Icons/Icons";
import AddProjectMemberEmailInput from "../Inputs/AddProjectMemberEmailInput";
import { isValidEmail } from "../../utils/inputChecks";

interface IProps {
    memberEmail: string;
    onDeleteMemberEmail: (email: string) => void;
    memberEmails: string[];
    onAddMemberEmail: () => void;
    error: string | undefined;
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
}

export default function AddProjectMembers({
    memberEmail,
    onDeleteMemberEmail,
    memberEmails,
    error,
    onAddMemberEmail,
    handleBlur,
    handleChange,
}: IProps) {
    const emailInMemberEmails = memberEmails.includes(memberEmail);
    const disableAddEmailButton =
        emailInMemberEmails || !isValidEmail(memberEmail);
    return (
        <Grid item xs={12}>
            <InputLabel>Project members</InputLabel>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddProjectMemberEmailInput
                    addEmail={onAddMemberEmail}
                    disableAddEmailButton={disableAddEmailButton}
                    memberEmail={memberEmail}
                    memberEmailInEmails={emailInMemberEmails}
                    error={error}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                />
            </Box>
            {memberEmails.map((val) => (
                <Box key={val}>
                    <ListItem
                        onClick={() => onDeleteMemberEmail(val)}
                        data-cy={`project-member-email-${val}-delete-button`}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                name="iconDeleteButton"
                                id="iconDeleteButton"
                            >
                                <Icons.Delete size="x-large" />
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
        </Grid>
    );
}
