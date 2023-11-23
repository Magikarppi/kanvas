import axios from "axios";
import {
    LoginBody,
    NewUserBody,
    UpdatePassWordBody,
    UpdateUserBodyWithOutPassword,
} from "../models/userModels";

const createClient = (token?: string) =>
    axios.create({
        baseURL: "http://localhost:5000/users/",
        headers: { Authorization: `Bearer ${token}` },
    });

const userRequests = {
    registerUser: async (registerInformation: NewUserBody) => {
        const client = createClient();
        const response = await client.post("signup", registerInformation);
        return response;
    },

    loginUser: async (loginInfo: LoginBody) => {
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
        userInformation: UpdateUserBodyWithOutPassword
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
        updateInformation: UpdatePassWordBody
    ) => {
        const client = createClient(token);
        const response = await client.put(
            `${updateInformation.id}/password`,
            updateInformation.password
        );
        return response;
    },

    deleteSingleUser: async (token: string, userId: string) => {
        const client = createClient(token);
        const response = await client.delete(`${userId}`);
        return response;
    },
};

export default userRequests;
