import express, { Response } from "express";
import { v4 as uuid } from "uuid";
import { ICardComment, ICardCommentDB } from "../../database/utils/interfaces";
import { UserRequest } from "../middleware/middleware";
import { JwtPayload } from "jsonwebtoken";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    formatCardComments,
    getCurrentTimestamp,
} from "../utils/utilities";
import {
    deleteCardCommentDAO,
    getCardCommentsByProjectIdDAO,
    getProjectMembersByCardIdDAO,
    getProjectMembersDAO,
    insertCardCommentDAO,
    updateCardCommentDAO,
} from "../../database/DAOs";

const comments = express.Router();

comments.get(
    "/:projectid",
    async (request: UserRequest, response: Response) => {
        const projectId = request.params.projectid;

        try {
            const { value: userId } = request.user as JwtPayload;

            const projectMembers = await getProjectMembersDAO(projectId);
            const userNotInProjectMembers = projectMembers?.every(
                (projectMember) => projectMember.id !== userId
            );
            if (userNotInProjectMembers) {
                response
                    .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                    .send(RESPONSE_MESSAGES.FORBIDDEN);
                return;
            }

            const projectCardComments = await getCardCommentsByProjectIdDAO(
                projectId
            );
            if (projectCardComments) {
                const formattedComments =
                    formatCardComments(projectCardComments);
                response.status(HTTP_RESPONSE_CODES.OK).send(formattedComments);
            } else {
                response.status(HTTP_RESPONSE_CODES.OK).send([]);
            }
        } catch (error) {
            response
                .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
                .send(RESPONSE_MESSAGES.SERVER_ERROR);
        }
    }
);

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
            .send(RESPONSE_MESSAGES.COMMENT_TEXT_EMPTY);
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

            const formattedComment = formatCardComments(addedComment);
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

comments.put("/:id", async (request: UserRequest, response: Response) => {
    const commentId = request.params.id;
    const { commentText } = request.body;

    const isCommentTextMissing = !commentText;
    if (isCommentTextMissing) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
        return;
    }

    const isCommentTextEmpty = commentText.trim().length === 0;
    if (isCommentTextEmpty) {
        response
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.COMMENT_TEXT_EMPTY);
        return;
    }

    try {
        const { value: userId } = request.user as JwtPayload;

        const updatedCardComment = await updateCardCommentDAO(
            commentText,
            commentId,
            userId
        );

        if (updatedCardComment) {
            const formattedComment = formatCardComments(updatedCardComment);
            response.status(HTTP_RESPONSE_CODES.OK).send(formattedComment);
        } else {
            response
                .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                .send(
                    "Cannot update: Wrong comment id or you are not the comment author"
                );
        }
    } catch (error) {
        console.error(error);
        response
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

comments.delete("/:id", async (request: UserRequest, response: Response) => {
    try {
        const commentId = request.params.id;
        const { value: userId } = request.user as JwtPayload;

        const deletedComment = await deleteCardCommentDAO(commentId, userId);
        if (deletedComment) {
            response.sendStatus(HTTP_RESPONSE_CODES.OK);
        } else {
            response
                .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                .send(
                    "Cannot delete: Wrong comment id or you are not the comment author"
                );
        }
    } catch (error) {
        console.error(error);
        response
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

export default comments;
