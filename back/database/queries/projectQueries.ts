export const insertProject = `
INSERT INTO projects (
    id, name, description, is_public, project_creation_date, project_end_date, theme, picture
    ) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *
`;

export const getProjectById = "SELECT * FROM projects WHERE id = $1";

export const getProjectMemberByProjectId = "SELECT * FROM project_members WHERE user_id = $1 AND project_id = $2";
