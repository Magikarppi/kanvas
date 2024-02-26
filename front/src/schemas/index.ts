import * as yup from "yup";
import {
    cityMaxLength,
    countryMaxLength,
    jobPitchMaxLength,
    linkedinUserNameMaxLength,
    phoneNumberMaxLength,
    projectDescriptionMaxLength,
    projectNameMaxLength,
    teamNameMaxLength,
} from "../utils/consts";
import {
    cityMaxLengthHelperText,
    countryMaxLengthHelperText,
    emptyFieldHelperText,
    invalidEmailHelperText,
    jobPitchHelperText,
    linkedinUserNameHelperText,
    maxLengthProjectDescriptionHelperText,
    maxLengthProjectNameHelperText,
    passwordsNoMatchHelperText,
    phoneNumberHelperText,
    teamNameMaxLengthHelperText,
    validPasswordHelperText,
} from "../utils/helperMessages";
import { passwordRegEx, isValidEmail } from "../utils/inputChecks";

type TisPublic = "public" | "not-public";

const emailSchema = yup
    .string()
    .required(emptyFieldHelperText)
    .test("is-valid", invalidEmailHelperText, (value) => isValidEmail(value));
const passwordSchema = yup
    .string()
    .required(emptyFieldHelperText)
    .matches(passwordRegEx, validPasswordHelperText);

const firstNameSchema = yup
    .string()
    .transform((firstName) => (firstName as string).trim())
    .required(emptyFieldHelperText);
const lastNameSchema = yup
    .string()
    .transform((lastName) => (lastName as string).trim())
    .required(emptyFieldHelperText);

export const loginSchema = yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
});

export const signUpSchema = yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], passwordsNoMatchHelperText),
    firstName: firstNameSchema,
    lastName: lastNameSchema,
});

export const addProjectSchema = yup.object().shape({
    name: yup
        .string()
        .transform((name) => (name as string).trim())
        .max(projectNameMaxLength, maxLengthProjectNameHelperText)
        .required(emptyFieldHelperText),
    description: yup
        .string()
        .max(
            projectDescriptionMaxLength,
            maxLengthProjectDescriptionHelperText
        ),
    endDate: yup.date(),
    theme: yup.string().required(),
    isPublic: yup.string<TisPublic>().required(),
    memberEmail: yup.string(),
});

export const userInfoSchema = yup.object().shape({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: emailSchema,
    phoneNumber: yup.string().max(phoneNumberMaxLength, phoneNumberHelperText),
    country: yup.string().max(countryMaxLength, countryMaxLengthHelperText),
    city: yup.string().max(cityMaxLength, cityMaxLengthHelperText),
    linkedinUsername: yup
        .string()
        .max(linkedinUserNameMaxLength, linkedinUserNameHelperText),
    jobPitch: yup.string().max(jobPitchMaxLength, jobPitchHelperText),
    isOpenToWork: yup.boolean().required(),
});

export const changePasswordSchema = yup.object().shape({
    password: passwordSchema,
    newPassword: passwordSchema,
    newPasswordConfirmation: yup
        .string()
        .required()
        .oneOf([yup.ref("newPassword")], passwordsNoMatchHelperText),
});

export const forgotPasswordSchema = yup.object().shape({
    email: emailSchema,
});

export const addTeamSchema = yup.object().shape({
    teamName: yup
        .string()
        .required(emptyFieldHelperText)
        .max(teamNameMaxLength, teamNameMaxLengthHelperText),
    publicValue: yup.boolean().required(),
    newEmailState: yup.string(),
});

export const newPasswordSchema = yup.object().shape({
    newPassword: passwordSchema,
    newPasswordConfirmation: yup
        .string()
        .required()
        .oneOf([yup.ref("newPassword")], passwordsNoMatchHelperText),
});

export const updateCardSchema = yup.object().shape({
    title: yup.string().required(emptyFieldHelperText),
    subTitle: yup.string().nullable(),
    description: yup
        .string()
        .max(projectDescriptionMaxLength, maxLengthProjectDescriptionHelperText)
        .nullable(),
    status: yup.string().nullable(),
    dueDate: yup.date().nullable(),
});
