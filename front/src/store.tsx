import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./redux/userReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
    }
});

export default store;