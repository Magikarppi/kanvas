export const insertReaction =
    "INSERT INTO reactions (id, user_id, card_comment, emoji) VALUES ($1, $2, $3, $4) RETURNING *;";
