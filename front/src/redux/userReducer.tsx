import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserUpdateWithoutId } from "../models/userModels";

interface IInitialState {
    user: IUser | undefined | null; 
    token: string | undefined | null;
    loadingUser: boolean;
}
const initialState: IInitialState = {user: null, token: null, loadingUser: false};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action) {
            state.loadingUser = action.payload;
        },
        setToken(state, action){
            state.token = action.payload;
        }
    },
});

export const { setUserInfo, setToken, setLoading } = userSlice.actions;

export default userSlice.reducer;