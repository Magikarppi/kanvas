export const insertProjectMember =
    "INSERT INTO project_members (id, user_id, project_id) VALUES ($1, $2, $3);";

export const getProjectMember =
    "SELECT * FROM project_members WHERE user_id = $1 AND project_id = $2";

export const getProjectMembers =
    "SELECT users.id, users.first_name, users.last_name, users.email FROM users INNER JOIN project_members ON users.id = project_members.user_id WHERE project_members.project_id = $1;";
