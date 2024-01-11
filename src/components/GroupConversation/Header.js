import React, { useRef } from 'react'
import { Box, Stack, AvatarGroup, Avatar, IconButton, Divider} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import {CaretRight, Phone, VideoCamera } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';
import {toggleSidebar} from "../../redux/slices/app.js"
const Header = () => {
    const theme = useTheme();
    const group_room_id = useSelector((state)=>state.app.sidebar.group_room_id);
    const groupChatList = useSelector((state)=>state.chat.groupChats);
    const group = groupChatList.find((el)=>{
        return (el.group_id === group_room_id)
    });
    const sidebar = useSelector((state)=>state.app.sidebar)
    const caretRef = useRef(null);
    const dispatch = useDispatch();
    return (
        <Box p={2} sx={{height:100, backgroundColor: theme.palette.mode === "light" ? "#FBFAFF" : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", display:"flex", alignItems: "center" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" width={"100%"}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Stack>
                        <AvatarGroup total={group?.participants.length}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        </AvatarGroup>
                    </Stack>
                    <Stack>
                        <Stack sx={{height: "20px" }} direction={"row"} alignItems={"center"}>
                            <Box sx={{fontSize: "0.9rem", fontWeight: 800}}>{group?.name}</Box>
                            <IconButton>
                                <VideoCamera size={20}/>
                            </IconButton>
                            <IconButton>
                                <Phone size={20}/>
                            </IconButton>
                        </Stack>
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