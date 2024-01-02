import express, { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { v4 as uuid } from "uuid";

import {
    updateCardDAO,
    insertCardDAO,
    deleteCardDAO,
    getCardDAO,
    getProjectMemberDAO,
} from "../../database/DAOs";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    getCurrentTimestamp,
} from "../utils/utilities";
import { ICard } from "../../database/utils/interfaces";
import { UserRequest } from "../middleware/middleware";

const cards = express.Router();

cards.post("", async (req: UserRequest, res: Response) => {
    try {
        const { value: userId } = req.user as JwtPayload;

        const projectMember = await getProjectMemberDAO(
            userId,
            req.body.projectId
        );
        if (!projectMember) {
            return res
                .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                .send(RESPONSE_MESSAGES.FORBIDDEN);
        }

        const card: ICard = {
            id: uuid(),
            projectId: req.body.projectId,
            title: req.body.title,
            subTitle: req.body.subTitle,
            description: req.body.description,
            status: req.body.status,
            creationDate: getCurrentTimestamp(),
            dueDate: req.body.dueDate,
            attachments: req.body.attachments,
            inColumn: req.body.inColumn,
        };

        await insertCardDAO(card);
        res.status(HTTP_RESPONSE_CODES.CREATED).send(card);
    } catch (error) {
        console.error(error);
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

cards.put("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const card: ICard = {
        id: req.body.id,
        title: req.body.title,
        subTitle: req.body.subTitle,
        description: req.body.description,
        status: req.body.status,
        creationDate: req.body.creationDate,
        dueDate: req.body.dueDate,
        attachments: req.body.attachments,
        inColumn: req.body.inColumn,
        projectId: req.body.projectId,
    };
    try {
        await updateCardDAO(id, card);
        res.status(HTTP_RESPONSE_CODES.OK).send();
    } catch (error) {
        console.error(error);
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

cards.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const card: ICard = await getCardDAO(id);
        if (card) {
            res.status(HTTP_RESPONSE_CODES.OK).json(card);
        } else {
            res.status(HTTP_RESPONSE_CODES.NOT_FOUND).send(
                RESPONSE_MESSAGES.CARD_NOT_FOUND
            );
        }
    } catch (error) {
        console.error(error);
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

cards.delete("/:id", async (req: UserRequest, res: Response) => {
    try {
        const { id } = req.params;
        const card = await getCardDAO(id);
        if (card) {
            await deleteCardDAO(id);
            return res.status(HTTP_RESPONSE_CODES.OK).send("Card deleted");
        } else {
            res.status(HTTP_RESPONSE_CODES.NOT_FOUND).send(
                RESPONSE_MESSAGES.CARD_NOT_FOUND
            );
        }
    } catch (error) {
        console.error(error);
        return res
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

export default cards;
