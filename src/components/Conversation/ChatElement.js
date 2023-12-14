import { Stack, Divider, Typography, Box } from '@mui/material'
import {useTheme} from "@mui/material/styles";
import React from 'react'

export const Timeline = ({text}) => {
  return (
    <Stack width={"100%"} justifyContent={"center"} spacing={2} alignItems={"center"} direction={"row"}>
        <Divider width="46%" orientation='horizontal'/>
        <Typography variant='body2'>{text}</Typography>
        <Divider width="46%" orientation='horizontal'/>
    </Stack>
  )
}

export const Message = ({message, incoming}) => {
    const theme = useTheme();
    return (
    <Stack width={"100%"}>
        <Box 
            sx={{ 
                    display:"flex", 
                    alignSelf: incoming ? 'flex-start' : 'flex-end',
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
export const Hyperlink = ({message, preview, link, incoming})=>{
  const theme = useTheme();
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
                  <Typography variant='body2' sx={{color: "blue", cursor: "pointer", textDecoration: "underline"}}>{link}</Typography>
                  <Typography variant='body2'>{message}</Typography>
                </Stack>
            </Box>
  </Stack>)
}