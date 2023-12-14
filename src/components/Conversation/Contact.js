import React, {useState} from 'react'
import { faker } from '@faker-js/faker'
import { Avatar, Box, Button, Divider, IconButton, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from '@mui/material'
import { Bell, Bookmark, CaretRight, Phone, Star, Trash, VideoCamera, ArrowLeft } from 'phosphor-react'
import { toggleSidebar, updateSidebarType } from '../../redux/slices/app'
import { useDispatch } from 'react-redux'
import AntSwitch from '../AntSwitch';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const BlockDialogBox = (open, handleClose)=>{
  return (<Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
          <DialogTitle>{"Do you really want to block this user?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>)
}
const ClearDialogBox = (open, handleOpen)=>{
  return (<Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={()=>{
              handleOpen(false);
            }}
            aria-describedby="alert-dialog-slide-description"
          >
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{handleOpen(false)}}>Disagree</Button>
            <Button onClick={()=>{handleOpen(false)}}>Agree</Button>
          </DialogActions>
        </Dialog>)
}
export const Contact = () => {
  const dispatch = useDispatch();
  const [openClearDialogBox, setOpenClearDialogBox] = useState(false);
  const [openBlockDialogBox, setOpenBlockDialogBox] = useState(false);
  return (
    <Stack width={"100%"}>
        <Stack height={72} width={"100%"} padding={2} sx={{borderBottom: "1px solid rgba(120, 120, 120, 0.4)"}} alignSelf={"start"} direction={"row"} alignItems={"center"}>
            <IconButton onClick={()=>{
                dispatch(toggleSidebar());
            }}>
                <ArrowLeft/>
            </IconButton>
        </Stack>
        <Stack width={"100%"} direction={"column"}>
            <Stack width={"100%"} direction={"column"} spacing={2} alignItems={"center"} justifyContent={"center"} padding={"20px"}>
              <Box>
                  <img style={{width:"80px", borderRadius:"40px"}}src={faker.image.avatar()}/>
              </Box>
              <Stack alignItems={"center"}>
                  <Typography>{faker.name.fullName()}</Typography>
                  <Typography>{8716469770}</Typography>
              </Stack>
              <Stack width={"100%"} direction={"row"} justifyContent={"space-around"}>
                <IconButton>
                    <Phone/>
                </IconButton>
                <IconButton>
                    <VideoCamera/>
                </IconButton>
              </Stack>
            </Stack>
            <Stack paddingX={2}>
              <Divider/>
            </Stack>
            <Stack padding={2}>
              <Typography variant='body2'>About:</Typography>
              <Typography variant='body2'>{"Hey there I am using ChatApp...."}</Typography>
            </Stack>
            <Stack paddingX={2}>
              <Divider/>
            </Stack>
            <Stack padding={2} direction={"row"} alignItems={"center"}>
              <Typography>Media, files and docs:</Typography>
              <Button endIcon={<CaretRight/>} onClick={()=>{
                dispatch(updateSidebarType({type: "SHARED"}))
              }}>201</Button>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} width={"100%"} justifyContent={"space-between"}>
              {
                 [1, 2, 3].map(()=>{
                    return (<img width={"80px"} src={faker.image.city()}/>)
                 })
              }
            </Stack>
            <Stack padding={2}>
              <Divider/>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton><Star/></IconButton>
                <Typography variant='body2'>Starred Messages</Typography>
              </Stack>
              <IconButton onClick={()=>{
                dispatch(updateSidebarType({type: "STARRED"}))
              }}>
                <CaretRight/>
              </IconButton>
            </Stack>
            <Stack padding={2}>
              <Divider/>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton><Bell/></IconButton>
                <Typography variant='body2'>Mute Notifications</Typography>
              </Stack>
              <IconButton>
                  <AntSwitch/>
              </IconButton>
            </Stack>
            <Stack padding={2}>
              <Divider/>
            </Stack>
            <Stack direction={"row"} paddingX={2} alignContent={"center"} justifyContent={"space-between"}>
              <Button startIcon={<Bookmark/>} variant='outlined' onClick={()=>{
                  setOpenBlockDialogBox(true);
              }}>Block</Button>
              <Button startIcon={<Trash/>} variant='outlined' onClick={()=>{
                setOpenClearDialogBox(true);
              }}>Delete</Button>
            </Stack>
        </Stack>
        {
          openClearDialogBox && <ClearDialogBox open={openClearDialogBox} handleClose={setOpenClearDialogBox}/>
        }
        {
          openBlockDialogBox && <ClearDialogBox open={openBlockDialogBox} handleClose={setOpenBlockDialogBox}/>
        }
    </Stack>
  )
}
