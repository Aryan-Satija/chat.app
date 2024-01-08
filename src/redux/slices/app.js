import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebar:{
        open: false,
        type: "CONTACT",
        select: 0,
        room_id: null,
        group_room_id: null,  
        chatHistory: [],
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
        setSelect: (state, action)=>{
            state.sidebar.select = action.payload
        },
        Selectchat: (state, action)=>{
            state.sidebar.room_id = action.payload; 
        },
        Selectgroup: (state, action) => {
            state.sidebar.group_room_id = action.payload;
        },
        setChatHistory: (state, action)=>{
            state.sidebar.chatHistory = action.payload;
        },
        pushChat: (state, action)=>{
            state.sidebar.chatHistory.push(action.payload);
        },
        resetAppSlice: (state)=>{
            state.sidebar.open = false;
            state.sidebar.type = "CONTACT";
            state.sidebar.select = 0;
            state.sidebar.room_id = null;
            state.chatHistory = [];
            state.group_room_id = null;
        }
    }
})
export const {toggleSidebar, updateSidebarType, setSelect, Selectchat, setChatHistory, pushChat, Selectgroup, resetAppSlice} = slice.actions;
export default slice.reducer;