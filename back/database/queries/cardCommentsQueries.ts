export const insertCardComment =
    "INSERT INTO card_comments (id, card_id, author, comment_text, time_added) VALUES ($1, $2, $3, $4, $5) RETURNING *";
