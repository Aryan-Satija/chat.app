import React, {useEffect} from 'react'
import {useTheme} from "@mui/material/styles";
import {useSelector} from 'react-redux';
import { Stack, Divider, Typography, Box, Link, Avatar } from '@mui/material'
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
export const Timeline = ({text}) => {
  return (
    <Stack width={"100%"} justifyContent={"center"} spacing={2} alignItems={"center"} direction={"row"}>
        <Divider width="46%" orientation='horizontal'/>
        <Typography variant='body2'>{text}</Typography>
        <Divider width="46%" orientation='horizontal'/>
    </Stack>
  )
}

export const Message = ({from, message}) => {
    const theme = useTheme();
    const userInfo = useSelector((state)=>state.auth.userInfo)
    const outgoing = (from._id === userInfo._id); 
    return (
    <Stack width={"100%"} justifyContent={outgoing ? "flex-start" : "flex-end"} direction={outgoing ? "row-reverse" : "row"} alignItems={"center"} spacing={2}>
        <Avatar>
          <img src={from.avatar}/>
        </Avatar>
        <Box 
            sx={{ 
                    display:"flex", 
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth:250, 
                    padding: 1,
                    borderRadius: 1,
                    backgroundColor: theme.palette.background.paper
                }}
        >
            <Typography variant='body2'>{message}</Typography>
        </Box>
    </Stack>
  )
}

export const Reply = ({message, reply, incoming}) => {
    const theme = useTheme();
    return (
    <Stack width={"100%"}>
        <Box 
            sx={{ 
                    display:"flex", 
                    flexDirection: "column",
                    alignSelf: incoming ? 'flex-start' : 'flex-end',
                    justifyContent: "start",
                    alignItems: "start",
                    maxWidth:250, 
                    padding: 1,
                    borderRadius: 1,
                    backgroundColor: theme.palette.background.paper
                }}
        >
            <Typography variant='body2' sx={{backgroundColor:theme.palette.primary.main, padding: 2, opacity: 0.7, borderRadius: "4px"}}>{message}</Typography>
            <Typography variant='body2'>{reply}</Typography>
        </Box>
    </Stack>
  )
}
export const Image = ({message, img, incoming})=>{
  const theme = useTheme();
  return (<Stack width={"100%"}>
            <Box 
                sx={{ 
                      display:"flex", 
                      flexDirection: "column",
                      alignSelf: incoming ? 'flex-start' : 'flex-end',
                      justifyContent: "center",
                      alignItems: "start",
                      maxWidth:250, 
                      padding: 1,
                      borderRadius: 1,
                      backgroundColor: theme.palette.background.paper
                    }}
            >
                <img src={img} style={{borderRadius: "4px"}}/>
                <Typography variant='body2'>{message}</Typography>
            </Box>
  </Stack>)
}
export const Hyperlink = ({message, preview, text, to})=>{
  useEffect(() => {
    getLinkPreview(text)
      .then((data) => {
      })
      .catch((error) => {
      });
  }, []); 
  const theme = useTheme();
  const userInfo = useSelector((state)=>state.auth.userInfo)
  const incoming = (to === userInfo._id); 
  return (<Stack width={"100%"}>
            <Box 
                sx={{ 
                      display:"flex", 
                      flexDirection: "column",
                      alignSelf: incoming ? 'flex-start' : 'flex-end',
                      justifyContent: "center",
                      alignItems: "start",
                      maxWidth:400, 
                      gap: 2,
                      padding: 1,
                      borderRadius: 1,
                      backgroundColor: theme.palette.background.paper
                    }}
            >
                <Stack>
                  <img src={preview} style={{borderRadius: "4px"}}/>
                </Stack>
                <Stack >
                  <Link href={text} variant='body2' sx={{color: "blue", cursor: "pointer", textDecoration: "underline"}}>{text}</Link>
                  <Typography variant='body2'>{message}</Typography>
                </Stack>
            </Box>
  </Stack>)
}