import { useState, ChangeEvent } from "react";
import {
    Avatar,
    Button,
    Grid,
    Paper,
    Tooltip,
    Typography,
    Box,
    IconButton,
    CardActionArea,
    CardMedia,
} from "@mui/material";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { IUser } from "../../models/userModels";
import userRequests from "../../services/userService";
import Icons from "../Icons/Icons";
import { useAppDispatch } from "../../redux/hooks";
import { setUserInfo } from "../../redux/userReducer";
import { useFormik } from "formik";
import { userInfoSchema } from "../../schemas";
import FirstNameInput from "../Inputs/FirstNameInput";
import LastNameInput from "../Inputs/LastNameInput";
import EmailInput from "../Inputs/EmailInput";
import PhoneNumberInput from "../Inputs/PhoneNumberInput";
import CountryInput from "../Inputs/CountryInput";
import CityInput from "../Inputs/CityInput";
import LinkedinUsernameInput from "../Inputs/LinkedinUsernameInput";
import JobPitchInput from "../Inputs/JobPitchInput";
import IsOpenToWorkInput from "../Inputs/IsOpenToWorkInput";

const UserProfile = ({
    token,
    user,
}: {
    token: string | null | undefined;
    user: IUser | null | undefined;
}) => {
    const dispatch = useAppDispatch();
    const [image, setImage] = useState<string | ArrayBuffer | null>("");
    const [hoveringImage, setHoveringImage] = useState<boolean>(true);

    const {
        values,
        errors,
        touched,
        isValid,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            firstName: user!.firstName,
            lastName: user!.lastName,
            email: user!.email,
            phoneNumber: user!.phoneNumber || "",
            country: user!.country || "",
            city: user!.city || "",
            picture: user!.picture || "",
            isOpenToWork: user!.isOpenToWork,
            linkedinUsername: user!.linkedinUsername || "",
            jobPitch: user!.jobPitch || "",
        },
        validationSchema: userInfoSchema,
        async onSubmit(values) {
            const updatedUser: Omit<
                IUser,
                "accountCreationDate" | "isOnline" | "lastOnline"
            > = {
                id: user!.id,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: values.phoneNumber || null,
                country: values.country || null,
                city: values.city || null,
                picture: "Tähän tulee kuvan url" || null,
                isOpenToWork: values.isOpenToWork,
                linkedinUsername: values.linkedinUsername || null,
                jobPitch: values.jobPitch || null,
            };

            try {
                if (token && user) {
                    const newUserInfo: IUser = await userRequests.updateUser(
                        token,
                        updatedUser
                    );
                    dispatch(setUserInfo(newUserInfo));
                    toast.success("Profile successfully updated");
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data);
                }
            }
        },
    });

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

    const disableButton = !isValid || Object.keys(errors).length > 0;

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
                        <FirstNameInput
                            firstName={values.firstName}
                            error={errors.firstName}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched.firstName}
                        />
                    </Grid>
                    <Grid item xs={10} md={6} lg={6} xl={5}>
                        <LastNameInput
                            lastName={values.lastName}
                            error={errors.lastName}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched.lastName}
                        />
                    </Grid>
                    <Grid item xs={10} md={6} lg={6} xl={5}>
                        <EmailInput
                            email={values.email}
                            error={errors.email}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched.email}
                        />
                    </Grid>
                    <Grid item xs={10} md={6} lg={6} xl={5}>
                        <PhoneNumberInput
                            phoneNumber={values.phoneNumber}
                            error={errors.phoneNumber}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched.phoneNumber}
                        />
                    </Grid>
                    <Grid item xs={10} md={6} lg={6} xl={5}>
                        <CountryInput
                            country={values.country}
                            error={errors.country}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched.country}
                        />
                    </Grid>
                    <Grid item xs={10} md={6} lg={6} xl={5}>
                        <CityInput
                            city={values.city}
                            error={errors.city}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched.city}
                        />
                    </Grid>
                    <Grid item xs={10} md={12} lg={12} xl={10}>
                        <LinkedinUsernameInput
                            linkedinUsername={values.linkedinUsername}
                            error={errors.linkedinUsername}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched.linkedinUsername}
                        />
                    </Grid>
                    <Grid item xs={10} md={12} lg={12} xl={10}>
                        <JobPitchInput
                            jobPitch={values.jobPitch}
                            error={errors.jobPitch}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched.jobPitch}
                        />
                    </Grid>
                    <Grid item xs={10} md={12} lg={12} xl={10}>
                        <IsOpenToWorkInput
                            isOpenToWork={values.isOpenToWork}
                            handleChange={handleChange}
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
