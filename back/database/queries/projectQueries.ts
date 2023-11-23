export const insertProject = `
INSERT INTO projects (
    id, name, description, is_public, project_creation_date, project_end_date, theme, picture
    ) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *
`;
