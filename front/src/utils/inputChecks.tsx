import validator from "validator";

export const validEmail = (value: string) => {
  return validator.isEmail(value) ? true : false;
};

export const validPassword = (value: string) => {
  if(value.length < 8){
    return true;
  } else {
    return false;
  }
};