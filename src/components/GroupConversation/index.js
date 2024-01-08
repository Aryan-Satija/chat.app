import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
// import Footer from './Footer';
import Header from './Header';
// import { Chat } from './Chat';
import { useSelector } from 'react-redux';
// import { Contact } from './Contact';
// import Starred from './Starred';
// import Shared from './Shared';
import NoChat from '../../assets/Illustration/NoChat';
const GroupConversation = () => {
  const appOptions = useSelector((state) => {
    return state.app;
  });
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: 'calc(100vw - 420px)' }}>
      {appOptions.sidebar.group_room_id ? (
        <>
          <Stack height={'100%'} maxHeight={'100vh'} width={'100%'}>
            <Header />
            {/* <Chat /> */}
            {/* <Footer /> */}
          </Stack>
          {appOptions.sidebar.open && appOptions.sidebar.type === 'CONTACT' && (
            <Stack width={'320px'}>
              {/* <Contact /> */}
            </Stack>
          )}
          {appOptions.sidebar.open && appOptions.sidebar.type === 'STARRED' && (
            <Stack width={'320px'}>
              {/* <Starred /> */}
            </Stack>
          )}
          {appOptions.sidebar.open && appOptions.sidebar.type === 'SHARED' && (
            <Stack width={'320px'}>
              {/* <Shared /> */}
            </Stack>
          )}
        </>
      ) : (
        <Stack width={"100%"} height={"100%"} alignItems={"center"} justifyContent={"center"}>
          <NoChat/>
          <Typography variant='body2'>SELECT A GROUP TO START THE CONVERSATION</Typography>
        </Stack>
      )}
    </Box>
  );
};

export default GroupConversation;
