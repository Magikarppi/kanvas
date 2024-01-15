import { useState, ChangeEvent, useEffect, FormEvent } from "react";
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
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { IUser } from "../../models/userModels";
import DefaultToastContainer from "../Toast/DefaultToastContainer";
import userRequests from "../../services/userService";
import { validEmail } from "../../utils/inputChecks";
import Icons from "../Icons/Icons";
import { useAppDispatch, selectToken, selectUser } from "../../redux/hooks";
import { setUserInfo } from "../../redux/userReducer";
import {
    emptyFieldHelperText,
    invalidEmailHelperText,
} from "../../utils/helperMessages";


const UserProfile = () => {
    const user = selectUser();
    const token = selectToken();
    const dispatch = useAppDispatch();

    const [formValues, setFormValues] = useState<Partial<IUser>>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        country: "",
        city: "",
        picture: "",
        isOpenToWork: false,
        linkedinUsername: "",
        jobPitch: "",
    });

    useEffect(() => {
        setFormValues({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
            country: user?.country || null,
            city: user?.city || "",
            picture: user?.picture || "",
            isOpenToWork: user?.isOpenToWork || false,
            linkedinUsername: user?.linkedinUsername || "",
            jobPitch: user?.jobPitch || "",
        });
    }, [user]);

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
    });
    const [image, setImage] = useState<string | ArrayBuffer | null>("");
    const [hoveringImage, setHoveringImage] = useState<boolean>(true);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const updatedUser: IUser = {
            firstName: formValues.firstName!,
            lastName: formValues.lastName!,
            email: formValues.email!,
            phoneNumber: formValues.phoneNumber || null,
            country: formValues.country || null,
            city: formValues.city || null,
            linkedinUsername: formValues.linkedinUsername || null,
            isOpenToWork: formValues.isOpenToWork!,
            jobPitch: formValues.jobPitch || null,
            picture: "Tähän tulee kuvan url" || null,
            id: user!.id,
            accountCreationDate: user!.accountCreationDate,
            isOnline: user!.isOnline,
            lastOnline: user!.lastOnline,
        };

        try {
            if (token && user) {
                await userRequests.updateUser(token, updatedUser);
                dispatch(setUserInfo(updatedUser));
                toast.success("Profile successfully updated");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data);
            }
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevData) => ({ ...prevData, [name]: value }));
    };

    const checkboxOnChange = () => {
        setFormValues({
            ...formValues,
            isOpenToWork: !formValues.isOpenToWork,
        });
    };

    const handleInputBlur = (field: keyof typeof formValues) => {
        setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
    };

    const validateInputs = (field: keyof typeof formValues) => {
        const value = formValues[field];

        if (field === "email") {
            return (
                touched[field] &&
                typeof value === "string" &&
                !validEmail(value)
            );
        } else if (field === "firstName") {
            return touched[field] && value?.toString().trim() === "";
        } else if (field === "lastName") {
            return touched[field] && value?.toString().trim() === "";
        } else {
            return;
        }
    };

    const getErrorText = (field: keyof typeof formValues) => {
        const value = formValues[field];

        if (field === "email" && touched[field] && value === "") {
            return emptyFieldHelperText;
        } else if (
            field === "email" &&
            touched[field] &&
            typeof value === "string" &&
            !validEmail(value)
        ) {
            return invalidEmailHelperText;
        } else if (field === "lastName" && touched[field] && value === "") {
            return emptyFieldHelperText;
        } else if (field === "firstName" && touched[field] && value === "") {
            return emptyFieldHelperText;
        } else {
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
        !validEmail(formValues.email!);

    return (
        <>
            <Paper elevation={1} className="elevatedSection">
                <DefaultToastContainer />
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
                            component="form"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "center",
                            }}
                        >
                            <InputLabel htmlFor="firstName">
                                First Name *
                            </InputLabel>
                            <TextField
                                error={validateInputs("firstName")}
                                required
                                fullWidth
                                size="small"
                                data-cy="firstName-input"
                                name="firstName"
                                value={formValues.firstName || ""}
                                id="firstName"
                                onChange={handleInputChange}
                                onBlur={() => handleInputBlur("firstName")}
                                helperText={getErrorText("firstName")}
                                autoComplete="off"
                            />
                            <InputLabel htmlFor="lastName">Last Name *</InputLabel>
                            <TextField
                                error={validateInputs("lastName")}
                                required
                                fullWidth
                                size="small"
                                name="lastName"
                                data-cy="lastName-input"
                                value={formValues.lastName || ""}
                                id="lastName"
                                onChange={handleInputChange}
                                onBlur={() => handleInputBlur("lastName")}
                                helperText={getErrorText("lastName")}
                                autoComplete="off"
                            />
                            <InputLabel htmlFor="email">Email Address *</InputLabel>
                            <TextField
                                error={validateInputs("email")}
                                required
                                fullWidth
                                name="email"
                                size="small"
                                data-cy="email-input"
                                value={formValues.email || ""}
                                id="email"
                                onChange={handleInputChange}
                                onBlur={() => handleInputBlur("email")}
                                helperText={getErrorText("email")}
                                autoComplete="off"
                            />
                            <InputLabel htmlFor="phoneNumber">
                                Phone number
                            </InputLabel>
                            <TextField
                                fullWidth
                                name="phoneNumber"
                                size="small"
                                data-cy="phone-input"
                                value={formValues.phoneNumber || ""}
                                id="phoneNumber"
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            <InputLabel htmlFor="country">Country</InputLabel>
                            <TextField
                                fullWidth
                                name="country"
                                size="small"
                                data-cy="country-input"
                                value={formValues.country || ""}
                                id="country"
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            <InputLabel htmlFor="city">City</InputLabel>
                            <TextField
                                fullWidth
                                name="city"
                                id="city"
                                size="small"
                                data-cy="city-input"
                                value={formValues.city || ""}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            <InputLabel htmlFor="linkedinUsername">
                                LinkedIn Username
                            </InputLabel>
                            <TextField
                                fullWidth
                                name="linkedinUsername"
                                size="small"
                                value={formValues.linkedinUsername || ""}
                                id="linkedinUsername"
                                data-cy="linkedin-input"
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            <InputLabel htmlFor="jobPitch">Job pitch</InputLabel>
                            <TextField
                                name="jobPitch"
                                value={formValues.jobPitch || ""}
                                fullWidth
                                size="small"
                                data-cy="jobPitch-input"
                                autoComplete="off"
                                onChange={handleInputChange}
                                multiline
                                rows={6}
                                id="jobPitch"
                                type="text"
                            />
                        </Box>
                        <div>
                            <InputLabel htmlFor="isOpenToWork">
                                Are you open to finding work?
                            </InputLabel>
                            <Checkbox
                                id="isOpenToWork"
                                name="isOpenToWork"
                                checked={formValues.isOpenToWork}
                                onChange={checkboxOnChange}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="secondary"
                            data-cy="update-button"
                            onClick={handleSubmit}
                            disabled={disableButton}
                        >
                            Submit changes
                        </Button>
                        <Grid item xs={1} md={1.5} lg={3.5} />
                    </Grid>
                </Grid>
            </Paper>

        </>
    );

};

export default UserProfile;
