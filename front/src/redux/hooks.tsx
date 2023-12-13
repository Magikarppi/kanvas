import { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const selectToken = () => useAppSelector((state) => state.user.token);
export const selectUser = () => useAppSelector((state) => state.user.user);
