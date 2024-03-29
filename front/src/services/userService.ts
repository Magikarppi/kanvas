import {
    ILoginBody,
    INewUserBody,
    IUpdatePasswordBody,
    IUpdateUser,
} from "../models/userModels";
import { createClient } from "../utils/axiosUtils";

const userRequests = {
    registerUser: async (registerInformation: INewUserBody) => {
        const client = createClient();
        const response = await client.post(
            "/users/signup",
            registerInformation
        );
        return response;
    },

    loginUser: async (loginInfo: ILoginBody) => {
        const client = createClient();
        const response = await client.post("/users/login", loginInfo);
        return response.data;
    },

    getSingleUser: async (token: string, userId: string) => {
        const client = createClient(token);
        const response = await client.get(`/users/${userId}`);
        return response.data;
    },

    updateUser: async (token: string, userInformation: IUpdateUser) => {
        const client = createClient(token);
        const response = await client.put(
            `/users/${userInformation.id}`,
            userInformation
        );
        return response.data;
    },

    updatePassword: async (
        token: string,
        changePasswordBody: IUpdatePasswordBody
    ) => {
        const client = createClient(token);
        const response = await client.put(
            `/users/${changePasswordBody.id}/password`,
            changePasswordBody
        );
        return response;
    },

    deleteSingleUser: async (token: string, userId: string) => {
        const client = createClient(token);
        const response = await client.delete(`/users/${userId}`);
        return response;
    },

    forgotPassword: async (email: string) => {
        const client = createClient();
        const response = await client.post("/users/forgot-password", {
            email: email,
        });
        return response;
    },

    newPassword: async (
        token: string,
        newPasswordBody: Pick<
            IUpdatePasswordBody,
            "newPassword" | "newPasswordConfirmation"
        >
    ) => {
        const client = createClient();
        const response = await client.put(`/users/reset-password/${token}`, {
            ...newPasswordBody,
        });
        return response.data;
    },

    addProfileImage: async (token: string, image: string | ArrayBuffer) => {
        const client = createClient(token);
        const response = await client.post("/users/profile-image", {
            image,
        });
        return response.data;
    },
};

export default userRequests;
