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
    formatCardResponsiblePersons,
} from "../utils/utilities";
import { ICard, IResponsiblePerson, ICardResponsiblePerson } from "../../database/utils/interfaces";
import { UserRequest } from "../middleware/middleware";
import { 
    allCardResponsiblePersonsDAO, 
    addCardResponsiblePersonDAO, 
    deleteCardResponsiblePersonDAO,
    cardResponsiblePersonDataDAO, } from "../../database/DAOs/cardResponsibleDAO";
import { getProjectMembersByCardIdDAO } from "../../database/DAOs";
import { getUserByIdDAO } from "../../database/DAOs";


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
            orderIndex: req.body.orderIndex,
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
        id,
        title: req.body.title,
        subTitle: req.body.subTitle,
        description: req.body.description,
        status: req.body.status,
        creationDate: req.body.creationDate,
        dueDate: req.body.dueDate,
        attachments: req.body.attachments,
        inColumn: req.body.inColumn,
        projectId: req.body.projectId,
        orderIndex: req.body.orderIndex,
    };
    try {
        await updateCardDAO(id, card);
        res.status(HTTP_RESPONSE_CODES.OK).send(card);
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

cards.get("/responsible-persons/:id", async (req: UserRequest, res: Response) => {
    const cardId = req.params.id;
    try {
        const card = await getCardDAO(cardId);
        if (card) {
            const cardResponsiblePersons = await allCardResponsiblePersonsDAO(cardId);
            const formattedResponsiblePersons: ICardResponsiblePerson[] =
            formatCardResponsiblePersons(cardResponsiblePersons) || [];
    
            res.status(HTTP_RESPONSE_CODES.OK).send(formattedResponsiblePersons);  
        } else {
            res.status(HTTP_RESPONSE_CODES.NOT_FOUND).send(
                RESPONSE_MESSAGES.CARD_NOT_FOUND
            );
        }    
    } catch (error) {
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

cards.post("/add-responsible-person", async (req: UserRequest, res: Response) => {
    const {userId, cardId, id} = req.body;
    const isBodyPropertiesMissing = !userId || !cardId || !id;

    if (isBodyPropertiesMissing) {
        res
            .status(HTTP_RESPONSE_CODES.BAD_REQUEST)
            .send(RESPONSE_MESSAGES.INVALID_REQ_BODY);
        return;
    }
    try {     
        const card = await getCardDAO(req.body.cardId);
        
        if(!card) {
            res.status(HTTP_RESPONSE_CODES.NOT_FOUND).send(
                RESPONSE_MESSAGES.CARD_NOT_FOUND);
            return;
        }
        const projectMembers = await getProjectMembersByCardIdDAO(cardId);
        const isProjectMember = projectMembers?.some(
            (projectMember) => projectMember.user_id === userId
        );

        if(!isProjectMember) {
            res
                .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                .send("The user is not a member of this project");
            return;
        }
        /*
        const cardResponsiblePersons = await allCardResponsiblePersonsDAO(cardId);

        const isCardAlreadyMember = cardResponsiblePersons?.some(
            (person) => person.user_id === userId
        );

        if (isCardAlreadyMember) {
            res
                .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                .send("The user is already responsible for this card");
            return;
        }
*/
        const cardResponsiblePersonData: IResponsiblePerson = {
            id: id,
            userId: userId,
            cardId: cardId,               
        };

        await addCardResponsiblePersonDAO(cardResponsiblePersonData);
        const user = await getUserByIdDAO(cardResponsiblePersonData.userId);
        const formattedUser : ICardResponsiblePerson  = {
            cardResponsibleId: cardResponsiblePersonData.id,
            userId: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            picture: user.picture
        };
        res.status(HTTP_RESPONSE_CODES.OK).send(formattedUser);
    } catch (error) {
        res.status(HTTP_RESPONSE_CODES.SERVER_ERROR).send(
            RESPONSE_MESSAGES.SERVER_ERROR
        );
    }
});

cards.delete("/delete-responsible-person/:id", async (req: UserRequest, res: Response) => {
    const { id } = req.params;
    try {
        const found = await cardResponsiblePersonDataDAO(id);
        if(!found) {
            res
                .status(HTTP_RESPONSE_CODES.FORBIDDEN)
                .send("Responsible person not found");
            return;
        } else {
            await deleteCardResponsiblePersonDAO(id);
            return res.status(HTTP_RESPONSE_CODES.OK).send("Card responsible person deleted");
        }
    } catch (error) {
        console.error(error);
        return res
            .status(HTTP_RESPONSE_CODES.SERVER_ERROR)
            .send(RESPONSE_MESSAGES.SERVER_ERROR);
    }
});

export default cards;
