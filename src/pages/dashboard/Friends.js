import React, {useState} from 'react'
import { Dialog, Stack, Tabs, Tab, DialogContent } from '@mui/material';
export const Friends = ({open, handleClose}) => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue)=>{
        setValue(newValue);
    }
  return (
    <Dialog fullWidth maxWidth="xs" open={open} keepMounted handleClose={handleClose}>
        <Stack p={2} sx={{width: "100%"}}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Explore"/>
                <Tab label="Friends"/>
                <Tab label="Requests"/>
            </Tabs>
        </Stack>
        <DialogContent>
            <Stack sx={{height: "100%"}}>
                <Stack spacing={2.5}>
                    
                </Stack>
            </Stack>
        </DialogContent>
    </Dialog>
  )
}
