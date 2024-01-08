import React, { useRef } from 'react'
import { Box, Stack, Badge, Avatar, IconButton, Divider} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import {CaretRight, Phone, VideoCamera } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';
import {toggleSidebar} from "../../redux/slices/app.js"
const Header = () => {
    const theme = useTheme();
    const group_room_id = useSelector((state)=>state.app.sidebar.group_room_id);
    const groupChatList = useSelector((state)=>state.chat.groupChats);
    const group = groupChatList.find((el)=>{
        return (el.id === group_room_id)
    });
    const sidebar = useSelector((state)=>state.app.sidebar)
    const caretRef = useRef(null);
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
        <Box p={2} sx={{height:100, backgroundColor: theme.palette.mode === "light" ? "#FBFAFF" : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", display:"flex", alignItems: "center" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" width={"100%"}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Stack>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar src={group.img} sx={{cursor:"pointer"}}/>
                        </StyledBadge>
                    </Stack>
                    <Stack>
                        <Stack sx={{height: "20px" }} direction={"row"} alignItems={"center"}>
                            <Box sx={{fontSize: "0.9rem", fontWeight: 800}}>{group.name}</Box>
                            <IconButton>
                                <VideoCamera size={20}/>
                            </IconButton>
                            <IconButton>
                                <Phone size={20}/>
                            </IconButton>
                        </Stack>
                        <Box sx={{fontSize: "0.8rem", fontWeight: 400}}>Online</Box>
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <IconButton ref={caretRef} onClick={()=>{
                                            if(caretRef)
                                                caretRef.current.style.rotate = (sidebar.open ? "0deg" : "180deg")
                                            dispatch(toggleSidebar());
                                        }} sx={sidebar.open ? {'&:hover':{rotate:"0deg"}, transition: '1s' } : {'&:hover':{rotate:"180deg"}, transition: '1s' }}>
                        <CaretRight/>
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    )
}
export default Header;