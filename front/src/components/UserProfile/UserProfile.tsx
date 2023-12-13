import React, { useState, ChangeEvent } from "react";
import {
    Avatar,
    Button,
    Checkbox,
    Grid,
    Paper,
    TextField,
    Tooltip,
    Typography,
    InputLabel,
    Box,
    IconButton,
    CardActionArea,
    CardMedia,

} from "@mui/material";
import { IUpdateUserBodyWithoutPassword } from "../../models/userModels";
import userRequests from "../../services/userService";
import { validEmail } from "../../utils/inputChecks";
import Icons from "../Icons/Icons";

interface UserRegistrationState {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    country: string | null;
    city: string;
    picture: string;
    isOpenToWork: boolean;
    linkedinUsername: string;
    jobPitch: string;
    
}


const UserProfile = () => {
    const [formValues, setFormValues] = useState<UserRegistrationState>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        country: null,
        city: "",
        picture: "",
        isOpenToWork: false,
        linkedinUsername: "",
        jobPitch:"",
    });

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
    });
    const [image, setImage] = useState<string | ArrayBuffer | null>("");
    const [hoveringImage, setHoveringImage] = useState<boolean>(true);
    

    const handleSubmit = async () => {
        const updatedUser: IUpdateUserBodyWithoutPassword = {
            // get values from form when it is implemented
            firstName: "formValues.firstName",
            lastName: "formValues.lastName",
            email: "formValues.email",
            phoneNumber: "formValues.phoneNumber" || null,
            country: "formValues.country" || null,
            city: "formValues.city" || null,
            linkedinUsername: "formValues.linkedInUsername" || null,
            id: "user-id-replace-with-actua-user-id",
            isOpenToWork: false /* formValues.isOpenToWork */,
            jobPitch: "formValues.jobPitch",
            picture: "formValues.picture?",
        };

        try {
            if(validEmail(updatedUser.email)){
                await userRequests.updateUser(
                    "user-token-replace-with-actual-token",
                    updatedUser
                );
            }
        } catch (error) {
            console.error(error);
            // Set error notification
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleInputBlur = (field: keyof typeof formValues) => {
        setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
    };

    const validateInputs = (field: keyof typeof formValues) => {
        const value = formValues[field];

        if (field === "email") {
            return touched[field] && typeof value === "string" && !validEmail(value);

        } else if (field === "firstName") {
            return touched[field] && value === "";
        } else if (field === "lastName") {
            return touched[field] && value === "";
        } else {
            return;
        }
    };

    const getErrorText = (field: keyof typeof formValues) => {
        const value = formValues[field];

        if (field === "email" && touched[field] && value === "") {
            return "Field must be filled out";
        } else if (field === "email" && touched[field] && typeof value === "string" && !validEmail(value)) {
            return "Invalid email address";
        } else if (field === "lastName" &&  touched[field] && value === "") {
            return "Field must be filled out";
        } else if (field === "firstName" && touched[field] && value === "") {
            return "Field must be filled out";
        }
        else {
            return null;
        }
    };

    const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (event.target.files && event.target.files[0]) {
            const isJpeg = event.target.files[0].type.slice(-4) === "jpeg";
            const isPng = event.target.files[0].type.slice(-3) === "png";
    
            if (isJpeg || isPng) {
                reader.addEventListener("load", () => {
                    setImage(reader.result);
                });
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    };

    const disableButton =
    formValues.firstName === "" ||
    formValues.lastName === "" ||
    formValues.email === "" ||
    !validEmail(formValues.email);


    return (
        <Paper elevation={1} className="userEditProfileContainer">
            <Avatar
                style={{
                    height: "100px",
                    width: "100px",
                    margin: "5px 20px 0 0",
                    textAlign: "center",
                    marginTop: "40px",
                    marginBottom: "25px",
                }}
                onMouseEnter={() => setHoveringImage(true)}
                onMouseLeave={() => setHoveringImage(false)}
            >
                {hoveringImage ? (
                    <Tooltip title="Edit image" arrow>
                        <IconButton style={{ top: "5px" }}>
                            <Icons.Add />
                            <input
                                type="file"
                                onChange={handleSetImage}
                                style={{
                                    position: "absolute",
                                    opacity: 0,
                                    cursor: "pointer",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <CardActionArea>
                        {typeof image === "string" && image.length > 0 ? (
                            <CardMedia
                                style={{ height: "100px" }}
                                image={image}
                                component="img"
                            />
                        ) : (
                            <Box />
                        )}
                    </CardActionArea>
                )}
            </Avatar>
            <Typography variant="h4" style={{ marginBottom: "30px" }}>
                Users profile
            </Typography>

            <Grid container style={{ marginBottom: "40px" }}>
                <Grid item xs={1} md={1.5} lg={3.5} />
                <Grid
                    item
                    xs={10}
                    md={9}
                    lg={5}
                    style={{ textAlign: "center" }}
                > 
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "center",
                        }}
                    >
                        <InputLabel
                            style={{ fontSize: 14, marginBottom: 3, marginLeft: 6 }}
                            htmlFor="outlined-required"
                        >
                            First Name *
                        </InputLabel>
                        <TextField
                            error={validateInputs("firstName")}
                            required
                            fullWidth
                            size="small"
                            name="firstName"
                            value={formValues.firstName}
                            id="outlined-required"
                            onChange={handleInputChange}
                            onBlur={() => handleInputBlur("firstName")}
                            helperText={getErrorText("firstName")}
                            autoComplete="off"
                            sx={{ "& input": { fontSize: 12 } }}
                            FormHelperTextProps={{ style: { fontSize: 12 } }}
                        />
                        <InputLabel
                            style={{ fontSize: 14, marginBottom: 4, marginLeft: 6, marginTop: 8, }}
                            htmlFor="outlined-required"
                        >
                            Last Name *
                        </InputLabel>
                        <TextField
                            error={validateInputs("lastName")}
                            required
                            fullWidth
                            size="small"
                            name="lastName"
                            value={formValues.lastName}
                            id="outlined-required"
                            onChange={handleInputChange}
                            onBlur={() => handleInputBlur("lastName")}
                            helperText={getErrorText("lastName")}
                            autoComplete="off"
                            sx={{ "& input": { fontSize: 12 } }}
                            FormHelperTextProps={{ style: { fontSize: 12 } }}

                        />
                        <InputLabel
                            style={{ fontSize: 14, marginBottom: 4, marginLeft: 6, marginTop: 8, }}
                            htmlFor="outlined-required"
                        >
                            Email Address *
                        </InputLabel>
                        <TextField
                            error={validateInputs("email")}
                            required
                            fullWidth
                            name="email"
                            size="small"
                            value={formValues.email}
                            id="outlined-required"
                            onChange={handleInputChange}
                            onBlur={() => handleInputBlur("email")}
                            helperText={getErrorText("email")}
                            autoComplete="off"
                            sx={{ "& input": { fontSize: 12 } }}
                            FormHelperTextProps={{ style: { fontSize: 12 } }}
                        />
                        <InputLabel
                            style={{ fontSize: 14, marginBottom: 4, marginLeft: 6, marginTop: 8, }}
                            htmlFor="outlined-required"
                        >
                            Phone number
                        </InputLabel>
                        <TextField
                            fullWidth
                            name="phoneNumber"
                            size="small"
                            value={formValues.phoneNumber}
                            id="outlined-required"
                            onChange={handleInputChange}
                            autoComplete="off"
                            sx={{ "& input": { fontSize: 14 } }}
                        />
                        <InputLabel
                            style={{ fontSize: 14, marginBottom: 4, marginLeft: 6, marginTop: 8, }}
                            htmlFor="outlined-required"
                        >
                            Country
                        </InputLabel>
                        <TextField
                            fullWidth
                            name="country"
                            size="small"
                            value={formValues.country}
                            id="outlined-required"
                            onChange={handleInputChange}
                            autoComplete="off"
                            sx={{ "& input": { fontSize: 14 } }}
                        />
                        <InputLabel
                            style={{ fontSize: 14, marginBottom: 4, marginLeft: 6, marginTop: 8, }}
                            htmlFor="outlined-required"
                        >
                            City
                        </InputLabel>
                        <TextField
                            fullWidth
                            name="city"
                            size="small"
                            value={formValues.city}
                            id="outlined-required"
                            onChange={handleInputChange}
                            autoComplete="off"
                            sx={{ "& input": { fontSize: 14 } }}
                        />
                        <InputLabel
                            style={{ fontSize: 14, marginBottom: 4, marginLeft: 6, marginTop: 8, }}
                            htmlFor="outlined-required"
                        >   
                            LinkedIn Username
                        </InputLabel>
                        <TextField
                            fullWidth
                            name="linkedinUsername"
                            size="small"
                            value={formValues.linkedinUsername}
                            id="outlined-required"
                            onChange={handleInputChange}
                            autoComplete="off"
                            sx={{ "& input": { fontSize: 14 } }}
                        />
                        <InputLabel
                            style={{ fontSize: 14, marginBottom: 4, marginLeft: 6, marginTop: 8, }}
                            htmlFor="outlined-required"
                        >   
                            About you
                        </InputLabel>
                        <TextField
                            name="jobPitch"
                            value={formValues.jobPitch}
                            fullWidth
                            size="small"
                            autoComplete="off"
                            onChange={handleInputChange}
                            multiline
                            rows={6}
                            id="outlined-about"
                            type="text"
                        />
                    </Box>
                    <div>
                        <InputLabel
                            style={{ fontSize: 14, marginTop: 17, }}
                            htmlFor="outlined-required"
                        >   
                            Are you open to finding work?
                        </InputLabel>
                        <Checkbox />
                    </div>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: "20px", fontSize: 13 }}
                        onClick={handleSubmit}
                        size="large"
                        disabled={disableButton}
                    >
                        Submit changes
                    </Button>
                    <Grid item xs={1} md={1.5} lg={3.5} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserProfile;
