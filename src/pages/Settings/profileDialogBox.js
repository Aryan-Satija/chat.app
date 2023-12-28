import React from 'react'
import { Dialog, DialogContent, DialogTitle, Slide, TextField, Stack, Button, Avatar } from '@mui/material'
import { useSelector } from 'react-redux';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const ProfileDialogBox = ({ open, handleClose }) => {
    const userInfo = useSelector((state)=>state.auth.userInfo);
    return (<Dialog
            fullWidth
            maxWidth="md"
            TransitionComponent={Transition}
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{ p: 4 }}
        >
            <DialogTitle textAlign={"center"}>Update Profile</DialogTitle>
            <DialogContent sx={{mt: 4}}>
                <Stack direction="row" justifyContent={"space-between"}>
                    <TextField placeholder={`${userInfo.firstName}`} variant='filled'/>
                    <Avatar sx={{width:'60px', height: '60px'}} src={userInfo.avatar}/>
                    <TextField placeholder={`${userInfo.lastName}`} variant='filled'/>
                </Stack>
                <Stack alignItems={"center"} sx={{mt:4}}>
                    <TextField minRows={5} fullWidth multiline variant='filled' placeholder={userInfo?.about ? userInfo?.about : 'about'}></TextField>
                </Stack>
                <Stack sx={{mt:4}}>
                    <Button variant='outlined'>SAVE</Button>
                </Stack>
            </DialogContent>
        </Dialog> 
    )
}
