import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
const initialState = {
    chat: [],
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        fetchChats: (state, action)=>{
            const user_id = action.payload.id;
            const list = action.payload.data.map((el)=>{
                let this_user;
                if(el.participants[0]._id.toString() === user_id)
                    this_user = el.participants[1];
                else
                    this_user = el.participants[0];
                return {
                    id: el?._id,
                    to_user_id : this_user._id,
                    img: faker.image.avatar(),
                    name: `${this_user.firstName} ${this_user.lastName}`,
                    msg: el.messages.length > 0 ? el.messages.at(-1).text : "",
                    time: el?.messages?.created_at,
                    unread: false,
                    pinned: false,
                    online: false
                }
            })
            state.chat = list;
        },
        AddDirectChat: (state, action)=>{
            console.log("in add direct chat....");
            const user_id = action.payload.id;
            const this_conversation = action.payload.conversation;
            console.log(user_id);
            console.log(this_conversation)
            const user = this_conversation.participants.find(
              (elm) => elm._id.toString() !== user_id
            );
            state.chat = state.chat.filter(
              (el) =>{
                if(el?.id !== this_conversation._id)
                  return el;
              } 
            );
            state.chat.push({
              id: this_conversation._id,
              to_user_id: user._id,
              name: `${user?.firstName} ${user?.lastName}`,
              online: user?.status === "online",
              img: faker.image.avatar(),
              msg: faker.music.songName(),
              time: null,
              unread: false,
              pinned: false,
              online: false
            });
        },
        UpdateDirectChat(state, action) {
            const user_id = action.payload.id;
            const this_conversation = action.payload.conversation;
            state.chat = state.chat.map(
              (el) => {
                if (el?.id !== this_conversation._id) {
                  return el;
                } else {
                  const user = this_conversation.participants.find(
                    (elm) => elm._id.toString() !== user_id
                  );
                  return {
                    id: this_conversation._id,
                    to_user_id: user?._id,
                    name: `${user?.firstName} ${user?.lastName}`,
                    online: user?.status === "Online",
                    img: faker.image.avatar(),
                    msg: faker.music.songName(),
                    time: null,
                    unread: false,
                    pinned: false,
                    online: false
                  };
                }
              }
            );
        },
        resetChatSlice:(state)=>{
          state.chat = [];
        }
    }
})

export const {fetchChats, AddDirectChat, UpdateDirectChat, resetChatSlice} = chatSlice.actions;
export default chatSlice.reducer;