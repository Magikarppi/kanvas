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
        updateUser(state, action: PayloadAction<IUserUpdateWithoutId>) {
            if (state.user) {
                state.user.firstName = action.payload.firstName;
                state.user.lastName = action.payload.lastName;
                state.user.email = action.payload.email;
                state.user.phoneNumber = action.payload.phoneNumber;
                state.user.country = action.payload.country;
                state.user.city = action.payload.city;
                state.user.picture = action.payload.picture;
                state.user.isOpenToWork = action.payload.isOpenToWork;
                state.user.linkedinUsername = action.payload.linkedinUsername;
                state.user.jobPitch = action.payload.jobPitch;
            }
        },
        setToken(state, action){
            state.token = action.payload;
        }
    },
});

export const { setUserInfo, setToken, updateUser, setLoading } = userSlice.actions;

export default userSlice.reducer;