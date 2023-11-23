import { executeQuery } from "../database-service";
import { insertProject } from "../queries/projectQueries";
import { IProject } from "../utils/interfaces";

export const addProjectDao = async ({
    id,
    name,
    description,
    isPublic,
    creationDate,
    endDate,
    theme,
    picture,
}: IProject) => {
    const result = await executeQuery(insertProject, [
        id,
        name,
        description,
        isPublic,
        creationDate,
        endDate,
        theme,
        picture,
    ]);

    if (result) {
        return result.rows[0] as IProject | null;
    }
};
