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
