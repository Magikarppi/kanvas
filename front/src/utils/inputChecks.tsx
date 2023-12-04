import validator from "validator";

export const validEmail = (value: string) => {
    return validator.isEmail(value) ? true : false;
};
