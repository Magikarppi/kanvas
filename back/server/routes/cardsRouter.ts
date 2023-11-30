import express, { Request, Response } from "express";
import { cardsDaoUpdate } from "../../database/daos/cardsDao";
import { HTTP_RESPONSE_CODES, RESPONSE_MESSAGES } from "../utils/utilities";
import { ICard } from "../../database/utils/interfaces";

const cards = express.Router();

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
        projectId: req.body.projectId
    };
    try {
        await cardsDaoUpdate(id, card);
        res.status(HTTP_RESPONSE_CODES.OK).send();
    } catch (error) {
        console.error(error);
        res
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});
export default cards;