import axios from "axios";
import { LoginBody, NewUserBody, UpdatePassWordBody, UpdateUserBodyWithOutPassword } from "../models/userModels";

const usersBaseUrl = "http://localhost:5000/users/";

const userRequests = {
    registerUser: async (registerInformation: NewUserBody) => {
        const request = axios.post(
            `${usersBaseUrl}signup`,
            registerInformation
        );
        const response = await request;
        return response;
    },

    loginUser: async (loginInfo: LoginBody) => {
        const request = axios.post(`${usersBaseUrl}login`, loginInfo);
        const response = await request;
        return response.data;
    },

    getSingleUser: async (userId: string) => {
        const request = axios.get(`${usersBaseUrl}${userId}`);
        const response = await request;
        return response.data;
    },

    updateUser: async (userInformation: UpdateUserBodyWithOutPassword) => {
        const request = axios.put(
            `${usersBaseUrl}${userInformation.id}`,
            userInformation
        );
        const response = await request;
        return response;
    },

    updatePassword: async (updateInformation: UpdatePassWordBody) => {
        const request = axios.put(
            `${usersBaseUrl}${updateInformation.id}/password`,
            updateInformation.password
        );
        const response = await request;
        return response;
    },

    deleteSingleUser: async (userId: string) => {
        const request = axios.delete(`${usersBaseUrl}${userId}`);
        const response = await request;
        return response;
    },
};

export default userRequests;
