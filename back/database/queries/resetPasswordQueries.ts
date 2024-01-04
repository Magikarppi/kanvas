export const getResetPasswordRequestByToken  = "SELECT * FROM reset_password_requests WHERE token = $1";

export const insertResetPasswordRequest = "INSERT INTO reset_password_requests (token, user_id) values($1, $2)";

export const deleteResetPasswordRequest = "DELETE FROM reset_password_requests WHERE user_id = $1";

export const updateResetPasswordRequest = "UPDATE reset_password_requests SET token = $1 WHERE user_id = $2";