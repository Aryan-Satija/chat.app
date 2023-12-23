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
        logout:(state)=>{
            state.isLoggedIn = false;
            state.token = "";
        },
        toggleloading:(state, action)=>{
            state.isLoading = !state.isLoading;
        },
        setUserInfo:(state, action)=>{
            state.userInfo = action.payload;
        },
        setUserEmail:(state, action)=>{
            state.userInfo.email = action.payload;
        }
    }
});
export const {login, logout, toggleloading, setUserInfo, setUserEmail} = authSlice.actions;
export default authSlice.reducer;