import { Box, IconButton, Stack } from '@mui/material';
import { ArrowLeft, Tabs, Tab } from 'phosphor-react';
import React from 'react'
import { useDispatch } from 'react-redux';
import { updateSidebarType } from '../../redux/slices/app';
const Starred = () => {
    const dispatch = useDispatch();
    return (
    <Stack>
        <Stack height={92} padding={2} sx={{borderBottom: "1px solid rgba(120, 120, 120, 0.4)"}} direction={"row"} alignItems={"center"}>
            <IconButton onClick={()=>{
                dispatch(updateSidebarType({type: "CONTACT"}));
            }}>
                <ArrowLeft/>
            </IconButton>
        </Stack>
    </Stack>
  )
}

export default Starred;