import express, { Request, Response } from "express";
import { cardsDaoUpdate, createCardDAO, getCardWithId } from "../../database/daos/cardsDao";
import {
    HTTP_RESPONSE_CODES,
    RESPONSE_MESSAGES,
    getCurrentTimestamp,
} from "../utils/utilities";
import { ICard } from "../../database/utils/interfaces";
import { v4 as uuid } from "uuid";
import { UserRequest } from "../middleware/middleware";
import { getUserEmailDAO } from "../../database/daos/userDao";
import { getProjectMemberDAO } from "../../database/daos/projectsDao";
import { JwtPayload } from "jsonwebtoken";

const cards = express.Router();

cards.post("", async (req: UserRequest, res: Response) => {
    try {
        const userPayLoad = req.user as JwtPayload;
        const userEmail = userPayLoad.value;

        const user = await getUserEmailDAO(userEmail);
        if (!user) {
            return res
                .status(HTTP_RESPONSE_CODES.NOT_FOUND)
                .send(RESPONSE_MESSAGES.USER_NOT_FOUND);
        }

        const projectMember = await getProjectMemberDAO(
            user.id,
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

        await createCardDAO(card);
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
        await cardsDaoUpdate(id, card);
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
        const card: ICard = await getCardWithId(id);
        res.status(HTTP_RESPONSE_CODES.OK).json(card);
    } catch (error) {
        console.error(error);
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});
export default cards;
