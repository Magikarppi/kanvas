export const insertPlaceholderColumns = `
    INSERT INTO project_columns (id, project_id, column_name, order_index) 
    VALUES ($1, $2, $3, $4), ($5, $6, $7, $8), ($9, $10, $11, $12)
`;

export const insertProjectColumn =
    "INSERT INTO project_columns (id, project_id, column_name, order_index) VALUES ($1, $2, $3, $4)";

export const getProjectColumns =
    "SELECT project_columns. * FROM project_columns WHERE project_columns.project_id = $1;";

export const getProjectColumn = `
    SELECT * FROM project_columns WHERE id = $1
`;

export const updateProjectColumn = `
    UPDATE project_columns
    SET "column_name" = $1, "order_index" = $2
    WHERE id = $3
`;

export const deleteProjectColumn = "DELETE FROM project_columns WHERE id = $1";
