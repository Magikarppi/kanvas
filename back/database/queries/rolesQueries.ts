export const getProjectAdmin =
    "SELECT * FROM roles WHERE user_id = $1 AND project_id = $2 AND role = $3";

export const removeUserRole =
    "DELETE FROM roles WHERE user_id = $1 AND project_id = $2";
