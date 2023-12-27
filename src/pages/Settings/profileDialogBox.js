import React from 'react'
import { Dialog, DialogContent, DialogTitle, Slide, TextField, Stack } from '@mui/material'
import { useSelector } from 'react-redux';
import Textarea from '@mui/joy/Textarea';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const ProfileDialogBox = () => {
    const userInfo = useSelector((state)=>state.auth.userInfo);
    return (<Dialog
            fullWidth
            maxWidth="md"
            open={true}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            sx={{ p: 4 }}
        >
            <DialogTitle textAlign={"center"}>Update Profile</DialogTitle>
            <DialogContent sx={{mt: 4}}>
                <Stack direction="row" justifyContent={"space-around"}>
                    <TextField placeholder={`${userInfo.firstName}`} variant='filled'/>
                    <TextField placeholder={`${userInfo.lastName}`} variant='filled'/>
                </Stack>
                <Stack width={"100%"}>
                    <Textarea placeholder={`${userInfo?.about}` || `about`} ></Textarea>
                </Stack>
            </DialogContent>
        </Dialog> 
    )
}
