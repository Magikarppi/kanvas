import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createClient = (token?: string) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: { Authorization: `Bearer ${token}` },
    });
};
