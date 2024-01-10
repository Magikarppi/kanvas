import { executeQuery } from "../database-service";
import { getResetPasswordRequestByUserId, insertResetPasswordRequest, deleteResetPasswordRequest, updateResetPasswordRequest } from "../queries/resetPasswordQueries";
import { IResetPasswordRequest } from "../utils/interfaces";

export const getResetPasswordRequestDAO = async(uuid: string) => {
    const result = await executeQuery(getResetPasswordRequestByUserId, [uuid]);
    if (result) {
        return result.rows[0];
    }
};

export const insertResetPasswordRequestDAO = async(resetPasswordRequest: IResetPasswordRequest) => {
    const {token, userID} = resetPasswordRequest;
    await executeQuery(insertResetPasswordRequest, [token, userID]);
};

export const deleteResetPasswordRequestDAO = async(id: string) => {
    await executeQuery(deleteResetPasswordRequest, [id]);
};

export const updateResetPasswordRequestDAO = async(resetPasswordRequest: IResetPasswordRequest) => {
    const {userID, token} = resetPasswordRequest;
    await executeQuery(updateResetPasswordRequest, [token, userID]);
};


