import { 
    allcardResponsiblePersons,
    addCardResponsiblePerson, 
    deleteCardResponsiblePerson,
    cardResponsiblePersonData,
} from "../queries/cardResponsibleQueries";
import { executeQuery } from "../database-service";
import { IResponsiblePerson } from "../utils/interfaces";

export const allCardResponsiblePersonsDAO = async (cardId: string) => {
    const result = await executeQuery(allcardResponsiblePersons, [cardId]);
    if (result) {
        return result.rows;
    } 
};

export const cardResponsiblePersonDataDAO = async (id: string) => {
    const result = await executeQuery(cardResponsiblePersonData, [id]);
    if (result) {
        return result.rows[0];
    } 
};

export const addCardResponsiblePersonDAO = async (responsiblePerson: IResponsiblePerson) => {
    const queryParameters = [
        responsiblePerson.id,
        responsiblePerson.userId,
        responsiblePerson.cardId,
    ];
    await executeQuery(addCardResponsiblePerson, queryParameters);
};

export const deleteCardResponsiblePersonDAO = async (id: string) => {
    const queryParameters = [id];
    await executeQuery(deleteCardResponsiblePerson, queryParameters);
};
