import React, {useState, useEffect} from "react";
import { Box, Stack, IconButton, Typography, InputBase, Button, Divider, Avatar, Badge } from "@mui/material";
import {useTheme, styled, alpha} from "@mui/material/styles";
import { Archive, ArrowFatLineDown, CircleDashed, MagnifyingGlass, Users } from "phosphor-react";
import { Friends } from "./Friends";
import { socket } from "../../socket";
import { useSelector, useDispatch } from "react-redux";
import { fetchChats } from "../../redux/slices/chat";
import { Selectchat } from "../../redux/slices/app";
const ChatElement = ({id, img, name, msg, time, unread, pinned, online})=>{
    const room_id = useSelector((state)=>state.app.sidebar.room_id);
    const theme = useTheme();
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
    return(<Box
        sx={{
            backgroundColor: room_id === id ? (theme.palette.primary.main) : (theme.palette.mode === "light" ? "#fff" : theme.palette.background.default),
            width: "100%",
            paddingY: 2,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            paddingX: 2,
            cursor: "pointer", 
            justifyContent:"space-between" 
        }}
        onClick={()=>{dispatch(Selectchat(id))}}
    >
        {
            online ? (<StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                      >
                            <Avatar src={img} />
                        </StyledBadge>) : (<Avatar src={img} />)
        }
        <Box sx={{display: "flex", width:"170px", justifyContent: "space-between"}}>
            <Stack direction="column">
                <Typography sx={{fontSize: "0.9rem", fontWeight: 800}}>{name}</Typography>
                <Typography sx={{fontSize: "0.8rem"}}>{msg}</Typography>
            </Stack>
            <Stack direction="column" alignItems="center">
                <Typography sx={{fontSize: "0.8rem", fontWeight: 800}}>{time}</Typography>
                {
                    unread != 0 &&
                    <Box sx={{backgroundColor: theme.palette.primary.main, fontSize:"0.75rem", width: 20, height: 20, borderRadius: 10, display: "flex", alignItems:"center", justifyContent: "center", color: "#fff" 
                    }}>{unread}</Box>
                }
            </Stack>
        </Box>
    </Box>) 
}
function Chats(){
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.auth.userInfo._id);
    const ChatList = useSelector(state => state.chat.chat);
    useEffect(()=>{
        console.log("step-1");
        if(socket){
            console.log("step-2");
            socket.emit("user_messages", {user_id}, (data)=>{
                console.log("step-3");
                dispatch(fetchChats({id: user_id, data: data}));
            })
        }
    }, [socket])
    const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialogBox = function(){
        setOpenDialog(true);
    }
    const handleCloseDialogBox = function(){
        setOpenDialog(false);
    }
    const SearchBar = styled("div")(({theme}) => ({
        borderRadius: 20,
        backgroundColor: alpha(theme.palette.background.default, 1), 
        marginRight: theme.spacing(2),
        marginLeft : theme.spacing(0),
        width: "100%",
        display: "flex",
        alignItem: "center",
        justifyContent: "space-between"
    }))
    const SearchIcon = styled("div")(({theme}) => ({
        padding: theme.spacing(0.9, 1),
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }))
    const Search = styled(InputBase)(({theme}) =>({
        paddingLeft: `calc(0.6rem + ${theme.spacing(4)})`,
        width: "100%"
    }))
    return (
        <>
            <Box 
                sx={{position: "relative", height: "100vh", width: "320px", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", overflowY: "auto"}}>
                <Stack p={3} spacing={1.5}>
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"} 
                    >
                        <Typography variant="h5">Chats</Typography>
                        <Stack direction="row">
                            <IconButton onClick={handleOpenDialogBox}>
                                <Users/>
                            </IconButton>
                            <IconButton>
                                <CircleDashed/>
                            </IconButton>
                        </Stack>
                    </Stack>
                    <SearchBar>
                        <SearchIcon>
                            <MagnifyingGlass color="#709CE6"/>
                        </SearchIcon>
                        <Search  placeholder={"search...."}/>
                    </SearchBar>
                    <Stack spacing={1.5}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <IconButton>
                                <Archive/>
                            </IconButton>
                            <Button>
                                Archive
                            </Button>
                        </Stack>
                        <Divider/>
                    </Stack>
                </Stack>
                <Stack p={2} direction={"column"} spacing={1.5}>
                    {/* <Typography sx={{color:"#676767", fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center"}}>Pinned <ArrowFatLineDown/></Typography>
                    {
                        ChatList.map((chat)=>{
                            if(chat.pinned){
                                return (<ChatElement key={chat.id} {...chat}/>)
                            }
                        })
                    } */}
                    <Typography sx={{color:"#676767", fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center"}}>All Chats <ArrowFatLineDown/></Typography>
                    {
                        ChatList.map((chat)=>{
                            if(!chat.pinned){
                                return (<ChatElement key={chat.id} {...chat}/>)
                            }
                        })
                    }
                </Stack>
                
            </Box>
            {
                openDialog && <Friends open={openDialog} handleClose={handleCloseDialogBox}/>
            }
        </>
    );
}
export default Chats;