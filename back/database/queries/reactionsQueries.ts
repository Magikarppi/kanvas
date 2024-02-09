export const insertReaction =
    "INSERT INTO reactions (id, user_id, card_comment, emoji) VALUES ($1, $2, $3, $4) RETURNING *;";

export const deleteReaction =
    "DELETE FROM reactions WHERE id = $1 AND user_id = $2 RETURNING *;";
