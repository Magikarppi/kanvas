export const userReducer = (state = {}, action: any) => {
    if(action.type == "setUser"){
        state = action.payload;
        return state;
    }
    return state;
};