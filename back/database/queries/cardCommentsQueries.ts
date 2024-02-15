export const getCardCommentsByProjectId =
    "SELECT card_comments.id, card_comments.card_id, card_comments.author, card_comments.comment_text, card_comments.time_added FROM card_comments INNER JOIN cards ON card_comments.card_id = cards.id WHERE cards.project_id = $1;";

export const insertCardComment =
    "INSERT INTO card_comments (id, card_id, author, comment_text, time_added) VALUES ($1, $2, $3, $4, $5) RETURNING *";

export const updateCardComment =
    "UPDATE card_comments SET comment_text = $1 WHERE id = $2 AND author= $3 RETURNING *;";

export const deleteCardComment =
    "DELETE FROM card_comments WHERE id = $1 AND author = $2 RETURNING *;";
