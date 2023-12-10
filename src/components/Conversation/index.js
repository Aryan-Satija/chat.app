import React from 'react'
import { Box, Stack} from '@mui/material';
import Footer from './Footer';
import Header from './Header';
import { Chat } from './Chat';
const Conversation = () => {

  return (
    <Box sx={{height:"100vh", width:"calc(100vw - 420px)"}}>
        <Stack height={"100%"} maxHeight={"100vh"} width={"100%"}>
            <Header/>
            <Chat/>
            <Footer/>
        </Stack>
    </Box>
  )
}

export default Conversation;