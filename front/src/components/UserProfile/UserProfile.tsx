import { useState, ChangeEvent, FormEvent } from "react";
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
    FormControlLabel,
} from "@mui/material";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { IUser } from "../../models/userModels";
import userRequests from "../../services/userService";
import { validEmail } from "../../utils/inputChecks";
import Icons from "../Icons/Icons";
import { useAppDispatch } from "../../redux/hooks";
import { setUserInfo } from "../../redux/userReducer";
import {
    emptyFieldHelperText,
    invalidEmailHelperText,
} from "../../utils/helperMessages";

const UserProfile = ({
    token,
    user,
}: {
    token: string | null | undefined;
    user: IUser | null | undefined;
}) => {
    const dispatch = useAppDispatch();

    const [formValues, setFormValues] = useState<Partial<IUser>>({
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
        <Paper elevation={2} className="elevatedSection">
            <Avatar
                style={{
                    height: "100px",
                    width: "100px",
                    marginTop: "40px",
                    marginBottom: "25px",
                }}
                onMouseEnter={() => setHoveringImage(true)}
                onMouseLeave={() => setHoveringImage(false)}
            >
                {hoveringImage ? (
                    <Tooltip
                        title={
                            <Typography sx={{ fontSize: 14 }}>
                                Edit image
                            </Typography>
                        }
                        arrow
                    >
                        <IconButton>
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
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: "85%",
                }}
            >
                <Typography
                    variant="h4"
                    style={{ marginBottom: "30px", textAlign: "center" }}
                >
                    User's profile
                </Typography>
                <Grid
                    container
                    spacing={2}
                    style={{ marginBottom: "20px" }}
                    justifyContent="center"
                >
                    <Grid item xs={10} md={6} lg={6} xl={5}>
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
                            value={formValues.firstName}
                            id="firstName"
                            onChange={handleInputChange}
                            onBlur={() => handleInputBlur("firstName")}
                            helperText={getErrorText("firstName")}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={10} md={6} lg={6} xl={5}>
                        <InputLabel htmlFor="lastName">Last Name *</InputLabel>
                        <TextField
                            error={validateInputs("lastName")}
                            required
                            fullWidth
                            size="small"
                            name="lastName"
                            data-cy="lastName-input"
                            value={formValues.lastName}
                            id="lastName"
                            onChange={handleInputChange}
                            onBlur={() => handleInputBlur("lastName")}
                            helperText={getErrorText("lastName")}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={10} md={6} lg={6} xl={5}>
                        <InputLabel htmlFor="email">Email Address *</InputLabel>
                        <TextField
                            error={validateInputs("email")}
                            required
                            fullWidth
                            name="email"
                            size="small"
                            data-cy="email-input"
                            value={formValues.email}
                            id="email"
                            onChange={handleInputChange}
                            onBlur={() => handleInputBlur("email")}
                            helperText={getErrorText("email")}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={10} md={6} lg={6} xl={5}>
                        <InputLabel htmlFor="phoneNumber">
                            Phone number
                        </InputLabel>
                        <TextField
                            fullWidth
                            name="phoneNumber"
                            size="small"
                            data-cy="phone-input"
                            value={formValues.phoneNumber}
                            id="phoneNumber"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={10} md={6} lg={6} xl={5}>
                        <InputLabel htmlFor="country">Country</InputLabel>
                        <TextField
                            fullWidth
                            name="country"
                            size="small"
                            data-cy="country-input"
                            value={formValues.country}
                            id="country"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={10} md={6} lg={6} xl={5}>
                        <InputLabel htmlFor="city">City</InputLabel>
                        <TextField
                            fullWidth
                            name="city"
                            id="city"
                            size="small"
                            data-cy="city-input"
                            value={formValues.city}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={10} md={12} lg={12} xl={10}>
                        <InputLabel htmlFor="linkedinUsername">
                            LinkedIn Username
                        </InputLabel>
                        <TextField
                            fullWidth
                            name="linkedinUsername"
                            size="small"
                            value={formValues.linkedinUsername}
                            id="linkedinUsername"
                            data-cy="linkedin-input"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={10} md={12} lg={12} xl={10}>
                        <InputLabel htmlFor="jobPitch">Job pitch</InputLabel>
                        <TextField
                            name="jobPitch"
                            value={formValues.jobPitch}
                            fullWidth
                            size="small"
                            data-cy="jobPitch-input"
                            autoComplete="off"
                            onChange={handleInputChange}
                            multiline
                            rows={6}
                            id="jobPitch"
                            type="text"
                            InputProps={{
                                style: { fontSize: 14 },
                            }}
                        />
                    </Grid>
                    <Grid item xs={10} md={12} lg={12} xl={10}>
                        <InputLabel htmlFor="isOpenToWork">
                            Open for work
                        </InputLabel>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="isOpenToWork"
                                    name="isOpenToWork"
                                    checked={formValues.isOpenToWork}
                                    onChange={checkboxOnChange}
                                    sx={{ marginLeft: "auto" }}
                                />
                            }
                            label="I am open for finding work"
                            labelPlacement="start"
                            sx={{ width: "100%", marginLeft: 0 }}
                        />
                    </Grid>
                    <Grid
                        item
                        display="flex"
                        xs={10}
                        flexDirection="row"
                        justifyContent="center"
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            data-cy="update-button"
                            disabled={disableButton}
                            type="submit"
                            sx={{ mt: 5 }}
                        >
                            Update profile
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default UserProfile;
