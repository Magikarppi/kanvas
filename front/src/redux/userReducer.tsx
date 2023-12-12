import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../models/userModels";
import { AppDispatch } from "./store";

interface IInitialState {
    user: IUser | undefined | null;
    token: string | undefined | null;
}
const initialState: IInitialState = {
    user: null,
    token: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
    },
});

export const { setUserInfo, setToken } = userSlice.actions;

export const signOutUser = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(setToken(""));
    };
};
export default userSlice.reducer;
