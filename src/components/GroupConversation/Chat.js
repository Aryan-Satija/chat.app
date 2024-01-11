import React, {useState, useEffect, useRef} from 'react';
import { Message, Timeline, Image, Reply, Hyperlink } from './ChatElement';
import { Box, Stack } from '@mui/material';
import { socket } from '../../socket';
import { useSelector, useDispatch } from 'react-redux';
import { setChatHistory, pushChat } from '../../redux/slices/app';
import { AddDirectChat } from '../../redux/slices/chat';
export const Chat = () => {
    const dispatch = useDispatch();
    const chatHistory = useSelector((state)=>state.app.sidebar.chatHistory);
    const chatContainerRef = useRef(null);
    const userInfo = useSelector((state)=>state.auth.userInfo);
    const group_room_id = useSelector((state)=>{
        return state.app.sidebar.group_room_id
    })

    useEffect(()=>{
        if(socket){
            socket.emit("get_group_messages", {group_id: group_room_id}, (messages)=>{
                dispatch(setChatHistory(messages));
            })
        }
    }, [group_room_id]);
    useEffect(()=>{
          if(socket){
            socket.on("new_group_message",({groupChatDoc}) => {
                console.log("hello");
                console.log(groupChatDoc)
                // dispatch(AddDirectChat({id: userInfo._id, conversation: chat}))
                if(group_room_id === groupChatDoc._id){
                    dispatch(pushChat(groupChatDoc.chats.at(-1)));
                }
                else{
                        // update chat list....
                }
          })
        }
        return () => {
            socket?.off("new_group_message");
        }
    }, [socket]);
    useEffect(()=>{
        (()=>{
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        })();
    }, [chatHistory])
    return (
        <Box ref={chatContainerRef} sx={{width: "100%",  flexGrow: 1, overflowY: "auto"}}>
            <Stack width="100%" direction="column" spacing={2} padding={1}>
                {
                    chatHistory?.map((chat)=>{
                        if(chat.type === "divider")
                            return (<Timeline {...chat}/>);
                        else if(chat.type === "img")
                            return (<Image {...chat}/>)
                        else if(chat.type === "reply")
                            return (<Reply {...chat}/>)
                        else if(chat.type === "link")
                            return (<Hyperlink {...chat}/>)
                        else
                            return (<Message {...chat}/>)
                    })
                }
            </Stack>
        </Box>
    )
}
