import React from 'react';
import { Chat_History } from '../../data';
import { Message, Timeline, Image, Reply, Hyperlink } from './ChatElement';
import { Box, Stack } from '@mui/material';
export const Chat = () => {
    return (
        <Box sx={{width: "100%",  flexGrow: 1, overflowY: "auto"}}>
            <Stack width="100%" direction="column" spacing={2} padding={1}>
                {
                    Chat_History.map((chat)=>{
                        if(chat.type === "divider")
                            return (<Timeline {...chat}/>);
                        else if(chat.subtype === "img")
                            return (<Image {...chat}/>)
                        else if(chat.subtype === "reply")
                            return (<Reply {...chat}/>)
                        else if(chat.subtype === "link")
                            return (<Hyperlink {...chat}/>)
                        else if(!chat.subtype)
                            return (<Message {...chat}/>)
                    })
                }
            </Stack>
        </Box>
    )
}
