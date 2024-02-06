import {
    phoneNumberMaxLength,
    linkedinUserNameMaxLength,
    countryMaxLength,
    cityMaxLength,
    jobPitchMaxLength,
    projectDescriptionMaxLength,
    projectNameMaxLength,
    cardTitleMaxLength,
    keywordMaxLength,
    cardColorMaxLength,
    teamNameMaxLength,
} from "./consts";

// general
export const emptyFieldHelperText = "Field must be filled out";

// user
export const validPasswordHelperText =
    "The password should be 8-50 characters long and contain at least one special character and one letter";
export const passwordsNoMatchHelperText = "Passwords do not match";
export const invalidEmailHelperText = "Invalid email address";
export const phoneNumberHelperText = `Max length for phone number is ${phoneNumberMaxLength} numbers`;
export const linkedinUserNameHelperText = `Max length is ${linkedinUserNameMaxLength} characters`;
export const countryMaxLengthHelperText = `Max length is ${countryMaxLength} characters`;
export const cityMaxLengthHelperText = `Max length is ${cityMaxLength} characters`;
export const jobPitchHelperText = `Max length is ${jobPitchMaxLength} characters`;

// project
export const maxLengthProjectDescriptionHelperText = `Max length is ${projectDescriptionMaxLength} characters`;
export const maxLengthProjectNameHelperText = `Max length is ${projectNameMaxLength} characters`;

// card
export const cardTitleMaxLengthHelperText = `Max length is ${cardTitleMaxLength} characters`;
export const keywordMaxLengthHelperText = `Max length is ${keywordMaxLength} characters`;
export const cardColorMaxLengthHelperText = `Max length is ${cardColorMaxLength} characters`;

// team
export const teamNameMaxLengthHelperText = `Max length is ${teamNameMaxLength} characters`;
