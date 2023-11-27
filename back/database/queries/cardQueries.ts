export const updateCard = `UPDATE your_table_name
  SET
    "project_id" = $1,
    "title" = $2,
    "sub_title" = $3,
    "description" = $4,
    "status" = $5,
    "due_date" = $6,
    "attachments" = $7,
    "in_column" = $8
  WHERE
      "id" = $9;`;