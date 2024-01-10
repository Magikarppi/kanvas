export const insertProject = `
INSERT INTO projects (
    id, name, description, is_public, project_creation_date, project_end_date, theme, picture
    ) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *
`;

export const getProject = "SELECT * FROM projects WHERE id = $1";

export const deleteProject = "DELETE FROM projects WHERE id = $1";

export const insertProjectMember = "INSERT INTO project_members (id, user_id, project_id) VALUES ($1, $2, $3);";

export const getProjectMember =
    "SELECT * FROM project_members WHERE user_id = $1 AND project_id = $2";

export const getProjectMembers = "SELECT users.first_name, users.last_name, users.email FROM users INNER JOIN project_members ON users.id = project_members.user_id WHERE project_members.project_id = $1;";

export const getUserProjects =
    "SELECT projects.* FROM project_members INNER JOIN users ON project_members.user_id = users.id INNER JOIN projects ON project_members.project_id = projects.id WHERE users.id = $1";

export const getUserFavoriteProjects =
    "SELECT favorite_projects.id as favorite_project_id, projects.* FROM projects INNER JOIN favorite_projects ON projects.id = favorite_projects.project_id WHERE favorite_projects.user_id = $1;";

export const updateProject = `
    UPDATE projects
        SET
            name = $1,
            description = $2,
            is_public = $3,
            project_creation_date = $4,
            project_end_date = $5,
            theme = $6,
            picture = $7
        WHERE id = $8
`;

export const deleteFavoriteProject = "DELETE FROM favorite_projects WHERE id = $1";
export const insertProjectFavoriteProjects = "INSERT INTO favorite_projects (id, project_id, user_id) VALUES ($1, $2, $3);";
