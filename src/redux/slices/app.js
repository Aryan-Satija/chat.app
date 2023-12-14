import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebar:{
        open: false,
        type: "CONTACT"
    }
}
const slice = createSlice({
    name: "app",
    initialState,
    reducers:{
        toggleSidebar:(state, action)=>{
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarType: (state, action)=>{
            state.sidebar.type = action.payload.type;
        }
    }
})
export const {toggleSidebar, updateSidebarType} = slice.actions;
export default slice.reducer;
