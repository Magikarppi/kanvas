import express, { Request, Response } from "express";
import { cardsDaoUpdate } from "../database/daos/cardsDao";

const cards = express.Router();

cards.put("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const card = req.body;
    try {
        await cardsDaoUpdate(id, card);
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send("There was an error updating user information");
    }
});
export default cards;
