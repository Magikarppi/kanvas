import { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "./userReducer";
import { AnyAction } from "redux";
import { IUserUpdateWithoutId } from "../models/userModels";
import { ThunkAction } from "redux-thunk";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;


export const selectToken = () => useAppSelector((state) => state.user.token);
export const selectUser = () => useAppSelector((state) => state.user.user);
export const updateUserHook = (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string | null,
    country: string | null,
    city: string | null,
    picture: string,
    isOpenToWork: boolean,
    linkedinUsername: string | null,
    jobPitch: string | null
): ThunkAction<void, RootState, unknown, AnyAction> => {
    const user: IUserUpdateWithoutId = {
        firstName,
        lastName,
        email,
        phoneNumber,
        country,
        city,
        picture,
        isOpenToWork,
        linkedinUsername,
        jobPitch
    };
  
    return (dispatch) => {
        dispatch(updateUser(user));
    };
};
  
