import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
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
        }
    }
});
export const {login, logout, toggleloading} = authSlice.actions;
export default authSlice.reducer;