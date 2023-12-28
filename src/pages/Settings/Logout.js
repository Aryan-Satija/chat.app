import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, Slide, TextField, Stack, Button, Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetAuthSlice } from "../../redux/slices/auth";
import { resetChatSlice } from "../../redux/slices/chat";
import { resetAppSlice } from "../../redux/slices/app";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const Logout = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [select, setSelect] = useState(0);
    const logOut = ()=>{
        dispatch(resetAuthSlice());
        dispatch(resetAppSlice());
        dispatch(resetChatSlice());
        navigate("/auth/login");
    }
    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            keepMounted
            onClose={handleClose}
            TransitionComponent={Transition}
            aria-describedby="alert-dialog-slide-description"
            sx={{ p: 4 }}
        >
            <DialogTitle textAlign={"center"}>Are You Sure You Want To Log Out?</DialogTitle>
            <DialogContent sx={{mt: 4}}>
                <Stack spacing={2} direction = {"row"} alignItems={"center"} justifyContent={"center"}>
                    <Button variant='contained' onClick={logOut}>Log Out</Button>
                    <Button variant='contained' onClick={handleClose}>Cancel</Button>
                </Stack>
            </DialogContent>
        </Dialog> 
  )
}
