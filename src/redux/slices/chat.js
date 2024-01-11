import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
const initialState = {
    chat: [],
    groupChats: []
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
                    img: this_user.avatar,
                    name: `${this_user.firstName} ${this_user.lastName}`,
                    msg: el.messages.length > 0 ? el.messages.at(-1).text : "",
                    time: el?.messages?.created_at,
                    unread: 0,
                    pinned: false,
                    online: false
                }
            })
            state.chat = list;
        },
        AddDirectChat: (state, action)=>{
            const user_id = action.payload.id;
            const this_conversation = action.payload.conversation;
            state.chat = state.chat.map(
              (el) =>{
                if(el?.id !== this_conversation._id)
                  return el;
                return ({
                          id: this_conversation._id,
                          to_user_id: el?.to_user_id,
                          name: el?.name,
                          online: el?.online,
                          img: el?.img,
                          msg: this_conversation.messages.length > 0 ? this_conversation.messages.at(-1).text : "",
                          time: null,
                          unread: 0,
                          pinned: false,
                          online: false
                        });
              } 
            );
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
                  msg: this_conversation.messages.length > 0 ? this_conversation.messages.at(-1).text : "",
                  time: null,
                  unread: 0,
                  pinned: false,
                  online: false
                };
              }
            }
          );
        },
        FetchGroupChats:(state, action)=>{
            state.groupChats = action.payload.map(grp =>{
            return {
              group_id: grp._id,
              name: grp.name,
              admin: grp.admin,
              participants: grp.participants,
              unread: 0,
              img:grp?.profile,
              latestChat: grp.chats.length > 0 ? grp.chats.at(-1).message : '',
              time: null
            }
          })
        },
        resetChatSlice:(state)=>{
          state.chat = [];
          state.groupChats = [];
        }
    }
})

export const {fetchChats, AddDirectChat, UpdateDirectChat, FetchGroupChats, resetChatSlice} = chatSlice.actions;
export default chatSlice.reducer;