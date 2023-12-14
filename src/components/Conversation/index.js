import React from 'react'
import { Box, Stack} from '@mui/material';
import Footer from './Footer';
import Header from './Header';
import { Chat } from './Chat';
import { useSelector } from 'react-redux';
import { Contact } from './Contact';
import Starred from './Starred';
import Shared from './Shared';
const Conversation = () => {
  const sidebarOptions = useSelector((state)=>{
    return state.app;
  });
  return (
    <Box sx={{display:"flex", height:"100vh", width: "calc(100vw - 420px)"}}>
        <Stack height={"100%"} maxHeight={"100vh"} width={"100%"}>
            <Header/>
            <Chat/>
            <Footer/>
        </Stack>
        {
          sidebarOptions.sidebar.open && sidebarOptions.sidebar.type === "CONTACT" && 
            <Stack width={"320px"}>
                <Contact/>
            </Stack>
        }
        {
          sidebarOptions.sidebar.open && sidebarOptions.sidebar.type === "STARRED" && 
            <Stack width={"320px"}>
                <Starred/>
            </Stack>
        }
        {
          sidebarOptions.sidebar.open && sidebarOptions.sidebar.type === "SHARED" && 
            <Stack width={"320px"}>
                <Shared/>
            </Stack>
        }
    </Box>
  )
}

export default Conversation;