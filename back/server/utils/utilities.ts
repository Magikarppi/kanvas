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

export const HTTP_RESPONSE_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
};

export const RESPONSE_MESSAGES = {
    SERVER_ERROR: "An unexpected error occurred while processing your request",
    FNAME_LNAME_EMPTY: "First name or last name cannot be empty",
    FORBIDDEN: "You have no authorization to do this",
    INVALID_EMAIL_FORMAT: "Invalid Email address format",
    INVALID_REQ_BODY: "One or more properties missing from the request body",
    INVALID_UNAME_PWORD: "Invalid username or password",
    USER_NOT_FOUND: "User with that id was not found",
    TEAM_NOT_FOUND: "Team with that id was not found",
    CARD_NOT_FOUND: "Card with that id was not found",
};

