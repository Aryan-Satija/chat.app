import React, {useState} from 'react'
import { Dialog, DialogContent, DialogTitle, Slide, TextField, Stack, Button, Avatar } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setUserInfo } from '../../redux/slices/auth';
import { UpdateProfileInfo, UpdateProfilePic } from '../../services/utilityFunctions/user';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const ProfileDialogBox = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state)=>state.auth.userInfo);
    const [preview, setPreview] = useState("");
    const [image, setImage] = useState("");
    const token = useSelector((state)=>state.auth.token);
    const {handleSubmit, register, formState: {errors}} = useForm();
    const updateInfo = async(data)=>{
        if(data.firstName || data.lastName || data.about || preview){
            if(data.firstName === "") data.firstName = userInfo?.firstName;
            if(data.lastName === "") data.lastName = userInfo?.lastName;
            if(data.about === "") data.about = userInfo?.about;
            const info = await UpdateProfileInfo(data, token);
            if(info && image){
                const formdata = new FormData();
                formdata.append("displayPicture", image);
                const info_with_profile = await UpdateProfilePic(formdata, token);
                if(info_with_profile)
                    dispatch(setUserInfo(info_with_profile?.user));
                else 
                    dispatch(setUserInfo(info?.user));
            }
            window.location.reaload();
        }
    }
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
                <form onSubmit={handleSubmit(updateInfo)}>
                    <DialogTitle textAlign={"center"}>Update Profile</DialogTitle>
                    <DialogContent sx={{mt:4}}>
                        <Stack direction="row" justifyContent={"space-between"}>
                            <TextField {...register("firstName")} placeholder={`${userInfo.firstName}`} variant='filled'/>
                            <>
                                <label htmlFor='pfp'>
                                    <Avatar sx={{width:'60px', height: '60px'}} src={preview ? preview : userInfo.avatar}/>
                                </label>
                                <input type='file' id='pfp' style={{display:'none'}} onChange={(event)=>{
                                    const file = event.target.files[0];
                                    setImage(file);
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onloadend = () => {
                                        setPreview(reader.result);
                                    };  
                                }}/>
                            </>
                            <TextField {...register("lastName")} placeholder={`${userInfo.lastName}`} variant='filled'/>
                        </Stack>
                        <Stack alignItems={"center"} sx={{mt:4}}>
                            <TextField minRows={5} {...register("about")} fullWidth multiline variant='filled' placeholder={userInfo?.about ? userInfo?.about : 'about'}></TextField>
                        </Stack>
                        <Stack sx={{mt:4}}>
                            <Button type="submit" variant='outlined'>SAVE</Button>
                        </Stack>
                    </DialogContent>
                </form>
        </Dialog> 
    )
}
