import { useState, ChangeEvent, useEffect } from "react";
import {
    Button,
    Card,
    Container,
    InputLabel,
    Modal,
    TextField,
    Typography,
    Checkbox,
    InputAdornment,
    IconButton,
    ListItemText,
    ListItem,
    Tooltip,
    Divider,
    Box
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupsIcon from "@mui/icons-material/Groups";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { validEmail } from "../../utils/inputChecks";
import { invalidEmailHelperText, emptyFieldHelperText } from "../../utils/helperMessages";



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

const initialFormValues = {
    teamName: "",
    publicValue: false,
    newEmailState:"",
    emails: [],
};

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

export const AddTeamModal = ({open, close, handleAddTeam}: IPropsAddTeamModal) => {
    const [formValues, setFormValues] = useState<INewTeamInitalFormValues>(initialFormValues);

    const [touched, setTouched] = useState({
        teamName: false,
        newEmailState: false,
    });

    const checkboxOnChange = () => {
        setFormValues({
            ...formValues,
            publicValue: !formValues.publicValue,
        });
    };

    useEffect(() => {
        if (!open) {
            resetInputs();
        }
    }, [open]);

    const resetInputs = () => {
        setFormValues(initialFormValues);
        setTouched({teamName: false, newEmailState: false});
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const length = formValues.teamName.length;
        if (length <= 100){
            setFormValues((prevData) => ({ ...prevData, [name]: value }));
        }
    };
    

    const addNewEmail = () => {
        const copyEmails: string[] = [...formValues.emails];
        copyEmails.push(formValues.newEmailState);
        setFormValues({...formValues, emails: copyEmails, newEmailState: ""});
    };

    const onDeleteEmail = (email: string) => {
        setFormValues({...formValues, emails: formValues.emails.filter(val => val != email)});
    };

    const handleInputBlur = (field: keyof typeof formValues) => {
        setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
    };

    const validateInputs = (field: keyof typeof formValues) => {
        const value = formValues[field];

        if (field === "newEmailState"  && value !== "") {
            return (
                touched[field] &&
                typeof value === "string" &&
                !validEmail(value)
            );
        } else if (field === "teamName") {
            return touched[field] && value?.toString().trim() === "";
        } else {
            return;
        }
    };

    const getErrorText = (field: keyof typeof formValues) => {
        const value = formValues[field];

        if (
            field === "newEmailState" &&
            touched[field] &&
            typeof value === "string" &&
            !validEmail(value) && value !== ""
        ) {
            return invalidEmailHelperText;
        } else if (field === "newEmailState" && touched[field] && found) {
            return "Email is already added";
        }
        else if (field === "teamName" && touched[field] && value === "") {
            return emptyFieldHelperText;
        } else {
            return null;
        }
    };

    const onCreateTeam = async () => {
        try {
            
            await handleAddTeam(formValues);
            setFormValues(initialFormValues);
            close();
        } catch (error) {
            console.log(error);
        // TODO set error notification
        }
    };
  
    const found = formValues.emails?.includes(formValues.newEmailState);
    const disableButton =
        formValues.teamName.trim() === "";

    const disableAddButton =
        !validEmail(formValues.newEmailState!) || found;
   
    return(
        <>
        
            <Modal  
                open={open}
                onClose={close}
                hideBackdrop={true}>
                <Card sx={style}>
                    <Container style={{ cursor: "default" }}>
                        <Typography style={{ 
                            marginBottom: "30px", 
                            marginTop: "10px", 
                            fontSize: "2.5rem", 
                            fontWeight:"bold"  }}>
                                Create a New Team
                        </Typography>
                        <InputLabel sx={{ fontSize: "1.7rem" }}>Team name *</InputLabel>
                        <TextField
                            onChange={handleInputChange}
                            error={validateInputs("teamName")}
                            name="teamName"
                            value={formValues.teamName}
                            fullWidth
                            id="teamName"
                            onBlur={() => handleInputBlur("teamName")}
                            helperText={getErrorText("teamName")}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <GroupsIcon fontSize="large"/>
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                maxLength: 100,
                            }}
                        />
                        <Box sx={{ marginLeft: "10px" }}>
                            <h4>{formValues.teamName.length} / 100</h4>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <InputLabel sx={{ fontSize: "1.7rem" }}>Public team</InputLabel>
                            <Tooltip
                                title={
                                    <p style={{ fontSize: "1rem" }}>
                                Public teams can be found using search and <br /> are available for
                                everyone to join
                                    </p>
                                }
                                placement="top"
                            >
                                <InfoIcon />
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Checkbox
                                id="public"
                                name="public"
                                checked={formValues.publicValue}
                                onChange={checkboxOnChange}
                                sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
                            />
                            <InputLabel sx={{ color: "white", marginTop: "4px" }}>
                                Anyone can join this public team
                            </InputLabel>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <InputLabel sx={{ fontSize: "1.7rem" }}>Invite team members</InputLabel>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <InputLabel sx={{ marginBottom: "10px", marginTop: "10px", color: "white" }}>
                                You can always invite members later
                            </InputLabel>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                onChange={handleInputChange}
                                error={validateInputs("newEmailState") || found}
                                name="newEmailState"
                                id="newEmailState"
                                value={formValues.newEmailState}
                                fullWidth
                                onBlur={() => handleInputBlur("newEmailState")}
                                helperText={getErrorText("newEmailState")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {formValues.newEmailState !== "" ? (
                                                <>
                                                    {disableAddButton ? null : (
                                                        <IconButton
                                                            color="success"
                                                            sx={{ p: "10px" }}
                                                            aria-label="directions"
                                                        >
                                                            <PersonAddAlt1Icon 
                                                                fontSize="large" 
                                                                onClick={addNewEmail} 
                                                            />
                                                        </IconButton>
                                                    )}
                                                </>
                                            ) : (
                                                <EmailIcon fontSize="large" />
                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextField>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <InputLabel sx={{ color: "white", marginBottom: "20px" }}>
                                Invitation will be sent to these users when you click Create Team:
                            </InputLabel>
                        </Box>
                        {formValues.emails.map(val => (
                            <>
                                <Box sx={{ width: "100%", maxWidth: 400 }}>
                                    <ListItem
                                        key={val}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon
                                                    style={{ color: "red" }}
                                                    fontSize="large"
                                                    onClick={() => onDeleteEmail(val)}
                                                />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary={val}
                                            primaryTypographyProps={{ fontSize: 16 }}
                                        />
                                    </ListItem>
                                    <Divider />
                                </Box>
                            </>
                        ))}
                        <Box sx={{ 
                            display: "flex", 
                            justifyContent: "space-evenly", 
                            marginTop: "40px", 
                            flexWrap: "wrap" 
                        }}>
                            <Button
                                variant="contained"
                                disabled={disableButton}
                                color="secondary"
                                onClick={onCreateTeam}
                            >
                                Create
                            </Button>
                            <Button variant="contained" color="error" onClick={close}>
                                Cancel
                            </Button>
                        </Box>
                    </Container> 
                </Card>

            </Modal>
        </>);
};

export default AddTeamModal;