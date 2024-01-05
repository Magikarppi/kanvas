import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../models/userModels";

interface IInitialState {
    user: IUser | undefined | null;
    token: string | undefined | null;
    loadingUser: boolean;
}

const getInitialUser = (): IUser | null => {
    const userJSON = localStorage.getItem("user");
    return userJSON ? JSON.parse(userJSON) : null;
};

const getInitialToken = (): string | null => localStorage.getItem("token");

const initialState: IInitialState = {
    user: getInitialUser(),
    token: getInitialToken(),
    loadingUser: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<IUser | null>) {
            state.user = action.payload;
            if (action.payload) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
        },
        setLoading(state, action) {
            state.loadingUser = action.payload;
        },
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
            if (action.payload) {
                localStorage.setItem("token", action.payload);
            }
        },
        logOut(state) {
            state.user = null;
            state.token = null;
            state.loadingUser = false;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const { setUserInfo, setToken, setLoading, logOut } = userSlice.actions;

export default userSlice.reducer;
