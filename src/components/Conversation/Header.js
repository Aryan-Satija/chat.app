import React from 'react'
import { Box, Stack, Badge, Avatar, IconButton, Divider} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import { faker } from '@faker-js/faker';
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';
import {toggleSidebar} from "../../redux/slices/app.js"
const Header = () => {
    const theme = useTheme();
    const room_id = useSelector((state)=>state.app.sidebar.room_id);
    const chatList = useSelector((state)=>state.chat.chat);
    const friend = chatList.find((el)=>{
        return (el.id === room_id)
    });
    console.log(chatList);
    const dispatch = useDispatch();
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: '#44b700',
          color: '#44b700',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
    }));
    return (
        <Box p={2} sx={{width:"100%", height: 100, backgroundColor: theme.palette.mode === "light" ? "#FBFAFF" : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", display:"flex", alignItems: "center" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" width={"100%"}>
                <Stack onClick={()=>{
                    dispatch(toggleSidebar());
                }} direction="row" alignItems="center" spacing={1.5}>
                    <Stack>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar src={friend.img}/>
                        </StyledBadge>
                    </Stack>
                    <Stack>
                        <Box sx={{fontSize: "0.9rem", fontWeight: 800}}>{friend.name}</Box>
                        <Box sx={{fontSize: "0.8rem", fontWeight: 400}}>Online</Box>
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <IconButton>
                        <VideoCamera/>
                    </IconButton>
                    <IconButton>
                        <Phone/>
                    </IconButton>
                    <IconButton>
                        <MagnifyingGlass/>
                    </IconButton>
                    <Divider orientation='vertical' flexItem/>
                    <IconButton>
                        <CaretDown/>
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    )
}
export default Header;