import React, {useState, useEffect} from 'react'
import {Dialog, DialogTitle, Slide, Stack, Tabs, Tab, DialogContent } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

import {
  FetchFriendRequests,
  FetchFriends,
  FetchUsers,
} from "../../services/utilityFunctions/user.js"

import { FriendElement, FriendRequestElement, UserElement } from "../../components/UserElement";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UsersList = () => {
  const token = useSelector((state) => state.auth.token)
  const [users, setUsers] = useState([])
  useEffect(() => {
    // iife
    // immediately invoked function expressios 
    (async()=>{
        console.log("step-1");
        const list = await FetchUsers(token);
        if(list)
          setUsers(list);
    })()
  }, []);
  return (
    <>
      {users.map((el, idx) => {
        return <UserElement key={idx} {...el} />;
      })}
    </>
  );
};

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const token = useSelector((state) => state.auth.token)
  useEffect(() => {
    // iife
    // immediately invoked function expressios 
    (async()=>{
        const list = await FetchFriends(token);
        if(list)
          setFriends(list);
    })()
  }, []);

  return (
    <>
      {friends.map((el, idx) => {
        return <FriendElement key={idx} {...el} />;
      })}
    </>
  );
};

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    (async()=>{
        const list = await FetchFriendRequests();
        if(list) setRequests(list);
    })()
  }, []);
  return (
    <>
      {requests.map((el, idx) => {
        return <FriendRequestElement key={idx} {...el.sender} id={el._id} />;
      })}
    </>
  );
};

export const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      <DialogTitle sx={{textAlign: "center"}}>Connections</DialogTitle>
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.4}>
            {(() => {
              switch (value) {
                case 0: 
                  return <UsersList />;
                case 1:
                  return <FriendsList />;
                case 2: 
                  return <RequestsList />;
                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};