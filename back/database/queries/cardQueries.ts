export const createCard =
    "INSERT INTO cards (id, project_id, title, sub_title, description, status, creation_date, due_date, attachments, in_column) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";

export const updateCard = `UPDATE cards
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

export const deleteCard = "DELETE FROM cards WHERE id = $1";
