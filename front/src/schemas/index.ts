import * as yup from "yup";
import {
    projectDescriptionMaxLength,
    projectNameMaxLength,
} from "../utils/consts";
import {
    emptyFieldHelperText,
    invalidEmailHelperText,
    maxLengthProjectDescriptionHelperText,
    maxLengthProjectNameHelperText,
    passwordsNoMatchHelperText,
} from "../utils/helperMessages";
import { passwordRegEx } from "../utils/inputChecks";

type TisPublic = "public" | "not-public";

const emailSchema = yup
    .string()
    .required(emptyFieldHelperText)
    .email(invalidEmailHelperText);
const passwordSchema = yup
    .string()
    .required(emptyFieldHelperText)
    .matches(passwordRegEx, passwordsNoMatchHelperText);

const firstNameSchema = yup.string().required(emptyFieldHelperText);
const lastNameSchema = yup.string().required(emptyFieldHelperText);

export const loginSchema = yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
});

export const signUpSchema = yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
});

export const addProjectSchema = yup.object().shape({
    name: yup
        .string()
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
});
