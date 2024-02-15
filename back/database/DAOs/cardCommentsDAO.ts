import { executeQuery } from "../database-service";
import {
    deleteCardComment,
    getCardCommentsByProjectId,
    insertCardComment,
    updateCardComment,
} from "../queries/cardCommentsQueries";
import { ICardComment } from "../utils/interfaces";

export const getCardCommentsByProjectIdDAO = async (projectId: string) => {
    const result = await executeQuery(getCardCommentsByProjectId, [projectId]);
    if (result) {
        return result.rows;
    }
};

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

export const updateCardCommentDAO = async (
    newCommentText: string,
    commentId: string,
    authorId: string
) => {
    const queryParams = [newCommentText, commentId, authorId];

    const result = await executeQuery(updateCardComment, queryParams);
    if (result) {
        return result.rows[0];
    }
};

export const deleteCardCommentDAO = async (
    commentId: string,
    authorId: string
) => {
    const queryParams = [commentId, authorId];

    const result = await executeQuery(deleteCardComment, queryParams);
    if (result) {
        return result.rows[0];
    }
};
