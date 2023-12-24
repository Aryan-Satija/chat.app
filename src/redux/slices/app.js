import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebar:{
        open: false,
        type: "CONTACT",
        select: 0,
        conversationId: null,
        room_id: null,
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
        },
        setConversationId: (state, action)=>{
            state.sidebar.conversationId = action.payload;
        },
        setSelect: (state, action)=>{
            state.sidebar.select = action.payload
        },
        Selectchat: (state, action)=>{
            state.sidebar.room_id = action.payload; 
        }
    }
})
export const {toggleSidebar, updateSidebarType, setSelect, setConversationId, Selectchat} = slice.actions;
export default slice.reducer;