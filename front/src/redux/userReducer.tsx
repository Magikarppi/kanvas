import { createSlice } from '@reduxjs/toolkit'
import { ILoginBody } from '../models/userModels';
import userService from '../services/userService';
import { AppDispatch } from './store';
import {IUser} from '../models/userModels';

interface IInitialState {
    user: IUser | undefined | null; 
    token: string | undefined | null;
    loadingUser: boolean;
}
const initialState: IInitialState = {user: null, token: null, loadingUser: false}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action) {
            state.loadingUser = action.payload;
        },
    },
})

export const { setUserInfo, setLoading } = userSlice.actions;

export const signInUser = (userPayload: ILoginBody) => {
    return async (dispatch: AppDispatch) => {
        await userService
            .loginUser(userPayload)
            .then((response) => dispatch(setUserInfo(response)))
            .catch((error) => console.log(error))
    }
};

export default userSlice.reducer;