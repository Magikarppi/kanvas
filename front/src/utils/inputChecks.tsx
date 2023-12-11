import validator from "validator";

export const validEmail = (value: string) => {
    return validator.isEmail(value) ? true : false;
};

export const validatePasswordFormat = (password: string) => {
    // 8-50 characters long, at least one number and one special character listed inside square brackets
    const passwordRegEx =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/\\-\\=-]).{8,50}$/;
    return passwordRegEx.test(password);
};
