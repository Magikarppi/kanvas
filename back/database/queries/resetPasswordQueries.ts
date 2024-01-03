export const getResetPasswordRequestByToken  = "SELECT * FROM reset_password_requests WHERE token = $1";

export const insertResetPasswordRequest = "INSERT INTO reset_password_requests (token, userID) values($1, $2)";