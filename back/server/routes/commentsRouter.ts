import express, { Response } from "express";
import { v4 as uuid } from "uuid";
import { ICardComment, ICardCommentDB } from "../../database/utils/interfaces";
import { UserRequest } from "../middleware/middleware";
import { JwtPayload } from "jsonwebtoken";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    formatCardComment,
    getCurrentTimestamp,
} from "../utils/utilities";
import {
    getProjectMembersByCardIdDAO,
    insertCardCommentDAO,
} from "../../database/DAOs";

const comments = express.Router();

comments.post("/", async (request: UserRequest, response: Response) => {
    const { commentText, cardId } = request.body;

    const isReqBodyMissing = !commentText || !cardId;
    if (isReqBodyMissing) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
        return;
    }

    const isCommentTextEmpty = commentText.trim().length === 0;
    if (isCommentTextEmpty) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send("Comment text cannot be empty");
        return;
    }

    try {
        const { value: userId } = request.user as JwtPayload;
        const projectMembers = await getProjectMembersByCardIdDAO(cardId);

        const isProjectMember = projectMembers?.some(
            (projectMember) => projectMember.user_id === userId
        );

        if (isProjectMember) {
            const commentToAdd: ICardComment = {
                id: uuid(),
                cardId: cardId,
                author: userId,
                commentText: commentText,
                timeAdded: getCurrentTimestamp(),
            };
            const addedComment: ICardCommentDB = await insertCardCommentDAO(
                commentToAdd
            );

            const formattedComment = formatCardComment(addedComment);
            response.json(formattedComment);
        } else {
            response
                .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                .send(RESPONSE_MESSAGES.FORBIDDEN);
        }
    } catch (error) {
        console.error(error);
        response
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

export default comments;
