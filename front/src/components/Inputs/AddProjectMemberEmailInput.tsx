import { TextField, InputAdornment, IconButton } from "@mui/material";
import Icons from "../Icons/Icons";

interface IProps {
    handleChange:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    handleBlur:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    memberEmail: string;
    memberEmailInEmails: boolean;
    error: string | undefined;
    disableAddEmailButton: boolean;
    addEmail: () => void;
}

export default function AddProjectMemberEmailInput({
    memberEmail,
    handleChange,
    handleBlur,
    disableAddEmailButton,
    error,
    memberEmailInEmails,
    addEmail,
}: IProps) {
    return (
        <TextField
            data-cy="add-project-member-input"
            onChange={handleChange}
            error={Boolean(error) || memberEmailInEmails}
            name="memberEmail"
            id="memberEmail"
            placeholder="new.member@example.com"
            value={memberEmail}
            fullWidth
            onBlur={handleBlur}
            helperText={Boolean(error) && error}
            autoComplete="off"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {memberEmail !== "" ? (
                            <>
                                {disableAddEmailButton ? null : (
                                    <IconButton
                                        color="success"
                                        sx={{ p: "10px" }}
                                        aria-label="directions"
                                        name="iconButton"
                                        id="iconButton"
                                        onClick={addEmail}
                                        data-cy="add-project-member-button"
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
    );
}
