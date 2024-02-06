import express, { Response } from "express";
import { v4 as uuid } from "uuid";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    formatReaction,
} from "../utils/utilities";
import { JwtPayload } from "jsonwebtoken";
import { UserRequest } from "../middleware/middleware";
import { getProjectMembersByCommentIdDAO } from "../../database/DAOs";
import { IReaction } from "../../database/utils/interfaces";
import { insertReactionDAO } from "../../database/DAOs/reactionsDAO";

const reactions = express.Router();

reactions.post("/", async (request: UserRequest, response: Response) => {
    const { cardComment, emoji } = request.body;

    const isBodyPropertiesMissing = !cardComment || !emoji;
    if (isBodyPropertiesMissing) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
        return;
    }

    const emojiRegEx = /^\p{Emoji}$/u;
    const isValidEmoji = emojiRegEx.test(emoji);
    if (!isValidEmoji) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send("Invalid emoji, please use another one");
        return;
    }

    try {
        const { value: userId } = request.user as JwtPayload;

        const projectMembers = await getProjectMembersByCommentIdDAO(
            cardComment
        );
        const isProjectMember = projectMembers?.some(
            (projectMember) => projectMember.user_id === userId
        );
        if (!isProjectMember) {
            response
                .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                .send(RESPONSE_MESSAGES.FORBIDDEN);
            return;
        }

        const reactionToAdd: IReaction = {
            id: uuid(),
            userId: userId,
            cardComment: cardComment,
            emoji: emoji,
        };

        const storedReaction = await insertReactionDAO(reactionToAdd);
        const formattedReaction: IReaction = formatReaction(storedReaction);
        response.json(formattedReaction);
    } catch (error) {
        console.error(error);
        response
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

export default reactions;
