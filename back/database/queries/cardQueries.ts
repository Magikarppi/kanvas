export const insertCard =
    "INSERT INTO cards (id, project_id, title, sub_title, description, status, creation_date, due_date, attachments, in_column, order_index) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

export const updateCard = `UPDATE cards
  SET
    "project_id" = $1,
    "title" = $2,
    "sub_title" = $3,
    "description" = $4,
    "status" = $5,
    "due_date" = $6,
    "attachments" = $7,
    "in_column" = $8,
    "order_index" = $9
  WHERE
      "id" = $10;`;

export const deleteCard = "DELETE FROM cards WHERE id = $1";

export const getCard = "SELECT * FROM cards WHERE id = $1";

export const getProjectCards =
    "SELECT cards.* FROM cards WHERE cards.project_id = $1;";
