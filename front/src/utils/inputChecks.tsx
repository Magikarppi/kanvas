import validator from "validator";

export const validEmail = (value: string) => {
    return validator.isEmail(value) ? true : false;
};

export const validatePasswordFormat = (password: string) => {
    // 8-50 characters long, at least one letter and one special character listed inside square brackets
    const passwordRegEx =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/\\-\\=-]).{8,50}$/;
    return passwordRegEx.test(password);
};

export const isEmpty = (value: string): boolean => value.trim().length < 1;

export function isValidUSDateFormat(dateString: string): boolean {
    // MM/DD/YYYY
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d{4}$/;
    return dateRegex.test(dateString);
}
export const isValidENDateFormat = (dateString: string):boolean => {
    const dateParts = dateString.split("/");
    if (dateParts.length !== 3) {
        return false;
    }
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);
    const isValidDate = !isNaN(day) && !isNaN(month) && !isNaN(year);
    const isValidFormat = isValidDate && day > 0 && (month > 0 && month <= 12) && year > 0;
    return isValidFormat;
  
};

export const isProjectDescriptionTooLong = (description: string): boolean =>
    description.length >= 500;
