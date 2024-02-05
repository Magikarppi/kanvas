import { executeQuery } from "../database-service";
import { insertCardComment } from "../queries/cardCommentsQueries";
import { ICardComment } from "../utils/interfaces";

export const insertCardCommentDAO = async (cardComment: ICardComment) => {
    const queryParams = [
        cardComment.id,
        cardComment.cardId,
        cardComment.author,
        cardComment.commentText,
        cardComment.timeAdded,
    ];

    const result = await executeQuery(insertCardComment, queryParams);
    if (result) {
        return result.rows[0];
    }
};
