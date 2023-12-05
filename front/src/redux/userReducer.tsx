export const userReducer = (state = {}, action: any) => {
    if(action.type == "setUser"){
        state = action.payload;
        return state;
    }
    return state;
};
import { createSlice } from '@reduxjs/toolkit'
import { ILoginBody } from '../models/userModels';
import userService from '../services/userService';
import { AppDispatch } from '../store';

const initialState ={
    user: null,
    loadingUser: null,
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            action.payload = state.user;
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