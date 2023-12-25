import React, {useState, useEffect} from 'react';
import { Message, Timeline, Image, Reply, Hyperlink } from './ChatElement';
import { Box, Stack } from '@mui/material';
import { socket } from '../../socket';
import { useSelector } from 'react-redux';
export const Chat = () => {
    const [chatHistory, setChatHistory] = useState([]);
    
    console.log("--------------------------------");
    console.log(chatHistory);
    console.log("--------------------------------");

    const room_id = useSelector((state)=>{
        return state.app.sidebar.room_id
    })
    useEffect(()=>{
        if(socket){
            socket.emit("get_messages", {room_id}, (messages)=>{
                setChatHistory(messages);
            })
        }
    }, []);
    useEffect(()=>{
        if(socket){
            socket.on("new_message",({conversation_id, message}) => {
                if(room_id === conversation_id){
                    chatHistory.push(message);
                    console.log(chatHistory);
                    setChatHistory(chatHistory);
                }
                else{
                    // update chat list....
                }
            })
        }
        return () => {
            socket?.off("new_message");
        }
    }, [socket]);
    return (
        <Box sx={{width: "100%",  flexGrow: 1, overflowY: "auto"}}>
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
