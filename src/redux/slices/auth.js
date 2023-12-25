import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
    userInfo: {}
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login:(state, action)=>{
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        toggleloading:(state, action)=>{
            state.isLoading = !state.isLoading;
        },
        setUserInfo:(state, action)=>{
            state.userInfo = action.payload;
        },
        setUserEmail:(state, action)=>{
            state.userInfo.email = action.payload;
        },
        resetAuthSlice:(state)=>{
            state.isLoggedIn = false;
            state.token = "";
            state.isLoading = false;
            state.userInfo = {};
        },
    }
});
export const {login, resetAuthSlice, toggleloading, setUserInfo, setUserEmail} = authSlice.actions;
export default authSlice.reducer;