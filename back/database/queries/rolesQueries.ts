export const insertProjectAdmin = "INSERT INTO roles (project_id, user_id, role) VALUES ($1, $2, $3);";

export const getProjectAdmin =
    "SELECT * FROM roles WHERE user_id = $1 AND project_id = $2 AND role = $3";

export const removeUserRole =
    "DELETE FROM roles WHERE user_id = $1 AND project_id = $2";
