import React, {useState, useEffect} from "react";
import { Box, Stack, IconButton, Typography, InputBase, Button, Divider, Avatar, Badge } from "@mui/material";
import {useTheme, styled, alpha} from "@mui/material/styles";
import { ArchiveBox, ArrowFatLineDown, MagnifyingGlass, Users, Plus } from "phosphor-react";
import { CreateGroup } from "./CreateGroup";
import { socket } from "../../socket";
import { useSelector, useDispatch } from "react-redux";
import { FetchGroupChats } from "../../redux/slices/chat";
import { Selectgroup } from "../../redux/slices/app";
const GroupChatElement = ({group_id, img, name, latestChat, unread, time})=>{
    const group_room_id = useSelector((state)=>state.app.sidebar.group_room_id);
    const theme = useTheme();
    const dispatch = useDispatch();
    return(<Box
        sx={{
            backgroundColor: group_room_id === group_id ? (theme.palette.primary.main) : (theme.palette.mode === "light" ? "#fff" : theme.palette.background.default),
            width: "100%",
            paddingY: 2,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            paddingX: 2,
            cursor: "pointer", 
            justifyContent:"space-between" 
        }}
        onClick={()=>{dispatch(Selectgroup(group_id))}}
    >
        <Avatar src={img} />
        <Box sx={{display: "flex", width:"170px", justifyContent: "space-between"}}>
            <Stack direction="column">
                <Typography sx={{fontSize: "0.9rem", fontWeight: 800}}>{name}</Typography>
                <Typography sx={{fontSize: "0.8rem"}}>{latestChat}</Typography>
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
function Groups(){
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.auth.userInfo._id);
    const GroupList = useSelector(state => state.chat.groupChats);
    const [search, setSearch] = useState(false); 
    useEffect(()=>{
        if(socket){
            socket.emit('get_group_messages', {user_id}, (data)=>{
                dispatch(FetchGroupChats(data));
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
        borderRadius: search ? 5 : 20,
        backgroundColor: alpha(theme.palette.background.default, 1), 
        marginRight: theme.spacing(0),
        marginLeft : theme.spacing(0),
        width: (search ? "100%" : "12.5%"),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
    }))
    const Search = styled(InputBase)(({theme}) =>({
        paddingLeft: `calc(0.2rem + ${theme.spacing(1)})`,
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
                        <Typography variant="h5">Groups</Typography>
                        <Stack direction="row">
                            <IconButton onClick={handleOpenDialogBox}>
                                <Plus/>
                            </IconButton>
                        </Stack>
                    </Stack>
                    <SearchBar>
                        <IconButton>
                            <MagnifyingGlass color={theme.palette.primary.main} size={20} onClick={()=>{setSearch(!search)}}/>
                        </IconButton>
                        <Search  placeholder={"search...."}/>
                    </SearchBar>
                    <Stack spacing={1.5}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <IconButton>
                                <ArchiveBox/>
                            </IconButton>
                            <Button>
                                Archive
                            </Button>
                        </Stack>
                        <Divider/>
                    </Stack>
                </Stack>
                <Stack p={2} direction={"column"} spacing={1.5}>
                    <Typography sx={{color:"#676767", fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center"}}>All Groups <ArrowFatLineDown/></Typography>
                    {
                        GroupList && GroupList.map((group)=>{
                            return (<GroupChatElement key={group.group_id} {...group}/>)
                        })
                    }
                </Stack>
                
            </Box>
            {
                openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialogBox}/>
            }
        </>
    );
}
export default Groups;