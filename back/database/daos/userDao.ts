import {
    insertNewUser,
    deleteUser,
    updateUser,
    getUserById,
    getUserByEmail,
    updatePassword,
} from "../queries/userQueries";
import { IUser, IUpdateUser } from "../utils/interfaces";
import { executeQuery } from "../database-service";

export const createNewUserDAO = async (user: IUser) => {
    const values = Object.values(user);
    await executeQuery(insertNewUser, values);
};

export const getUserDAO = async (id: string) => {
    const result = await executeQuery(getUserById, [id]);
    if (result) {
        return result.rows[0] as IUser | null;
    }
};

export const getUserEmailDAO = async (email: string) => {
    const result = await executeQuery(getUserByEmail, [email]);
    if (result) {
        return result.rows[0] as IUser | null;
    }
};

export const updateDAO = async (
    id: string,
    user: IUpdateUser
) => {
    const paramsArray = [
        user.firstName,
        user.lastName,
        user.email,
        user.phoneNumber,
        user.country,
        user.city,
        user.picture,
        user.isOnline,
        user.lastOnline,
        user.isOpenToWork,
        user.linkedinUsername,
        user.jobPitch,
        id,
    ];
    await executeQuery(updateUser, paramsArray);
};

export const updatePasswordDAO = async (id: string, password: string) => {
    const values = [id, password];
    await executeQuery(updatePassword, values);
};

export const deleteUserDAO = async (id: string) => {
    await executeQuery(deleteUser, [id]);
};
