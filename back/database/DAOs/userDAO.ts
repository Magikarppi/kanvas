import {
    insertUser,
    deleteUser,
    updateUser,
    getUserById,
    getUserByEmail,
    updatePassword,
    getExistingEmailConflict,
} from "../queries/userQueries";
import { IUser, IUpdateUser } from "../utils/interfaces";
import { executeQuery } from "../database-service";

export const insertUserDAO = async (user: IUser) => {
    const values = [
        user.id,
        user.firstName,
        user.lastName,
        user.email,
        user.passwordHash,
        user.phoneNumber,
        user.country,
        user.city,
        user.picture,
        user.accountCreationDate,
        user.isOnline,
        user.lastOnline,
        user.isOpenToWork,
        user.linkedinUsername,
        user.jobPitch,
    ];
    await executeQuery(insertUser, values);
};

export const getUserByIdDAO = async (id: string) => {
    const result = await executeQuery(getUserById, [id]);
    if (result) {
        return result.rows[0];
    }
};

export const getUserByEmailDAO = async (email: string) => {
    const result = await executeQuery(getUserByEmail, [email]);
    if (result) {
        return result.rows[0];
    }
};

export const getExistingEmailConflictDAO = async (
    userId: string,
    email: string
) => {
    const queryParameters = [userId, email];
    const result = await executeQuery(
        getExistingEmailConflict,
        queryParameters
    );
    if (result) {
        return result.rows[0];
    }
};

export const updateUserDAO = async (id: string, user: IUpdateUser) => {
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
    const result = await executeQuery(updateUser, paramsArray);
    if (result) {
        return result.rows[0];
    }
};

export const updatePasswordDAO = async (id: string, password: string) => {
    const values = [id, password];
    await executeQuery(updatePassword, values);
};

export const deleteUserDAO = async (id: string) => {
    await executeQuery(deleteUser, [id]);
};
