import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, Slide, TextField, Stack, Button, Avatar } from '@mui/material'
import useSettings from "../../hooks/useSettings";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const Theme = ({ open, handleClose }) => {
    const {onChangeMode} = useSettings();
    const [select, setSelect] = useState(0);
    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            aria-describedby="alert-dialog-slide-description"
            sx={{ p: 4 }}
        >
            <DialogTitle textAlign={"center"}>Update Theme</DialogTitle>
            <DialogContent sx={{mt: 4}}>
                <Stack spacing={2}>
                    <Button variant={select == 0 ? 'contained' : 'outlined'} onClick={()=>{
                        setSelect(0);
                        onChangeMode("dark");
                    }}>Default Theme</Button>
                    <Button variant={select == 1 ? 'contained' : 'outlined'} onClick={()=>{
                        setSelect(1);
                        onChangeMode("dark");
                    }}>Dark Theme</Button>
                    <Button variant={select == 2 ? 'contained' : 'outlined'} onClick={()=>{
                        setSelect(2);
                        onChangeMode("light");
                    }}>Light Theme</Button>
                </Stack>
            </DialogContent>
        </Dialog> 
  )
}
