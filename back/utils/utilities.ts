export const getCurrentTimestamp = (): Date => {
    const date = new Date();

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return new Date(timestamp);
};

export const validateEmail = (email: string): boolean => {
    const validateEmailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return validateEmailRegEx.test(email);
};
