import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import {Stack} from "@mui/material";
import  Sidebar  from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { connectSocket, socket } from "../../socket.js";
import { toast } from "react-toastify";
import { UpdateDirectChat, AddDirectChat } from "../../redux/slices/chat.js";
import { Selectchat } from "../../redux/slices/app.js";
const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const userInfo = useSelector((state)=>state.auth.userInfo);
  const chat = useSelector((state) => state.chat.chat);
  useEffect(()=>{
    if(!isLoggedIn) navigate("/auth/login");
  }, []);
  useEffect(() => {
    console.log(".");
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };
      window.onload();
      if (!socket) {
        connectSocket(userInfo._id);
      }
      
      socket.on("new_friend_request", (data)=>{
        console.log("hello baby");
        toast(`${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      });

      socket.on("request_accepted", (data)=>{
          toast(`${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
        
        socket.on("request_sent", (data)=>{
          toast(`${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      });

      socket.on("start_chat", (data) => {
        const existing_chat = chat.find(
          (el) => el?.id === data._id
        );
        if (existing_chat) {
          dispatch(UpdateDirectChat({ conversation: data, id:  userInfo._id}));
        } else {
          dispatch(AddDirectChat({ conversation: data, id:  userInfo._id}));
        }
        dispatch(Selectchat(data._id));
      });
    }
    return () => {
      socket?.off("start_chat")
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
    };
  }, [isLoggedIn, socket]);

  return (
    <Stack direction="row">
      <Sidebar/>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
