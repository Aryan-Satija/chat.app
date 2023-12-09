import React from "react";
import { Outlet } from "react-router-dom";
import {Box, Divider, IconButton, Stack, Avatar, Switch} from "@mui/material";
import { faker } from '@faker-js/faker';
import {useTheme, styled} from "@mui/material/styles";
import logo from "../../assets/Images/ChatAppLogo.png";
import {Nav_Buttons} from "../../data/index.js";
import { Gear } from "phosphor-react";
import { useState } from "react";
import useSettings from "../../hooks/useSettings.js";
const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 38,
  height: 24,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(14px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 20,
    height: 20,
    borderRadius: 10,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const DashboardLayout = () => {
  const theme = useTheme();
  console.log(theme);
  const [select, setSelect] = useState(0);
  const {onToggleMode} = useSettings();
  return (
    <Stack direction="row">
      <Box sx={{height: "100vh", width: 100, backgroundColor: theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", padding:2}}>
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
                  return select === icon_obj.index ? (<IconButton key={icon_obj.index} onClick={()=>{setSelect(icon_obj.index)}} sx={{backgroundColor : theme.palette.primary.main, borderRadius:1.5, color: theme.palette.background.paper}}>
                      {icon_obj.icon}
                  </IconButton>) : (<IconButton key={icon_obj.index} onClick={()=>{setSelect(icon_obj.index)}}>
                      {icon_obj.icon}
                  </IconButton>)
              })
            }
            <Divider width={64} sx={{color: "rgba(145, 158, 171, 1)"}}/>
            {
              select === 3 ? 
              (<IconButton onClick={()=>{setSelect(3)}} sx={{backgroundColor : theme.palette.primary.main, borderRadius:1.5, color: theme.palette.background.paper}}>
                <Gear/>
              </IconButton>) : 
              (<IconButton onClick={()=>{setSelect(3)}}>
                <Gear/>
              </IconButton>)
            }
          </Stack>
          <Stack direction={"column"} alignItems={"center"} spacing={4}>
            <ThemeSwitch onChange={()=>{
              onToggleMode();
            }}/>
            <Avatar>
              <img src={faker.image.avatar()}></img>
            </Avatar>
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
