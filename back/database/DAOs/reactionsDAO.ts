import { executeQuery } from "../database-service";
import { deleteReaction, insertReaction } from "../queries/reactionsQueries";
import { IReaction } from "../utils/interfaces";

export const insertReactionDAO = async (reaction: IReaction) => {
    const queryParameters = [
        reaction.id,
        reaction.userId,
        reaction.cardComment,
        reaction.emoji,
    ];
    const result = await executeQuery(insertReaction, queryParameters);
    if (result) {
        return result.rows[0];
    }
};

export const deleteReactionDAO = async (reactionId: string, userId: string) => {
    const result = await executeQuery(deleteReaction, [reactionId, userId]);
    if (result) {
        const deletedReaction = result.rows[0];
        return deletedReaction;
    }
};
