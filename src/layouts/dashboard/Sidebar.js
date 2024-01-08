import React from 'react'
import {Box, Divider, IconButton, Stack, Avatar} from "@mui/material";
import logo from "../../assets/Images/ChatAppLogo.png";
import {Nav_Buttons} from "../../data/index.js";
import { Gear } from "phosphor-react";
import {useTheme} from "@mui/material/styles";
import {useSelector, useDispatch} from "react-redux";
import useSettings from "../../hooks/useSettings.js";
import { ThemeSwitch } from './ThemeSwitch.js';
import { useNavigate } from 'react-router-dom';
import { setSelect } from '../../redux/slices/app.js';
const Sidebar = () => {
    const userInfo = useSelector((state)=>state.auth.userInfo);
    const theme = useTheme();
    const dispatch = useDispatch();
    const select = useSelector((state) => state.app.sidebar.select)
    const navigate = useNavigate();
    const {onToggleMode} = useSettings();
    return (
        <Box sx={{height: "100vh", width: "100px", backgroundColor: theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", padding:2}}>
            <Stack sx={{height: "100%"}} direction={"column"} alignItems={"center"} justifyContent={"space-between"}>
            <Stack direction={"column"} alignItems={"center"} spacing={4}>
                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    height: 64,
                    width: 64,
                    borderRadius: 1.5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <img src={logo} width={55} height={55} style={{borderRadius:"12px"}}></img>
                </Box>
                {
                Nav_Buttons.map((icon_obj)=>{
                    return select === icon_obj.index ? (<IconButton key={icon_obj.index} sx={{backgroundColor : theme.palette.primary.main, borderRadius:1.5, color: theme.palette.background.paper}}>
                        {icon_obj.icon}
                    </IconButton>) : (<IconButton key={icon_obj.index} onClick={()=>{
                                                                                        dispatch(setSelect(icon_obj.index));
                                                                                        navigate(icon_obj.path);
                                                                                    }}>
                        {icon_obj.icon}
                    </IconButton>)
                })
                }
                <Divider width={64} sx={{color: "rgba(145, 158, 171, 1)"}}/>
                {
                select === 3 ? 
                (<IconButton sx={{backgroundColor : theme.palette.primary.main, borderRadius:1.5, color: theme.palette.background.paper}}>
                    <Gear/>
                </IconButton>) : 
                (<IconButton onClick={()=>{
                                    dispatch(setSelect(3));
                                    navigate("/settings")
                                }}>
                    <Gear/>
                </IconButton>)
                }
            </Stack>
            <Stack direction={"column"} alignItems={"center"} spacing={4}>
                <ThemeSwitch onChange={()=>{
                onToggleMode();
                }}/>
                <Avatar src={userInfo.avatar}>
                </Avatar>
            </Stack>
            </Stack>
        </Box>
    )
}
export default Sidebar;