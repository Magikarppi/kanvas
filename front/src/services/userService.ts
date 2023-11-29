import axios from "axios";
import {
    ILoginBody,
    INewUserBody,
    IUpdatePasswordBody,
    IUpdateUserBodyWithoutPassword,
} from "../models/userModels";

const createClient = (token?: string) =>
    axios.create({
        baseURL: "http://localhost:5000/users/",
        headers: { Authorization: `Bearer ${token}` },
    });

const userRequests = {
    registerUser: async (registerInformation: INewUserBody) => {
        const client = createClient();
        const response = await client.post("signup", registerInformation);
        return response;
    },

    loginUser: async (loginInfo: ILoginBody) => {
        const client = createClient();
        const response = await client.post("login", loginInfo);
        return response.data;
    },

    getSingleUser: async (token: string, userId: string) => {
        const client = createClient(token);
        const response = await client.get(`${userId}`);
        return response.data;
    },

    updateUser: async (
        token: string,
        userInformation: IUpdateUserBodyWithoutPassword
    ) => {
        const client = createClient(token);
        const response = await client.put(
            `${userInformation.id}`,
            userInformation
        );
        return response;
    },

    updatePassword: async (
        token: string,
        changePasswordBody: IUpdatePasswordBody
    ) => {
        const client = createClient(token);
        const response = await client.put(
            `${changePasswordBody.id}/password`,
            changePasswordBody
        );
        return response;
    },

    deleteSingleUser: async (token: string, userId: string) => {
        const client = createClient(token);
        const response = await client.delete(`${userId}`);
        return response;
    },

    newPassword: async (userId: string, email: string) => {
        const client = createClient();
        const response = await client.put(`${userId}/forgot-password`, {
            email: email,
        });
        return response;
    },
};

export default userRequests;
