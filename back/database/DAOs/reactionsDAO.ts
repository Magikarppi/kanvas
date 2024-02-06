import { executeQuery } from "../database-service";
import { insertReaction } from "../queries/reactionsQueries";
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
