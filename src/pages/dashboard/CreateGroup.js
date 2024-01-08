import { Avatar, Stack, Dialog,Button, Checkbox, DialogContent, Box, DialogTitle, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FetchFriends } from '../../services/utilityFunctions/user';
import {useTheme} from "@mui/material/styles";
export const CreateGroup = ({open, handleClose}) => {
    const token = useSelector(state => state.auth.token);
    const userInfo = useSelector(state => state.auth.userInfo);
    const [friendList, setFriendList] = useState([]);
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        admin: userInfo._id,
        description: '',
        profile: null,
        participants: [],
    })
    function submitHandler(){

    }
    function changeHandler(event){
        setFormData(prev => {
            return {
                ...prev,
                [event.target.id]: event.target.value 
            }
        })
    }
    useEffect(()=>{
        (async()=>{
            const response = await FetchFriends(token);
            setFriendList(response);
        })();
    }, [])
    return (
    <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ padding: 4 }}
    >
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent sx={{overflowY: 'hidden'}}>
            <form>
                <Stack paddingY={2} spacing={2}>
                    <Avatar sx={{cursor: 'pointer', width: '70px', height: '70px' }} />
                    <TextField onChange={changeHandler} id={'name'} variant='filled' placeholder='Group Name'/>
                    <TextField onChange={changeHandler} id={'description'} minRows={5} multiline variant='filled' placeholder='Group Description'/>
                    <Stack spacing={2} height={150} sx={{overflowY: 'auto'}}>
                    {
                        friendList && friendList.map((frnd)=>{
                            return (<Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'}>
                                <Box>
                                    <Checkbox checked={formData.participants.includes(frnd._id)}/>
                                </Box>
                                <Box>
                                    <Avatar src={frnd.avatar}/>
                                </Box>
                                <Box sx={{width: '200px', textAlign:'center'}}>
                                    {
                                        frnd.firstName
                                    }
                                    {
                                        ' '
                                    }
                                    {
                                        frnd.lastName
                                    }
                                </Box>
                                <Box>
                                    <Button variant='outlined' onClick={()=>{
                                        let new_participants = [...formData.participants];
                                        new_participants.push(frnd._id);
                                        setFormData(prev => {
                                            return {
                                                ...prev,
                                                participants: new_participants
                                            }
                                        })
                                    }}>{formData.participants.includes(frnd._id) ? 'Added' : 'Add Participant'}</Button>
                                </Box>
                            </Stack>)
                        })
                    }
                    </Stack>
                    <Button variant='outlined' onClick={submitHandler}>CREATE</Button>
                </Stack>
            </form>
        </DialogContent>
    </Dialog>
  )
}
